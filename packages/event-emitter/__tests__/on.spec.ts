import { describe, expect, it, jest } from '@jest/globals';

import { EventEmitter } from '../event-emitter';

import type { TestEvents } from './test-events';

describe(EventEmitter.name, () => {
  describe('#on', () => {
    it('зарегистрированные обработчики вызываются при emit', () => {
      const emitter = new EventEmitter<TestEvents>();
      const callback = jest.fn();

      emitter.on('start', callback);
      emitter.emit('start');

      expect(callback).toHaveBeenCalledTimes(1);
    });

    it('все зарегистрированные обработчики вызываются при emit', () => {
      const emitter = new EventEmitter<TestEvents>();
      const callback1 = jest.fn();
      const callback2 = jest.fn();
      const callback3 = jest.fn();

      emitter.on('start', callback1);
      emitter.on('start', callback2);
      emitter.on('start', callback3);
      emitter.emit('start');

      expect(callback1).toHaveBeenCalledTimes(1);
      expect(callback2).toHaveBeenCalledTimes(1);
      expect(callback3).toHaveBeenCalledTimes(1);
    });

    it('обработчики вызываются с переданными аргументами', () => {
      const emitter = new EventEmitter<TestEvents>();
      const callback = jest.fn<TestEvents['tick']>();

      emitter.on('tick', callback);
      emitter.emit('tick', 42);

      expect(callback).toHaveBeenCalledWith(42);
    });

    it('обработчики вызываются со всеми переданными аргументами', () => {
      const emitter = new EventEmitter<TestEvents>();
      const callback = jest.fn();

      emitter.on('error', callback);
      emitter.emit('error', 'Something went wrong', 500);

      expect(callback).toHaveBeenCalledWith('Something went wrong', 500);
    });

    it('если один обработчик зарегистрирован несколько раз, он вызывается соответствующее количество раз', () => {
      const emitter = new EventEmitter<TestEvents>();
      const callback = jest.fn();

      emitter.on('start', callback);
      emitter.on('start', callback);
      emitter.on('start', callback);
      emitter.emit('start');

      expect(callback).toHaveBeenCalledTimes(3);
    });

    it('обработчики разных событий не влияют друг на друга', () => {
      const emitter = new EventEmitter<TestEvents>();
      const startCallback = jest.fn();
      const tickCallback = jest.fn<TestEvents['tick']>();

      emitter.on('start', startCallback);
      emitter.on('tick', tickCallback);
      emitter.emit('start');

      expect(startCallback).toHaveBeenCalledTimes(1);
      expect(tickCallback).not.toHaveBeenCalled();
    });

    it('обработчики вызываются в порядке регистрации', () => {
      const emitter = new EventEmitter<TestEvents>();
      const order: number[] = [];

      emitter.on('start', () => order.push(1));
      emitter.on('start', () => order.push(2));
      emitter.on('start', () => order.push(3));
      emitter.emit('start');

      expect(order).toStrictEqual([1, 2, 3]);
    });
  });
});
