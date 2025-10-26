import { describe, expect, jest, it } from '@jest/globals';

import { Executor } from '../executor';
import type { IPrimitiveTask } from '../types';

import { createKitchen, BoilWaterTask, CookPastaTask, type KitchenState } from './mocks';

describe(Executor.name, () => {
  describe('#tick', () => {
    it('если план пустой, возвращает success', () => {
      const state = createKitchen([], []);
      const executor = new Executor<KitchenState>([]);

      const result = executor.tick(state);

      expect(result).toBe('success');
    });

    it('если задача вернула running, возвращает running', () => {
      const state = createKitchen([], ['pot']);
      const runningTask = new BoilWaterTask();
      jest.spyOn(runningTask, 'execute').mockReturnValue('running');
      const executor = new Executor<KitchenState>([runningTask]);

      const result = executor.tick(state);

      expect(result).toBe('running');
    });

    it('если задача вернула failure, возвращает failure', () => {
      const state = createKitchen([], ['pot']);
      const failingTask: IPrimitiveTask<KitchenState> = new BoilWaterTask();
      jest.spyOn(failingTask, 'execute').mockReturnValue('failure');
      const executor = new Executor([failingTask]);

      const result = executor.tick(state);

      expect(result).toBe('failure');
    });

    it('если canExecute текущей задачи возвращает false, возвращает failure', () => {
      const state = createKitchen([], []);
      const executor = new Executor<KitchenState>([new BoilWaterTask()]); // Требует кастрюлю, которой нет

      const result = executor.tick(state);

      expect(result).toBe('failure');
    });

    it('если задача вернула success и есть ещё задачи к выполнению, возвращает running', () => {
      const state = createKitchen(['pasta', 'tomatoes'], ['pot']);
      const executor = new Executor<KitchenState>([new BoilWaterTask(), new CookPastaTask()]);

      const result = executor.tick(state); // Первая задача выполнена. Есть ещё задачи, которые можно выполнить

      expect(result).toBe('running');
    });

    it('если задача вернула success и это последняя задача, возвращает success', () => {
      const state = createKitchen(['pasta', 'tomatoes'], ['pot']);
      const executor = new Executor<KitchenState>([new BoilWaterTask(), new CookPastaTask()]);

      executor.tick(state); // Первая задача
      const result = executor.tick(state); // Вторая задача (последняя)

      expect(result).toBe('success');
    });

    it('если предыдущая задача была выполнена, начинает выполнять следующую задачу', () => {
      const state = createKitchen(['pasta', 'tomatoes'], ['pot']);
      const boilWaterTask = new BoilWaterTask();
      const cookPastaTask: IPrimitiveTask<KitchenState> = new CookPastaTask();
      const cookPastaTaskSpy = jest.spyOn(cookPastaTask, 'execute');
      const executor = new Executor<KitchenState>([boilWaterTask, cookPastaTask]);

      executor.tick(state); // выполняет boilWaterTask
      executor.tick(state); // должен вызвать execute у следующей задачи

      expect(cookPastaTaskSpy).toHaveBeenCalledWith(state);
    });

    it('если план уже выполнен, возвращает success', () => {
      const state = createKitchen([], ['pot']);
      const executor = new Executor<KitchenState>([new BoilWaterTask()]);

      const result1 = executor.tick(state); // Завершаем план
      const result2 = executor.tick(state);

      expect(result1).toBe('success');
      expect(result2).toBe('success');
    });

    it('если план уже выполнен, не пытается выполнить последнюю задачу повторно', () => {
      const state = createKitchen([], ['pot']);
      const boilWaterTask = new BoilWaterTask();
      const canExecuteSpy = jest.spyOn(boilWaterTask, 'canExecute');
      const executor = new Executor<KitchenState>([boilWaterTask]);

      const result1 = executor.tick(state); // Завершаем план
      const result2 = executor.tick(state);

      expect(result1).toBe('success');
      expect(result2).toBe('success');
      expect(canExecuteSpy).toHaveBeenCalledTimes(1);
    });

    it('если план уже провален, возвращает failure', () => {
      const state = createKitchen([], []);
      const executor = new Executor<KitchenState>([new BoilWaterTask()]); // Требует кастрюлю

      const result1 = executor.tick(state); // Проваливаем план
      const result2 = executor.tick(state);

      expect(result1).toBe('failure');
      expect(result2).toBe('failure');
    });

    it('если план уже провален, не пытается выполнить задачу ещё раз', () => {
      const state = createKitchen([], []);
      const boilWaterTask = new BoilWaterTask();
      const canExecuteSpy = jest.spyOn(boilWaterTask, 'canExecute');
      const executor = new Executor<KitchenState>([boilWaterTask]); // Требует кастрюлю

      executor.tick(state); // Проваливаем план
      executor.tick(state);

      expect(canExecuteSpy).toHaveBeenCalledTimes(1);
    });
  });
});
