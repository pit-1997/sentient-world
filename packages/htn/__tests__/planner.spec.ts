import { describe, expect, it } from '@jest/globals';

import { isPrimitiveTask } from '../guards';
import { Planner } from '../planner';

import type { CompoundTask } from '../types';

import {
  BakedChickenMethod,
  BoilWaterTask,
  ElaborateSupperTask,
  KitchenState,
  PastaWithTomatoSauceMethod,
  PrepareSupperTask,
  RiceWithVegetablesMethod,
} from './mocks';

describe(Planner.name, () => {
  describe('#plan', () => {
    describe('планирование примитивной задачи', () => {
      it('если canExecute возвращает true, возвращает массив с одной задачей', () => {
        // Есть кастрюля для кипячения воды
        const state = KitchenState.create([], ['pot']);
        const task = new BoilWaterTask();
        const planner = new Planner<KitchenState>();

        const plan = planner.plan(task, state);

        expect(plan).toHaveLength(1);
        expect(plan[0]).toBe(task);
      });

      it('если canExecute возвращает false, возвращает пустой массив', () => {
        // Нет кастрюли для кипячения воды
        const state = KitchenState.create([], []);
        const task = new BoilWaterTask();
        const planner = new Planner<KitchenState>();

        const plan = planner.plan(task, state);

        expect(plan).toHaveLength(0);
      });
    });

    describe('планирование составной задачи', () => {
      it('выбирает первый метод preconditions которого вернул true', () => {
        // Есть всё для пасты (первый метод) и для риса (третий метод)
        const state = KitchenState.create(
          ['pasta', 'rice', 'tomatoes', 'onion'],
          ['pot', 'pan', 'knife']
        );
        const task = new PrepareSupperTask();
        const planner = new Planner<KitchenState>();

        const plan = planner.plan(task, state);
        const taskNames = plan.map((task) => task.name);

        // должен выбраться первый метод (паста), а не третий (рис)
        expect(taskNames).toStrictEqual(
          expect.arrayContaining(['BoilWater', 'CookPasta', 'MakeTomatoSauce', 'ServePasta'])
        );
        expect(taskNames).not.toContain('CookRice');
      });

      it('пропускает методы preconditions которых вернули false', () => {
        // Нет пасты (первый метод не подходит), нет курицы (второй не подходит),
        // но есть рис и овощи (третий метод подходит)
        const state = KitchenState.create(['rice', 'onion'], ['pot', 'pan', 'knife']);
        const task = new PrepareSupperTask();
        const planner = new Planner<KitchenState>();

        const plan = planner.plan(task, state);
        const taskNames = plan.map((task) => task.name);

        // Должен выбраться третий метод (рис с овощами)
        expect(taskNames).toStrictEqual(
          expect.arrayContaining(['ChopVegetables', 'Fry', 'BoilWater', 'CookRice', 'ServeRice'])
        );
      });

      it('пропускает методы, вложенные составные задачи которого не могут быть декомпозированы', () => {
        // Есть паста и помидоры для основного блюда,
        // но для гарнира (PrepareSideTask) нет ни риса, ни овощей
        const state = KitchenState.create(['pasta', 'tomatoes'], ['pot', 'pan', 'knife']);
        const task = new ElaborateSupperTask();
        const planner = new Planner<KitchenState>();

        const plan = planner.plan(task, state);

        // План не должен построиться, потому что PrepareSideTask не может быть декомпозирована
        expect(plan).toHaveLength(0);
      });

      it('пропускает методы, примитивные задачи которого не могут быть выполнены (canExecute = false)', () => {
        // Есть паста и помидоры, но нет сковороды для соуса
        const state = KitchenState.create(['pasta', 'tomatoes'], ['pot']);

        const method = new PastaWithTomatoSauceMethod();
        const taskWithFailingPrimitive: CompoundTask<KitchenState> = {
          name: 'TestTask',
          getMethods: () => [method],
        };

        const planner = new Planner<KitchenState>();
        const plan = planner.plan(taskWithFailingPrimitive, state);

        // План не строится, потому что MakeTomatoSauceTask.canExecute вернёт false
        expect(plan).toHaveLength(0);
      });

      it('применяет эффекты примитивных задач к состоянию для планирования следующих задач', () => {
        // Есть паста, помидоры и всё оборудование
        const state = KitchenState.create(['pasta', 'tomatoes'], ['pot', 'pan']);
        const planner = new Planner<KitchenState>();
        const method = new PastaWithTomatoSauceMethod();
        const task: CompoundTask<KitchenState> = {
          name: 'PastaTask',
          getMethods: () => [method],
        };

        const plan = planner.plan(task, state);
        const taskNames = plan.map((t) => t.name);
        const expectedTasks = ['BoilWater', 'CookPasta', 'MakeTomatoSauce', 'ServePasta'];

        // Все задачи должны быть в плане
        // CookPastaTask использует пасту, но это не должно помешать следующим задачам
        expect(taskNames).toStrictEqual(expectedTasks);

        // Исходное состояние не должно измениться
        expect(state.ingredients.pasta).toBe(true);
        expect(state.ingredients.tomatoes).toBe(true);
      });

      it('если метод не может быть выполнен, пробует следующий метод с исходным состоянием', () => {
        // Есть только рис и кастрюля
        // Первый метод (паста) не подходит - нет пасты
        // Второй метод (курица) не подходит - нет курицы
        // Третий метод (рис с овощами) не подходит - нет овощей
        // Четвёртый метод (простой рис) должен сработать
        const state = KitchenState.create(['rice'], ['pot']);
        const task = new PrepareSupperTask();
        const planner = new Planner<KitchenState>();

        const plan = planner.plan(task, state);
        const taskNames = plan.map((t) => t.name);

        // Должен выбраться четвёртый метод (простой рис)
        expect(taskNames).toStrictEqual(['BoilWater', 'CookRice', 'ServeRice']);

        // Исходное состояние не изменилось
        expect(state.ingredients.rice).toBe(true);
      });

      it('последовательность составных и примитивных задач сводит к массиву примитивных задач', () => {
        // Есть паста, рис, помидоры, овощи - всё для сложного ужина
        const state = KitchenState.create(
          ['pasta', 'rice', 'tomatoes', 'onion'],
          ['pot', 'pan', 'knife']
        );
        const task = new ElaborateSupperTask();
        const planner = new Planner<KitchenState>();

        const plan = planner.plan(task, state);
        const taskNames = plan.map((task) => task.name);

        expect(plan.length).toBeGreaterThan(0);
        // Проверяем что это примитивные задачи
        expect(plan.every((task) => isPrimitiveTask(task))).toBe(true);
        // План должен содержать задачи из основного блюда И из гарнира
        expect(taskNames).toStrictEqual(expect.arrayContaining(['CookPasta', 'CookRice']));
      });

      it('декомпозирует вложенные составные задачи', () => {
        // Есть всё для сложного ужина с вложенной составной задачей
        const state = KitchenState.create(
          ['pasta', 'rice', 'tomatoes', 'onion'],
          ['pot', 'pan', 'knife']
        );
        const task = new ElaborateSupperTask(); // Содержит вложенную PrepareSideTask
        const planner = new Planner<KitchenState>();

        const plan = planner.plan(task, state);
        const taskNames = plan.map((t) => t.name);

        // План должен содержать задачи из вложенной PrepareSideTask
        expect(plan.length).toBeGreaterThan(0);

        // Задачи из основного блюда
        expect(taskNames).toStrictEqual(expect.arrayContaining(['CookPasta', 'MakeTomatoSauce']));

        // Задачи из вложенной составной задачи (PrepareSideTask -> RiceWithVegetables)
        expect(taskNames).toStrictEqual(expect.arrayContaining(['ChopVegetables', 'CookRice']));

        // Финальная задача
        expect(taskNames[taskNames.length - 1]).toBe('ServeMeal');
      });

      it('если ни один из методов не может быть выполнен, возвращает пустой массив', () => {
        // Совершенно пустая кухня - ни ингредиентов, ни оборудования
        const state = KitchenState.create([], []);
        const planner = new Planner<KitchenState>();

        // Составная задача без fallback метода
        const strictTask: CompoundTask<KitchenState> = {
          name: 'StrictTask',
          getMethods: () => [
            new PastaWithTomatoSauceMethod(),
            new RiceWithVegetablesMethod(),
            new BakedChickenMethod(),
          ],
        };

        const plan = planner.plan(strictTask, state);

        // План пустой, потому что ни один метод не может быть выполнен
        expect(plan).toHaveLength(0);
      });
    });
  });
});
