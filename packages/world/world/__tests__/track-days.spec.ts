import { describe, expect, it } from '@jest/globals';
import { MockedEngine } from '@sentient-world/engine/mocks';

import { constants } from '../constants';
import { getMockedWorldDeps } from '../mocks';
import { World } from '../world';

describe(`${World.name} - отслеживание дней`, () => {
  describe('начальное состояние', () => {
    it('день начинается с 1', () => {
      const world = new World(getMockedWorldDeps());
      const state = world.getState();

      expect(state.day).toBe(1);
    });
  });

  describe('интервал отслеживания', () => {
    it(`проверяет смену дня раз в ${constants.DAY_TRACKING_INTERVAL} мс`, () => {
      const engine = new MockedEngine();
      const world = new World(getMockedWorldDeps({ engine }));

      engine.setTime({ hours: 23, minutes: 0 }); // Устанавливаем время на поздний вечер
      engine.resumeThreads(constants.DAY_TRACKING_INTERVAL - 1); // Ждём почти полный интервал - день не должен измениться

      expect(world.getState().day).toBe(1);

      engine.resumeThreads(1); // Довершаем интервал - всё ещё день 1 (не было перехода через полночь)

      expect(world.getState().day).toBe(1);

      engine.setTime({ hours: 1, minutes: 0 }); // Переводим на раннее утро
      // Ждём почти полный интервал - день всё ещё 1
      engine.resumeThreads(constants.DAY_TRACKING_INTERVAL - 1);

      expect(world.getState().day).toBe(1);

      // Довершаем интервал - теперь день 2
      engine.resumeThreads(1);

      expect(world.getState().day).toBe(2);
    });
  });

  describe('переход на следующий день', () => {
    it('происходит когда время меняется с позднего вечера на раннее утро', () => {
      const engine = new MockedEngine();
      const world = new World(getMockedWorldDeps({ engine }));

      // Поздний вечер
      engine.setTime({ hours: 23, minutes: 59 });
      engine.resumeThreads(constants.DAY_TRACKING_INTERVAL);

      // Раннее утро следующего дня
      engine.setTime({ hours: 0, minutes: 0 });
      engine.resumeThreads(constants.DAY_TRACKING_INTERVAL);

      expect(world.getState().day).toBe(2);
    });

    it('происходит даже если пропущено несколько часов ночи', () => {
      const engine = new MockedEngine();
      const world = new World(getMockedWorldDeps({ engine }));

      // Поздний вечер
      engine.setTime({ hours: 22, minutes: 0 });
      engine.resumeThreads(constants.DAY_TRACKING_INTERVAL);

      // Утро (пропустили полночь)
      engine.setTime({ hours: 5, minutes: 0 });
      engine.resumeThreads(constants.DAY_TRACKING_INTERVAL);

      expect(world.getState().day).toBe(2);
    });

    it('может происходить несколько раз подряд', () => {
      const engine = new MockedEngine();
      const world = new World(getMockedWorldDeps({ engine }));

      // Первый переход: день 1 -> день 2
      engine.setTime({ hours: 23, minutes: 0 });
      engine.resumeThreads(constants.DAY_TRACKING_INTERVAL);
      engine.setTime({ hours: 1, minutes: 0 });
      engine.resumeThreads(constants.DAY_TRACKING_INTERVAL);

      expect(world.getState().day).toBe(2);

      // Второй переход: день 2 -> день 3
      engine.setTime({ hours: 23, minutes: 0 });
      engine.resumeThreads(constants.DAY_TRACKING_INTERVAL);
      engine.setTime({ hours: 2, minutes: 0 });
      engine.resumeThreads(constants.DAY_TRACKING_INTERVAL);

      expect(world.getState().day).toBe(3);

      // Третий переход: день 3 -> день 4
      engine.setTime({ hours: 22, minutes: 0 });
      engine.resumeThreads(constants.DAY_TRACKING_INTERVAL);
      engine.setTime({ hours: 0, minutes: 30 });
      engine.resumeThreads(constants.DAY_TRACKING_INTERVAL);

      expect(world.getState().day).toBe(4);
    });
  });

  describe('не происходит переход на следующий день', () => {
    it('при обычном течении времени днём', () => {
      const engine = new MockedEngine();
      const world = new World(getMockedWorldDeps({ engine }));

      engine.setTime({ hours: 12, minutes: 0 });
      engine.resumeThreads(constants.DAY_TRACKING_INTERVAL);
      engine.setTime({ hours: 13, minutes: 0 });
      engine.resumeThreads(constants.DAY_TRACKING_INTERVAL);

      expect(world.getState().day).toBe(1);
    });

    it('при обычном течении времени утром', () => {
      const engine = new MockedEngine();
      const world = new World(getMockedWorldDeps({ engine }));

      engine.setTime({ hours: 5, minutes: 0 });
      engine.resumeThreads(constants.DAY_TRACKING_INTERVAL);
      engine.setTime({ hours: 6, minutes: 0 });
      engine.resumeThreads(constants.DAY_TRACKING_INTERVAL);

      expect(world.getState().day).toBe(1);
    });

    it('при обычном течении времени вечером', () => {
      const engine = new MockedEngine();
      const world = new World(getMockedWorldDeps({ engine }));

      engine.setTime({ hours: 19, minutes: 0 });
      engine.resumeThreads(constants.DAY_TRACKING_INTERVAL);
      engine.setTime({ hours: 20, minutes: 0 });
      engine.resumeThreads(constants.DAY_TRACKING_INTERVAL);

      expect(world.getState().day).toBe(1);
    });

    it('при движении времени в пределах раннего утра после перехода через полночь', () => {
      const engine = new MockedEngine();
      const world = new World(getMockedWorldDeps({ engine }));

      // Переходим через полночь
      engine.setTime({ hours: 23, minutes: 0 });
      engine.resumeThreads(constants.DAY_TRACKING_INTERVAL);
      engine.setTime({ hours: 0, minutes: 0 });
      engine.resumeThreads(constants.DAY_TRACKING_INTERVAL);

      expect(world.getState().day).toBe(2);

      // Время течёт утром - день не должен меняться
      engine.setTime({ hours: 1, minutes: 0 });
      engine.resumeThreads(constants.DAY_TRACKING_INTERVAL);

      expect(world.getState().day).toBe(2);

      engine.setTime({ hours: 3, minutes: 0 });
      engine.resumeThreads(constants.DAY_TRACKING_INTERVAL);

      expect(world.getState().day).toBe(2);

      engine.setTime({ hours: 5, minutes: 0 });
      engine.resumeThreads(constants.DAY_TRACKING_INTERVAL);

      expect(world.getState().day).toBe(2);
    });
  });
});
