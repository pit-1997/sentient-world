import { describe, expect, it, jest } from '@jest/globals';
import { MockedEngine } from '@sentient-world/engine/mocks';
import { MockedAgentFactory } from '@sentient-world/htn/mocks';

import { LiveDayTask } from '../../tasks/live-day-task';
import { Character } from '../character';
import { getMockedCharacterDeps, peetData } from '../mocks';

describe(Character.name, () => {
  describe('#constructor', () => {
    it('создаёт HTN агента с задачей LiveDayTask', () => {
      const agentFactory = new MockedAgentFactory();

      new Character(peetData, getMockedCharacterDeps({ agentFactory }));
      const createdAgents = agentFactory.getCreatedAgents();

      expect(createdAgents).toHaveLength(1);

      const rootTask = createdAgents[0]!.getRootTask();

      expect(rootTask).toBeInstanceOf(LiveDayTask);
    });

    it('создаёт актора на позиции из данных персонажа', () => {
      const engine = new MockedEngine();
      const createActor = jest.spyOn(engine, 'createActor');

      new Character(peetData, getMockedCharacterDeps({ engine }));

      expect(createActor).toHaveBeenCalledWith(
        expect.objectContaining({ position: peetData.spawn })
      );
    });

    it('создаёт актора с моделью из данных персонажа', () => {
      const engine = new MockedEngine();
      const createActor = jest.spyOn(engine, 'createActor');

      new Character(peetData, getMockedCharacterDeps({ engine }));

      expect(createActor).toHaveBeenCalledWith(
        expect.objectContaining({ modelId: peetData.modelId })
      );
    });
  });
});
