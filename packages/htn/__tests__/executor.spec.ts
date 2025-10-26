import { describe, expect, jest, it } from '@jest/globals';

import { Executor } from '../executor';
import type { IPrimitiveTask } from '../types';

import { BoilWaterTask, CookPastaTask, KitchenContext } from './mocks';

describe(Executor.name, () => {
  describe('#tick', () => {
    it('если план пустой, возвращает success', () => {
      const context = KitchenContext.create([], []);
      const executor = new Executor<KitchenContext>([]);

      const result = executor.tick(context);

      expect(result).toBe('success');
    });

    it('если задача вернула running, возвращает running', () => {
      const context = KitchenContext.create([], ['pot']);
      const runningTask = new BoilWaterTask();
      jest.spyOn(runningTask, 'execute').mockReturnValue('running');
      const executor = new Executor<KitchenContext>([runningTask]);

      const result = executor.tick(context);

      expect(result).toBe('running');
    });

    it('если задача вернула failure, возвращает failure', () => {
      const context = KitchenContext.create([], ['pot']);
      const failingTask: IPrimitiveTask<KitchenContext> = new BoilWaterTask();
      jest.spyOn(failingTask, 'execute').mockReturnValue('failure');
      const executor = new Executor([failingTask]);

      const result = executor.tick(context);

      expect(result).toBe('failure');
    });

    it('если canExecute текущей задачи возвращает false, возвращает failure', () => {
      const context = KitchenContext.create([], []);
      const executor = new Executor<KitchenContext>([new BoilWaterTask()]); // Требует кастрюлю, которой нет

      const result = executor.tick(context);

      expect(result).toBe('failure');
    });

    it('если задача вернула success и есть ещё задачи к выполнению, возвращает running', () => {
      const context = KitchenContext.create(['pasta', 'tomatoes'], ['pot']);
      const executor = new Executor<KitchenContext>([new BoilWaterTask(), new CookPastaTask()]);

      const result = executor.tick(context); // Первая задача выполнена. Есть ещё задачи, которые можно выполнить

      expect(result).toBe('running');
    });

    it('если задача вернула success и это последняя задача, возвращает success', () => {
      const context = KitchenContext.create(['pasta', 'tomatoes'], ['pot']);
      const executor = new Executor<KitchenContext>([new BoilWaterTask(), new CookPastaTask()]);

      executor.tick(context); // Первая задача
      const result = executor.tick(context); // Вторая задача (последняя)

      expect(result).toBe('success');
    });

    it('если предыдущая задача была выполнена, начинает выполнять следующую задачу', () => {
      const context = KitchenContext.create(['pasta', 'tomatoes'], ['pot']);
      const boilWaterTask = new BoilWaterTask();
      const cookPastaTask: IPrimitiveTask<KitchenContext> = new CookPastaTask();
      const cookPastaTaskSpy = jest.spyOn(cookPastaTask, 'execute');
      const executor = new Executor<KitchenContext>([boilWaterTask, cookPastaTask]);

      executor.tick(context); // выполняет boilWaterTask
      executor.tick(context); // должен вызвать execute у следующей задачи

      expect(cookPastaTaskSpy).toHaveBeenCalledWith(context);
    });

    it('если план уже выполнен, возвращает success', () => {
      const context = KitchenContext.create([], ['pot']);
      const executor = new Executor<KitchenContext>([new BoilWaterTask()]);

      const result1 = executor.tick(context); // Завершаем план
      const result2 = executor.tick(context);

      expect(result1).toBe('success');
      expect(result2).toBe('success');
    });

    it('если план уже выполнен, не пытается выполнить последнюю задачу повторно', () => {
      const context = KitchenContext.create([], ['pot']);
      const boilWaterTask = new BoilWaterTask();
      const canExecuteSpy = jest.spyOn(boilWaterTask, 'canExecute');
      const executor = new Executor<KitchenContext>([boilWaterTask]);

      const result1 = executor.tick(context); // Завершаем план
      const result2 = executor.tick(context);

      expect(result1).toBe('success');
      expect(result2).toBe('success');
      expect(canExecuteSpy).toHaveBeenCalledTimes(1);
    });

    it('если план уже провален, возвращает failure', () => {
      const context = KitchenContext.create([], []);
      const executor = new Executor<KitchenContext>([new BoilWaterTask()]); // Требует кастрюлю

      const result1 = executor.tick(context); // Проваливаем план
      const result2 = executor.tick(context);

      expect(result1).toBe('failure');
      expect(result2).toBe('failure');
    });

    it('если план уже провален, не пытается выполнить задачу ещё раз', () => {
      const context = KitchenContext.create([], []);
      const boilWaterTask = new BoilWaterTask();
      const canExecuteSpy = jest.spyOn(boilWaterTask, 'canExecute');
      const executor = new Executor<KitchenContext>([boilWaterTask]); // Требует кастрюлю

      executor.tick(context); // Проваливаем план
      executor.tick(context);

      expect(canExecuteSpy).toHaveBeenCalledTimes(1);
    });
  });
});
