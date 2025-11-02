import { describe, expect, it, jest } from '@jest/globals';
import type { IActor, Position } from '@sentient-world/engine';
import { MockedActor } from '@sentient-world/engine/mocks';

import { mockedState, StateBuilder } from '../../../../state/mocks';

import { GoToPositionTask } from '../go-to-position-task';
import { getMockedGoToPositionTaskDeps } from '../mocks';

describe(GoToPositionTask.name, () => {
  describe('#applyEffects', () => {
    it('возвращает новый state с позицией персонажа равной target', () => {
      const target: Position = { x: 10, y: 20, z: 30, angle: 90 };
      const task = new GoToPositionTask({ target }, getMockedGoToPositionTaskDeps());

      const newState = task.applyEffects(mockedState);

      expect(newState.character.position).toStrictEqual(target);
    });
  });

  describe('#canExecute', () => {
    it('всегда возвращает true', () => {
      const task = new GoToPositionTask(
        { target: { x: 0, y: 0, z: 0, angle: 0 } },
        getMockedGoToPositionTaskDeps()
      );

      expect(task.canExecute()).toBe(true);
    });
  });

  describe('#execute', () => {
    it('если расстояние до цели ≤ 1, возвращает success', () => {
      const target: Position = { x: 1, y: 0, z: 0, angle: 45 };
      const task = new GoToPositionTask({ target }, getMockedGoToPositionTaskDeps());
      const state = StateBuilder.of(mockedState)
        .withCharacterPosition({ x: 0.5, y: 0, z: 0, angle: 0 })
        .build();

      const result = task.execute(state);

      expect(result).toBe('success');
    });

    it('если расстояние до цели ≤ 1, вызывает actor.taskClear()', () => {
      const actor = new MockedActor({ modelId: 76, position: { x: 0, y: 0, z: 0, angle: 0 } });
      const taskClearSpy = jest.spyOn(actor, 'taskClear');
      const target: Position = { x: 0.5, y: 0, z: 0, angle: 45 };
      const task = new GoToPositionTask({ target }, getMockedGoToPositionTaskDeps({ actor }));
      const state = StateBuilder.of(mockedState)
        .withCharacterPosition({ x: 0, y: 0, z: 0, angle: 0 })
        .build();

      task.execute(state);

      expect(taskClearSpy).toHaveBeenCalledTimes(1);
    });

    it('если расстояние до цели ≤ 1, вызывает actor.taskAchieveAngle() с углом из target', () => {
      const actor: IActor = new MockedActor({
        modelId: 76,
        position: { x: 0, y: 0, z: 0, angle: 0 },
      });
      const taskAchieveAngleSpy = jest.spyOn(actor, 'taskAchieveAngle');
      const target: Position = { x: 0.5, y: 0, z: 0, angle: 45 };
      const task = new GoToPositionTask({ target }, getMockedGoToPositionTaskDeps({ actor }));
      const state = StateBuilder.of(mockedState)
        .withCharacterPosition({ x: 0, y: 0, z: 0, angle: 0 })
        .build();

      task.execute(state);

      expect(taskAchieveAngleSpy).toHaveBeenCalledWith(45);
    });

    it('если расстояние до цели > 1 и задача выполняется впервые, возвращает running', () => {
      const target: Position = { x: 10, y: 0, z: 0, angle: 45 };
      const task = new GoToPositionTask({ target }, getMockedGoToPositionTaskDeps());
      const state = StateBuilder.of(mockedState)
        .withCharacterPosition({ x: 0, y: 0, z: 0, angle: 0 })
        .build();

      const result = task.execute(state);

      expect(result).toBe('running');
    });

    it('если расстояние до цели > 1 и задача выполняется впервые, вызывает actor.taskGoToPoint() с target', () => {
      const actor = new MockedActor({ modelId: 76, position: { x: 0, y: 0, z: 0, angle: 0 } });
      const taskGoToPointSpy = jest.spyOn(actor, 'taskGoToPoint');
      const target: Position = { x: 10, y: 0, z: 0, angle: 45 };
      const task = new GoToPositionTask({ target }, getMockedGoToPositionTaskDeps({ actor }));
      const state = StateBuilder.of(mockedState)
        .withCharacterPosition({ x: 0, y: 0, z: 0, angle: 0 })
        .build();

      task.execute(state);

      expect(taskGoToPointSpy).toHaveBeenCalledWith(target);
    });

    it('если расстояние до цели > 1 и задача уже была запущена ранее, возвращает running', () => {
      const target: Position = { x: 10, y: 0, z: 0, angle: 45 };
      const task = new GoToPositionTask({ target }, getMockedGoToPositionTaskDeps());
      const state1 = StateBuilder.of(mockedState)
        .withCharacterPosition({ x: 0, y: 0, z: 0, angle: 0 })
        .build();
      const state2 = StateBuilder.of(mockedState)
        .withCharacterPosition({ x: 5, y: 0, z: 0, angle: 0 })
        .build();

      task.execute(state1);
      const result = task.execute(state2);

      expect(result).toBe('running');
    });

    it('если расстояние до цели > 1 и задача уже была запущена ранее, не вызывает actor.taskGoToPoint() повторно', () => {
      const actor = new MockedActor({ modelId: 76, position: { x: 0, y: 0, z: 0, angle: 0 } });
      const taskGoToPointSpy = jest.spyOn(actor, 'taskGoToPoint');
      const target: Position = { x: 10, y: 0, z: 0, angle: 45 };
      const task = new GoToPositionTask({ target }, getMockedGoToPositionTaskDeps({ actor }));
      const state1 = StateBuilder.of(mockedState)
        .withCharacterPosition({ x: 0, y: 0, z: 0, angle: 0 })
        .build();
      const state2 = StateBuilder.of(mockedState)
        .withCharacterPosition({ x: 5, y: 0, z: 0, angle: 0 })
        .build();

      task.execute(state1);
      task.execute(state2);

      expect(taskGoToPointSpy).toHaveBeenCalledTimes(1);
    });

    it('если после нескольких вызовов execute персонаж достиг цели, возвращает success', () => {
      const actor = new MockedActor({ modelId: 76, position: { x: 0, y: 0, z: 0, angle: 0 } });
      const target: Position = { x: 2, y: 0, z: 0, angle: 45 };
      const task = new GoToPositionTask({ target }, getMockedGoToPositionTaskDeps({ actor }));

      const state1 = StateBuilder.of(mockedState)
        .withCharacterPosition({ x: 0, y: 0, z: 0, angle: 0 })
        .build();
      const result1 = task.execute(state1);

      expect(result1).toBe('running');

      const state2 = StateBuilder.of(mockedState)
        .withCharacterPosition({ x: 0.95, y: 0, z: 0, angle: 0 })
        .build();
      const result2 = task.execute(state2);

      expect(result2).toBe('running');

      const state3 = StateBuilder.of(mockedState)
        .withCharacterPosition({ x: 2, y: 0, z: 0, angle: 0 })
        .build();
      const result3 = task.execute(state3);

      expect(result3).toBe('success');
    });
  });
});
