import { describe, expect, it } from '@jest/globals';

import {
  MockedLocationChecker,
  MockedScheduleChecker,
  mockedState,
  StateBuilder,
} from '../../../../state/mocks';

import { SleepTask } from '../../../primitives/sleep-task';
import { getMockedNightTimeSleepDeps } from '../mocks';
import { NightTimeSleepMethod } from '../night-time-sleep-method';

describe(NightTimeSleepMethod.name, () => {
  describe('#preconditions', () => {
    it('если ночь и дома, возвращает true', () => {
      const method = new NightTimeSleepMethod({
        ...getMockedNightTimeSleepDeps(),
        scheduleChecker: MockedScheduleChecker.alwaysNight(),
        locationChecker: MockedLocationChecker.alwaysAtHome(),
      });

      const state = StateBuilder.of(mockedState)
        .withCharacterAtSpawn()
        .withWorldDateTime({
          date: mockedState.world.dateTime.date,
          time: { hours: 23, minutes: 0 },
        })
        .build();

      expect(method.preconditions(state)).toBe(true);
    });

    it('если ночь и не дома, возвращает false', () => {
      const method = new NightTimeSleepMethod({
        ...getMockedNightTimeSleepDeps(),
        scheduleChecker: MockedScheduleChecker.alwaysNight(),
        locationChecker: MockedLocationChecker.alwaysNotAtHome(),
      });

      const state = StateBuilder.of(mockedState)
        .withCharacterAtSpawn({ x: 10, y: 0, z: 0 })
        .withWorldDateTime({
          date: mockedState.world.dateTime.date,
          time: { hours: 4, minutes: 20 },
        })
        .build();

      expect(method.preconditions(state)).toBe(false);
    });

    it('если день и дома, возвращает false', () => {
      const method = new NightTimeSleepMethod({
        ...getMockedNightTimeSleepDeps(),
        scheduleChecker: MockedScheduleChecker.alwaysDay(),
        locationChecker: MockedLocationChecker.alwaysAtHome(),
      });

      const state = StateBuilder.of(mockedState)
        .withCharacterAtSpawn()
        .withWorldDateTime({
          date: mockedState.world.dateTime.date,
          time: { hours: 14, minutes: 30 },
        })
        .build();

      expect(method.preconditions(state)).toBe(false);
    });

    it('если день и не дома, возвращает false', () => {
      const method = new NightTimeSleepMethod({
        ...getMockedNightTimeSleepDeps(),
        scheduleChecker: MockedScheduleChecker.alwaysDay(),
        locationChecker: MockedLocationChecker.alwaysNotAtHome(),
      });

      const state = StateBuilder.of(mockedState)
        .withCharacterAtSpawn({ x: 10, y: 0, z: 0 })
        .withWorldDateTime({
          date: mockedState.world.dateTime.date,
          time: { hours: 12, minutes: 0 },
        })
        .build();

      expect(method.preconditions(state)).toBe(false);
    });
  });

  describe('#decompose', () => {
    it('возвращает SleepTask с целью проснуться на следующий день в 08:00', () => {
      const method = new NightTimeSleepMethod(getMockedNightTimeSleepDeps());

      const currentDate = 5;
      const state = StateBuilder.of(mockedState)
        .withWorldDateTime({
          date: currentDate,
          time: { hours: 23, minutes: 30 },
        })
        .build();

      const tasks = method.decompose(state);

      expect(tasks).toStrictEqual([expect.any(SleepTask)]);
      expect(tasks[0]!.getUntil()).toStrictEqual({
        date: currentDate + 1,
        time: { hours: 8, minutes: 0 },
      });
    });
  });
});
