import { describe, expect, it, jest } from '@jest/globals';
import { MockedAgentFactory } from '@sentient-world/htn/mocks';

import { mockedState } from '../../state/mocks';
import { Character } from '../character';

import { getMockedCharacterDeps, peetData } from '../mocks';

describe(Character.name, () => {
  describe('#tick', () => {
    it('перенаправляет состояние переданное в параметрах, расширенное состоянием персонажа в HTN', () => {
      const agentFactory = new MockedAgentFactory();
      const character = new Character(peetData, getMockedCharacterDeps({ agentFactory }));
      // Агент должен быть создан - это проверяется в тестах на конструктор, поэтому можем себе позволить "!"
      const tickSpy = jest.spyOn(agentFactory.getCreatedAgents()[0]!, 'tick');

      character.tick(mockedState);

      expect(tickSpy).toHaveBeenCalledWith({
        ...mockedState,
        character: character.getState(),
      });
    });
  });
});
