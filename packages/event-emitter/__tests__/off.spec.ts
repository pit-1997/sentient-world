import { describe, expect, it, jest } from '@jest/globals';

import { EventEmitter } from '../event-emitter';

import type { TestEvents } from './test-events';

describe(EventEmitter.name, () => {
  describe('#off', () => {
    it('отписанные обработчики не вызываются при emit', () => {
      const emitter = new EventEmitter<TestEvents>();
      const callback = jest.fn();

      emitter.on('start', callback);
      emitter.off('start', callback);
      emitter.emit('start');

      expect(callback).not.toHaveBeenCalled();
    });

    it('если один из нескольких обработчиков отписан, остальные продолжают работать', () => {
      const emitter = new EventEmitter<TestEvents>();
      const callback1 = jest.fn();
      const callback2 = jest.fn();
      const callback3 = jest.fn();

      emitter.on('start', callback1);
      emitter.on('start', callback2);
      emitter.on('start', callback3);
      emitter.off('start', callback2);
      emitter.emit('start');

      expect(callback1).toHaveBeenCalledTimes(1);
      expect(callback2).not.toHaveBeenCalled();
      expect(callback3).toHaveBeenCalledTimes(1);
    });

    it('отписка незарегистрированного обработчика не вызывает ошибку', () => {
      const emitter = new EventEmitter<TestEvents>();
      const callback = jest.fn();

      expect(() => emitter.off('start', callback)).not.toThrow();
    });

    it('если обработчик был зарегистрирован несколько раз, off удаляет все его экземпляры', () => {
      const emitter = new EventEmitter<TestEvents>();
      const callback = jest.fn();

      emitter.on('start', callback);
      emitter.on('start', callback);
      emitter.on('start', callback);
      emitter.off('start', callback);
      emitter.emit('start');

      expect(callback).not.toHaveBeenCalled();
    });

    it('отписка от несуществующего события не вызывает ошибку', () => {
      const emitter = new EventEmitter<TestEvents>();
      const callback = jest.fn();

      expect(() => emitter.off('start', callback)).not.toThrow();
    });

    it('обработчики зарегистрированные через once могут быть отписаны до emit', () => {
      const emitter = new EventEmitter<TestEvents>();
      const callback = jest.fn();

      emitter.once('start', callback);
      emitter.off('start', callback);
      emitter.emit('start');

      expect(callback).not.toHaveBeenCalled();
    });

    it('отписка обработчика одного события не влияет на обработчики других событий', () => {
      const emitter = new EventEmitter<TestEvents>();
      const startCallback = jest.fn();
      const tickCallback = jest.fn(() => 'строка');

      emitter.on('start', startCallback);
      emitter.on('tick', tickCallback);
      emitter.off('start', startCallback);
      emitter.emit('start');
      emitter.emit('tick', 42);

      expect(startCallback).not.toHaveBeenCalled();
      expect(tickCallback).toHaveBeenCalledTimes(1);
    });
  });
});
