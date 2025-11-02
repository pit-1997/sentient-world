import { describe, expect, it, jest } from '@jest/globals';
import { defaultActorConstructorOptions, MockedActor } from '@sentient-world/engine/mocks';

import type { DateTime } from '../../../../core';
import { MockedComparator } from '../../../../core/mocks';
import { mockedState, StateBuilder } from '../../../../state/mocks';

import { getMockedWanderTaskDeps } from '../mocks';
import { WanderTask } from '../wander-task';

describe(WanderTask.name, () => {
  describe('#execute', () => {
    describe('если целевое время равно текущему', () => {
      it('прекращает все задачи актора', () => {
        const currentTime: DateTime = { date: 3, time: { hours: 7, minutes: 0 } };
        const until: DateTime = { date: 3, time: { hours: 7, minutes: 0 } };
        const actor = new MockedActor(defaultActorConstructorOptions);
        const taskClearSpy = jest.spyOn(actor, 'taskClear');
        const task = new WanderTask(
          { until },
          getMockedWanderTaskDeps({
            actor,
            dateTimeComparator: MockedComparator.alwaysEqual(),
          })
        );

        task.execute(StateBuilder.of(mockedState).withWorldDateTime(currentTime).build());

        expect(taskClearSpy).toHaveBeenCalledTimes(1);
      });

      it('не начинает задачу блуждания у актора', () => {
        const currentTime: DateTime = { date: 3, time: { hours: 7, minutes: 0 } };
        const until: DateTime = { date: 3, time: { hours: 7, minutes: 0 } };
        const actor = new MockedActor(defaultActorConstructorOptions);
        const taskWanderSpy = jest.spyOn(actor, 'taskWander');
        const task = new WanderTask(
          { until },
          getMockedWanderTaskDeps({
            actor,
            dateTimeComparator: MockedComparator.alwaysEqual(),
          })
        );

        task.execute(StateBuilder.of(mockedState).withWorldDateTime(currentTime).build());

        expect(taskWanderSpy).not.toHaveBeenCalled();
      });

      it('возвращает success', () => {
        const currentTime: DateTime = { date: 3, time: { hours: 7, minutes: 0 } };
        const until: DateTime = { date: 3, time: { hours: 7, minutes: 0 } };
        const task = new WanderTask(
          { until },
          getMockedWanderTaskDeps({ dateTimeComparator: MockedComparator.alwaysEqual() })
        );

        const state = StateBuilder.of(mockedState).withWorldDateTime(currentTime).build();
        const result = task.execute(state);

        expect(result).toBe('success');
      });
    });

    describe('если целевое время прошло', () => {
      it('прекращает все задачи актора', () => {
        const currentTime: DateTime = { date: 3, time: { hours: 8, minutes: 0 } };
        const until: DateTime = { date: 3, time: { hours: 7, minutes: 0 } };
        const actor = new MockedActor(defaultActorConstructorOptions);
        const taskClearSpy = jest.spyOn(actor, 'taskClear');
        const task = new WanderTask(
          { until },
          getMockedWanderTaskDeps({
            actor,
            dateTimeComparator: MockedComparator.alwaysGreater(),
          })
        );

        task.execute(StateBuilder.of(mockedState).withWorldDateTime(currentTime).build());

        expect(taskClearSpy).toHaveBeenCalledTimes(1);
      });

      it('не начинает задачу блуждания у актора', () => {
        const currentTime: DateTime = { date: 3, time: { hours: 8, minutes: 0 } };
        const until: DateTime = { date: 3, time: { hours: 7, minutes: 0 } };
        const actor = new MockedActor(defaultActorConstructorOptions);
        const taskWanderSpy = jest.spyOn(actor, 'taskWander');
        const task = new WanderTask(
          { until },
          getMockedWanderTaskDeps({
            actor,
            dateTimeComparator: MockedComparator.alwaysGreater(),
          })
        );

        task.execute(StateBuilder.of(mockedState).withWorldDateTime(currentTime).build());

        expect(taskWanderSpy).not.toHaveBeenCalled();
      });

      it('возвращает failure', () => {
        const currentTime: DateTime = { date: 3, time: { hours: 8, minutes: 0 } };
        const until: DateTime = { date: 3, time: { hours: 7, minutes: 0 } };
        const task = new WanderTask(
          { until },
          getMockedWanderTaskDeps({ dateTimeComparator: MockedComparator.alwaysGreater() })
        );

        const state = StateBuilder.of(mockedState).withWorldDateTime(currentTime).build();
        const result = task.execute(state);

        expect(result).toBe('failure');
      });
    });

    describe('если целевое время не достигнуто', () => {
      it('при первом вызове, начинает задачу блуждания у актора', () => {
        const currentTime: DateTime = { date: 3, time: { hours: 6, minutes: 0 } };
        const until: DateTime = { date: 3, time: { hours: 7, minutes: 0 } };
        const actor = new MockedActor(defaultActorConstructorOptions);
        const taskWanderSpy = jest.spyOn(actor, 'taskWander');
        const task = new WanderTask(
          { until },
          getMockedWanderTaskDeps({
            actor,
            dateTimeComparator: MockedComparator.alwaysLess(),
          })
        );

        const state = StateBuilder.of(mockedState).withWorldDateTime(currentTime).build();
        task.execute(state);

        expect(taskWanderSpy).toHaveBeenCalledTimes(1);
      });

      it('при последующих вызовах, не начинает задачу блуждания повторно', () => {
        const currentTime: DateTime = { date: 3, time: { hours: 6, minutes: 0 } };
        const until: DateTime = { date: 3, time: { hours: 7, minutes: 0 } };
        const actor = new MockedActor(defaultActorConstructorOptions);
        const taskWanderSpy = jest.spyOn(actor, 'taskWander');
        const task = new WanderTask(
          { until },
          getMockedWanderTaskDeps({
            actor,
            dateTimeComparator: MockedComparator.alwaysLess(),
          })
        );

        const state = StateBuilder.of(mockedState).withWorldDateTime(currentTime).build();
        task.execute(state);
        task.execute(state);

        expect(taskWanderSpy).toHaveBeenCalledTimes(1);
      });

      it('не прекращает задачи актора', () => {
        const currentTime: DateTime = { date: 3, time: { hours: 6, minutes: 0 } };
        const until: DateTime = { date: 3, time: { hours: 7, minutes: 0 } };
        const actor = new MockedActor(defaultActorConstructorOptions);
        const taskClearSpy = jest.spyOn(actor, 'taskClear');
        const task = new WanderTask(
          { until },
          getMockedWanderTaskDeps({
            actor,
            dateTimeComparator: MockedComparator.alwaysLess(),
          })
        );

        const state = StateBuilder.of(mockedState).withWorldDateTime(currentTime).build();
        task.execute(state);

        expect(taskClearSpy).not.toHaveBeenCalled();
      });

      it('возвращает running', () => {
        const currentTime: DateTime = { date: 3, time: { hours: 6, minutes: 0 } };
        const until: DateTime = { date: 3, time: { hours: 7, minutes: 0 } };
        const task = new WanderTask(
          { until },
          getMockedWanderTaskDeps({ dateTimeComparator: MockedComparator.alwaysLess() })
        );

        const state = StateBuilder.of(mockedState).withWorldDateTime(currentTime).build();
        const result = task.execute(state);

        expect(result).toBe('running');
      });
    });
  });
});
