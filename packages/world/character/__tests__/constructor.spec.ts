import { describe, expect, it, jest } from '@jest/globals';
import { MockedEngine } from '@sentient-world/engine/mocks';
import type { IAgentFactory } from '@sentient-world/htn';

import { LiveDayTask } from '../../tasks/live-day-task';
import type { State } from '../../world';
import { Character } from '../character';

import { peetData, mockedCharacterDeps } from './mocks';

describe(Character.name, () => {
  describe('#constructor', () => {
    it('создаёт HTN агента с задачей LiveDayTask', () => {
      const agentFactory = {
        create: jest.fn<IAgentFactory<State>['create']>(),
      } satisfies IAgentFactory<State>;

      new Character(peetData, { ...mockedCharacterDeps, agentFactory });

      expect(agentFactory.create).toHaveBeenCalledWith(expect.any(LiveDayTask));
    });

    it('создаёт актора на позиции из данных персонажа', () => {
      const engine = new MockedEngine();
      const createActor = jest.spyOn(engine, 'createActor');

      new Character(peetData, { ...mockedCharacterDeps, engine });

      expect(createActor).toHaveBeenCalledWith(
        expect.objectContaining({ position: peetData.spawn })
      );
    });

    it('создаёт актора с моделью из данных персонажа', () => {
      const engine = new MockedEngine();
      const createActor = jest.spyOn(engine, 'createActor');

      new Character(peetData, { ...mockedCharacterDeps, engine });

      expect(createActor).toHaveBeenCalledWith(
        expect.objectContaining({ modelId: peetData.modelId })
      );
    });
  });
});
