import { describe, expect, it, jest } from '@jest/globals';

import { Agent } from '../agent';
import { Executor } from '../executor';
import { Planner } from '../planner';
import type {
  IExecutorFactory,
  IExecutor,
  IPlannerFactory,
  IPrimitiveTask,
  ExecutionStatus,
} from '../types';

import { BoilWaterTask, CookPastaTask, KitchenContext } from './mocks';

describe(Agent.name, () => {
  describe('#tick', () => {
    describe('при первом вызове', () => {
      it('создаёт план на основе корневой задачи и состояния', () => {
        const rootTask = new CookPastaTask();
        const planner = new Planner<KitchenContext>();
        const plannerFactory: IPlannerFactory<KitchenContext> = { create: () => planner };
        const executorFactory: IExecutorFactory<KitchenContext> = {
          create: () => new Executor<KitchenContext>([]),
        };
        const agent = new Agent(rootTask, plannerFactory, executorFactory);
        const state = KitchenContext.create(['pasta', 'tomatoes'], ['pot']);
        const planSpy = jest.spyOn(planner, 'plan');

        agent.tick(state);

        expect(planSpy).toHaveBeenCalledTimes(1);
        expect(planSpy).toHaveBeenCalledWith(rootTask, state);
      });

      it('начинает выполнение плана созданного планировщиком', () => {
        const boilWaterTask = new BoilWaterTask();
        const planner = new Planner<KitchenContext>();
        const plannerFactory: IPlannerFactory<KitchenContext> = { create: () => planner };
        const executorFactory: IExecutorFactory<KitchenContext> = {
          create: (plan: IPrimitiveTask<KitchenContext>[]) => new Executor(plan),
        };
        const agent = new Agent(new CookPastaTask(), plannerFactory, executorFactory);
        const state = KitchenContext.create(['pasta', 'tomatoes'], ['pot']);
        jest.spyOn(planner, 'plan').mockReturnValueOnce([boilWaterTask]);
        const createExecutorSpy = jest.spyOn(executorFactory, 'create');
        const executeSpy = jest.spyOn(Executor.prototype, 'tick');

        agent.tick(state);

        expect(createExecutorSpy).toHaveBeenCalledTimes(1);
        expect(createExecutorSpy).toHaveBeenCalledWith([boilWaterTask]);
        expect(executeSpy).toHaveBeenCalledTimes(1);
        expect(executeSpy).toHaveBeenCalledWith(state);
      });
    });

    describe('при последующих вызовах', () => {
      it('если исполнитель на прошлом такте вернул "running", продолжает выполнение', () => {
        const state = KitchenContext.create(['pasta', 'tomatoes'], ['pot']);

        const planner = new Planner<KitchenContext>();
        const plannerFactory: IPlannerFactory<KitchenContext> = { create: () => planner };
        const planSpy = jest.spyOn(planner, 'plan');

        const executor: IExecutor<KitchenContext> = { tick: () => 'running' };
        const executorFactory: IExecutorFactory<KitchenContext> = { create: () => executor };
        const executorTickSpy = jest.spyOn(executor, 'tick');

        const agent = new Agent(new CookPastaTask(), plannerFactory, executorFactory);

        agent.tick(state); // первый вызов, построили план и начали его выполнять
        agent.tick(state); // второй вызов, план строить не нужно, нужно продолжить выполнять прежний

        expect(planSpy).toHaveBeenCalledTimes(1);
        expect(executorTickSpy).toHaveBeenCalledTimes(2);
      });

      it.each(['success', 'failure'] as const)(
        'если исполнитель на прошлом такте вернул "%s", корневая задача перепланируется',
        (result: ExecutionStatus) => {
          const state = KitchenContext.create(['pasta', 'tomatoes'], ['pot']);

          const planner = new Planner<KitchenContext>();
          const plannerFactory: IPlannerFactory<KitchenContext> = { create: () => planner };
          const planSpy = jest.spyOn(planner, 'plan');

          const executor: IExecutor<KitchenContext> = { tick: () => result };
          const executorFactory: IExecutorFactory<KitchenContext> = { create: () => executor };

          const agent = new Agent(new CookPastaTask(), plannerFactory, executorFactory);

          agent.tick(state); // первый вызов, построили план и начали его выполнять. Выполнение завершилось успешно или провалилось
          agent.tick(state); // второй вызов, план нужно перестроить

          expect(planSpy).toHaveBeenCalledTimes(2);
        }
      );

      it.each(['success', 'failure'] as const)(
        'если исполнитель на прошлом такте вернул "%s", начинает исполнение нового плана',
        (result: ExecutionStatus) => {
          const state = KitchenContext.create(['pasta', 'tomatoes'], ['pot']);

          const planner = new Planner<KitchenContext>();
          const firstPlan: IPrimitiveTask<KitchenContext>[] = [];
          const secondPlan: IPrimitiveTask<KitchenContext>[] = [new BoilWaterTask()];
          const plannerFactory: IPlannerFactory<KitchenContext> = { create: () => planner };
          jest
            .spyOn(planner, 'plan')
            .mockReturnValueOnce(firstPlan)
            .mockReturnValueOnce(secondPlan);

          const executor: IExecutor<KitchenContext> = { tick: () => result };
          const executorFactory: IExecutorFactory<KitchenContext> = { create: () => executor };
          const createExecutorSpy = jest.spyOn(executorFactory, 'create');
          const executorTickSpy = jest.spyOn(executor, 'tick');

          const agent = new Agent(new CookPastaTask(), plannerFactory, executorFactory);

          agent.tick(state); // первый вызов, построили план и начали его выполнять. Выполнение завершилось успешно или провалилось
          agent.tick(state); // второй вызов, план нужно перестроить

          expect(createExecutorSpy).toHaveBeenNthCalledWith(1, firstPlan);
          expect(createExecutorSpy).toHaveBeenNthCalledWith(2, secondPlan);
          expect(executorTickSpy).toHaveBeenCalledTimes(2);
        }
      );
    });

    describe('попытки переплана', () => {
      it('предпринимается, максимум три попытки переплана, после этого переплан не вызывается', () => {
        const state = KitchenContext.create(['pasta', 'tomatoes'], ['pot']);

        const planner = new Planner<KitchenContext>();
        const plannerFactory: IPlannerFactory<KitchenContext> = { create: () => planner };
        const planSpy = jest.spyOn(planner, 'plan').mockReturnValue([]);

        const executor: IExecutor<KitchenContext> = { tick: () => 'success' };
        const executorFactory: IExecutorFactory<KitchenContext> = { create: () => executor };
        const executorTickSpy = jest.spyOn(executor, 'tick');

        const agent = new Agent(new CookPastaTask(), plannerFactory, executorFactory);

        agent.tick(state); // первый вызов, попытались построить план
        agent.tick(state); // второй вызов, попытались построить план
        agent.tick(state); // третий вызов, попытались построить план
        agent.tick(state); // четвёртый вызов, не пытаемся перестроить план

        expect(planSpy).toHaveBeenCalledTimes(3);
        expect(executorTickSpy).toHaveBeenCalledTimes(3);
      });
    });
  });
});
