import { describe, expect, it } from '@jest/globals';

import type { DateTime } from '../../../../core';
import { MockedComparator } from '../../../../core/mocks';
import { mockedState, StateBuilder } from '../../../../state/mocks';

import { getMockedWanderTaskDeps } from '../mocks';
import { WanderTask } from '../wander-task';

describe(WanderTask.name, () => {
  describe('#canExecute', () => {
    it('если текущее время меньше until, возвращает true', () => {
      const currentTime: DateTime = { date: 1, time: { hours: 6, minutes: 0 } };
      const until: DateTime = { date: 1, time: { hours: 7, minutes: 0 } };
      const task = new WanderTask(
        { until },
        getMockedWanderTaskDeps({ dateTimeComparator: MockedComparator.alwaysLess() })
      );

      const state = StateBuilder.of(mockedState).withWorldDateTime(currentTime).build();

      expect(task.canExecute(state)).toBe(true);
    });

    it('если текущее время равно until, возвращает false', () => {
      const currentTime: DateTime = { date: 1, time: { hours: 7, minutes: 0 } };
      const until: DateTime = { date: 1, time: { hours: 7, minutes: 0 } };
      const task = new WanderTask(
        { until },
        getMockedWanderTaskDeps({ dateTimeComparator: MockedComparator.alwaysEqual() })
      );

      const state = StateBuilder.of(mockedState).withWorldDateTime(currentTime).build();

      expect(task.canExecute(state)).toBe(false);
    });

    it('если текущее время больше until, возвращает false', () => {
      const currentTime: DateTime = { date: 1, time: { hours: 8, minutes: 0 } };
      const until: DateTime = { date: 1, time: { hours: 7, minutes: 0 } };
      const task = new WanderTask(
        { until },
        getMockedWanderTaskDeps({ dateTimeComparator: MockedComparator.alwaysGreater() })
      );

      const state = StateBuilder.of(mockedState).withWorldDateTime(currentTime).build();

      expect(task.canExecute(state)).toBe(false);
    });
  });
});
