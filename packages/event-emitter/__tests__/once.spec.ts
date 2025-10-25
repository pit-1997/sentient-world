import { describe, expect, it, jest } from '@jest/globals';

import { EventEmitter } from '../event-emitter';

import type { TestEvents } from './test-events';

describe(EventEmitter.name, () => {
  describe('#once', () => {
    it('обработчики зарегистрированные через once вызываются только один раз', () => {
      const emitter = new EventEmitter<TestEvents>();
      const callback = jest.fn();

      emitter.once('start', callback);
      emitter.emit('start');
      emitter.emit('start');
      emitter.emit('start');

      expect(callback).toHaveBeenCalledTimes(1);
    });

    it('обработчики вызываются с переданными аргументами', () => {
      const emitter = new EventEmitter<TestEvents>();
      const callback = jest.fn<TestEvents['tick']>();

      emitter.once('tick', callback);
      emitter.emit('tick', 42);

      expect(callback).toHaveBeenCalledWith(42);
    });

    it('если несколько обработчиков зарегистрированы через once, каждый вызывается по одному разу', () => {
      const emitter = new EventEmitter<TestEvents>();
      const callback1 = jest.fn();
      const callback2 = jest.fn();
      const callback3 = jest.fn();

      emitter.once('start', callback1);
      emitter.once('start', callback2);
      emitter.once('start', callback3);
      emitter.emit('start');
      emitter.emit('start');

      expect(callback1).toHaveBeenCalledTimes(1);
      expect(callback2).toHaveBeenCalledTimes(1);
      expect(callback3).toHaveBeenCalledTimes(1);
    });

    it('обработчики не реагируют на события произошедшие до регистрации', () => {
      const emitter = new EventEmitter<TestEvents>();
      const callback = jest.fn();

      emitter.emit('start');
      emitter.once('start', callback);

      expect(callback).not.toHaveBeenCalled();
    });

    it('обработчики через on и once могут сосуществовать для одного события', () => {
      const emitter = new EventEmitter<TestEvents>();
      const onCallback = jest.fn();
      const onceCallback = jest.fn();

      emitter.on('start', onCallback);
      emitter.once('start', onceCallback);
      emitter.emit('start');
      emitter.emit('start');

      expect(onCallback).toHaveBeenCalledTimes(2);
      expect(onceCallback).toHaveBeenCalledTimes(1);
    });

    it('если один обработчик зарегистрирован несколько раз через once, он вызывается соответствующее количество раз', () => {
      const emitter = new EventEmitter<TestEvents>();
      const callback = jest.fn();

      emitter.once('start', callback);
      emitter.once('start', callback);
      emitter.once('start', callback);
      emitter.emit('start');

      expect(callback).toHaveBeenCalledTimes(3);
    });
  });
});
