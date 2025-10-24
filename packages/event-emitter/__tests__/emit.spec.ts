import { describe, expect, it, jest } from '@jest/globals';

import { EventEmitter } from '../event-emitter';

import type { TestEvents } from './test-events';

describe(EventEmitter.name, () => {
  describe('#emit', () => {
    it('вызов emit без зарегистрированных обработчиков не вызывает ошибку', () => {
      const emitter = new EventEmitter<TestEvents>();

      expect(() => emitter.emit('start')).not.toThrow();
    });

    it('если нет зарегистрированных обработчиков, emit возвращает пустой массив', () => {
      const emitter = new EventEmitter<TestEvents>();

      const results = emitter.emit('start');

      expect(results).toStrictEqual([]);
    });

    it('возвращает массив результатов всех обработчиков', () => {
      const emitter = new EventEmitter<TestEvents>();

      emitter.on('tick', (n) => `result ${n}`);
      emitter.on('tick', (n) => `another ${n}`);
      emitter.on('tick', (n) => `third ${n}`);

      const results = emitter.emit('tick', 42);

      expect(results).toStrictEqual(['result 42', 'another 42', 'third 42']);
    });

    it('результаты возвращаются в порядке регистрации обработчиков', () => {
      const emitter = new EventEmitter<TestEvents>();

      emitter.on('end', () => 1);
      emitter.on('end', () => 2);
      emitter.on('end', () => 3);

      const results = emitter.emit('end', 'done');

      expect(results).toStrictEqual([1, 2, 3]);
    });

    it('если обработчик возвращает void, в массиве результатов будет undefined', () => {
      const emitter = new EventEmitter<TestEvents>();

      emitter.on('start', () => {
        // ничего не возвращает
      });

      const results = emitter.emit('start');

      expect(results).toStrictEqual([undefined]);
    });

    it('если обработчик выбрасывает исключение, emit прокидывает его наружу', () => {
      const emitter = new EventEmitter<TestEvents>();
      const error = new Error('Test error');

      emitter.on('start', () => {
        throw error;
      });

      expect(() => emitter.emit('start')).toThrow(error);
    });

    it('если один из обработчиков выбрасывает исключение, последующие обработчики не вызываются', () => {
      const emitter = new EventEmitter<TestEvents>();
      const callback1 = jest.fn();
      const callback2 = jest.fn(() => {
        throw new Error('Test error');
      });
      const callback3 = jest.fn();

      emitter.on('start', callback1);
      emitter.on('start', callback2);
      emitter.on('start', callback3);

      expect(() => emitter.emit('start')).toThrow('Test error');
      expect(callback1).toHaveBeenCalledTimes(1);
      expect(callback2).toHaveBeenCalledTimes(1);
      expect(callback3).not.toHaveBeenCalled();
    });

    it('множественные вызовы emit обрабатываются независимо', () => {
      const emitter = new EventEmitter<TestEvents>();
      const callback = jest.fn<TestEvents['tick']>((n: number) => `${n * 2}`);

      emitter.on('tick', callback);

      const results1 = emitter.emit('tick', 10);
      const results2 = emitter.emit('tick', 20);
      const results3 = emitter.emit('tick', 30);

      expect(results1).toStrictEqual(['20']);
      expect(results2).toStrictEqual(['40']);
      expect(results3).toStrictEqual(['60']);
      expect(callback).toHaveBeenCalledTimes(3);
    });
  });
});
