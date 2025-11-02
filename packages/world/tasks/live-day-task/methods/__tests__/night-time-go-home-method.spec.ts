import { describe, expect, it } from '@jest/globals';

import {
  MockedLocationChecker,
  MockedScheduleChecker,
  mockedState,
  StateBuilder,
} from '../../../../state/mocks';

import { GoToPositionTask } from '../../../primitives/go-to-position-task';
import { getMockedNightTimeGoHomeDeps } from '../mocks';
import { NightTimeGoHomeMethod } from '../night-time-go-home-method';

describe(NightTimeGoHomeMethod.name, () => {
  describe('#preconditions', () => {
    it('если ночь и не дома, возвращает true', () => {
      const method = new NightTimeGoHomeMethod({
        ...getMockedNightTimeGoHomeDeps(),
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

      expect(method.preconditions(state)).toBe(true);
    });

    it('если ночь и дома, возвращает false', () => {
      const method = new NightTimeGoHomeMethod({
        ...getMockedNightTimeGoHomeDeps(),
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

      expect(method.preconditions(state)).toBe(false);
    });

    it('если день и не дома, возвращает false', () => {
      const method = new NightTimeGoHomeMethod({
        ...getMockedNightTimeGoHomeDeps(),
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

    it('если день и дома, возвращает false', () => {
      const method = new NightTimeGoHomeMethod({
        ...getMockedNightTimeGoHomeDeps(),
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
  });

  describe('#decompose', () => {
    it('возвращает GoToPositionTask с целью в spawn персонажа', () => {
      const method = new NightTimeGoHomeMethod(getMockedNightTimeGoHomeDeps());
      const spawn = { x: 10, y: 20, z: 30, angle: 0 };
      const state = StateBuilder.of(mockedState).withCharacterSpawn(spawn).build();

      const tasks = method.decompose(state);

      expect(tasks).toStrictEqual([expect.any(GoToPositionTask)]);
      expect(tasks[0]!.getTarget()).toStrictEqual(spawn);
    });
  });
});
