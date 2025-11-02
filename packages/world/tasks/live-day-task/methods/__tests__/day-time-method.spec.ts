import { describe, expect, it } from '@jest/globals';

import { MockedScheduleChecker, mockedState, StateBuilder } from '../../../../state/mocks';

import { WanderTask } from '../../../primitives/wander-task';
import { DayTimeMethod } from '../day-time-method';
import { getMockedDayTimeDeps } from '../mocks';

describe(DayTimeMethod.name, () => {
  describe('#preconditions', () => {
    it('если день, возвращает true', () => {
      const method = new DayTimeMethod({
        ...getMockedDayTimeDeps(),
        scheduleChecker: MockedScheduleChecker.alwaysDay(),
      });

      const state = StateBuilder.of(mockedState)
        .withWorldDateTime({
          date: mockedState.world.dateTime.date,
          time: { hours: 12, minutes: 0 },
        })
        .build();

      expect(method.preconditions(state)).toBe(true);
    });

    it('если ночь, возвращает false', () => {
      const method = new DayTimeMethod({
        ...getMockedDayTimeDeps(),
        scheduleChecker: MockedScheduleChecker.alwaysNight(),
      });

      const state = StateBuilder.of(mockedState)
        .withWorldDateTime({
          date: mockedState.world.dateTime.date,
          time: { hours: 2, minutes: 0 },
        })
        .build();

      expect(method.preconditions(state)).toBe(false);
    });
  });

  describe('#decompose', () => {
    it('возвращает WanderTask с целью блуждать до 22:00 текущего дня', () => {
      const method = new DayTimeMethod(getMockedDayTimeDeps());

      const currentDate = 5;
      const state = StateBuilder.of(mockedState)
        .withWorldDateTime({
          date: currentDate,
          time: { hours: 10, minutes: 30 },
        })
        .build();

      const tasks = method.decompose(state);

      expect(tasks).toStrictEqual([expect.any(WanderTask)]);
      expect(tasks[0]!.getUntil()).toStrictEqual({
        date: currentDate,
        time: { hours: 22, minutes: 0 },
      });
    });
  });
});
