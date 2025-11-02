import { describe, expect, it } from '@jest/globals';

import type { DateTime } from '../../../../core';
import { MockedComparator } from '../../../../core/mocks';
import { mockedState, StateBuilder } from '../../../../state/mocks';

import { getMockedSleepTaskDeps } from '../mocks';
import { HOUSE_RADIUS, SleepTask } from '../sleep-task';

describe(SleepTask.name, () => {
  describe('#applyEffects', () => {
    it('возвращает новый state с датой и временем равными until', () => {
      const until: DateTime = { date: 5, time: { hours: 7, minutes: 30 } };
      const task = new SleepTask({ until }, getMockedSleepTaskDeps());

      const newState = task.applyEffects(mockedState);

      expect(newState.world.dateTime.date).toBe(5);
      expect(newState.world.dateTime.time).toStrictEqual({ hours: 7, minutes: 30 });
    });
  });

  describe('#canExecute', () => {
    describe('проверка расстояния до дома', () => {
      it(`если дистанция меньше ${HOUSE_RADIUS}, возвращает true`, () => {
        const state = StateBuilder.of(mockedState)
          .withCharacterAtSpawn({ x: 3, y: 0, z: 0 })
          .build();
        const task = new SleepTask(
          { until: { date: 1, time: { hours: 7, minutes: 0 } } },
          getMockedSleepTaskDeps({ dateTimeComparator: MockedComparator.alwaysLess() })
        );

        expect(task.canExecute(state)).toBe(true);
      });

      it(`если дистанция равна ${HOUSE_RADIUS}, возвращает true`, () => {
        const state = StateBuilder.of(mockedState)
          .withCharacterAtSpawn({ x: HOUSE_RADIUS, y: 0, z: 0 })
          .build();
        const task = new SleepTask(
          { until: { date: 1, time: { hours: 7, minutes: 0 } } },
          getMockedSleepTaskDeps({ dateTimeComparator: MockedComparator.alwaysLess() })
        );

        expect(task.canExecute(state)).toBe(true);
      });

      it(`если дистанция больше ${HOUSE_RADIUS}, возвращает false`, () => {
        const state = StateBuilder.of(mockedState)
          .withCharacterAtSpawn({ x: HOUSE_RADIUS + 1, y: 0, z: 0 })
          .build();
        const task = new SleepTask(
          { until: { date: 1, time: { hours: 7, minutes: 0 } } },
          getMockedSleepTaskDeps({ dateTimeComparator: MockedComparator.alwaysLess() })
        );

        expect(task.canExecute(state)).toBe(false);
      });
    });

    describe('проверка времени', () => {
      it('если целевое время равно текущему, возвращает false', () => {
        const until: DateTime = { date: 1, time: { hours: 7, minutes: 0 } };
        const state = StateBuilder.of(mockedState)
          .withCharacterAtSpawn()
          .withWorldDateTime(until)
          .build();
        const task = new SleepTask(
          { until },
          getMockedSleepTaskDeps({ dateTimeComparator: MockedComparator.alwaysEqual() })
        );

        expect(task.canExecute(state)).toBe(false);
      });

      it('если целевое время прошло, возвращает false', () => {
        const until: DateTime = { date: 1, time: { hours: 7, minutes: 0 } };
        const state = StateBuilder.of(mockedState)
          .withCharacterAtSpawn()
          .withWorldDateTime({ date: 1, time: { hours: 8, minutes: 0 } }) // время после until
          .build();
        const task = new SleepTask(
          { until },
          getMockedSleepTaskDeps({ dateTimeComparator: MockedComparator.alwaysGreater() })
        );

        expect(task.canExecute(state)).toBe(false);
      });

      it('если целевое время ещё не достигнуто и персонаж дома, возвращает true', () => {
        const until: DateTime = { date: 1, time: { hours: 7, minutes: 0 } };
        const state = StateBuilder.of(mockedState)
          .withCharacterAtSpawn()
          .withWorldDateTime({ date: 1, time: { hours: 6, minutes: 0 } }) // время до until
          .build();
        const task = new SleepTask(
          { until },
          getMockedSleepTaskDeps({ dateTimeComparator: MockedComparator.alwaysLess() })
        );

        expect(task.canExecute(state)).toBe(true);
      });
    });
  });

  describe('#execute', () => {
    it('если целевое время равно текущему, возвращает success', () => {
      const until: DateTime = { date: 3, time: { hours: 7, minutes: 0 } };
      const state = StateBuilder.of(mockedState).withWorldDateTime(until).build();
      const task = new SleepTask(
        { until },
        getMockedSleepTaskDeps({ dateTimeComparator: MockedComparator.alwaysEqual() })
      );

      const result = task.execute(state);

      expect(result).toBe('success');
    });

    it('если целевое время прошло, возвращает failure', () => {
      const until: DateTime = { date: 3, time: { hours: 7, minutes: 0 } };
      const state = StateBuilder.of(mockedState)
        .withWorldDateTime({ date: 3, time: { hours: 8, minutes: 0 } }) // время после until
        .build();
      const task = new SleepTask(
        { until },
        getMockedSleepTaskDeps({ dateTimeComparator: MockedComparator.alwaysGreater() })
      );

      const result = task.execute(state);

      expect(result).toBe('failure');
    });

    it('если целевое время не достигнуто, возвращает running', () => {
      const until: DateTime = { date: 3, time: { hours: 7, minutes: 0 } };
      const state = StateBuilder.of(mockedState)
        .withWorldDateTime({ date: 3, time: { hours: 6, minutes: 0 } }) // время до until
        .build();
      const task = new SleepTask(
        { until },
        getMockedSleepTaskDeps({ dateTimeComparator: MockedComparator.alwaysLess() })
      );

      const result = task.execute(state);

      expect(result).toBe('running');
    });
  });
});
