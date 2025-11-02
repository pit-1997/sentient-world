import { describe, expect, it } from '@jest/globals';

import type { DateTime } from '../../../../date-time';
import { mockedState } from '../../../../state/mocks';

import { getMockedWanderTaskDeps } from '../mocks';
import { WanderTask } from '../wander-task';

describe(WanderTask.name, () => {
  describe('#applyEffects', () => {
    it('возвращает новый state с датой и временем равными until', () => {
      const until: DateTime = { date: 5, time: { hours: 7, minutes: 30 } };
      const task = new WanderTask({ until }, getMockedWanderTaskDeps());

      const newState = task.applyEffects(mockedState);

      expect(newState.world.dateTime.date).toBe(5);
      expect(newState.world.dateTime.time).toStrictEqual({ hours: 7, minutes: 30 });
    });
  });
});
