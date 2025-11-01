import { describe, expect, it, jest } from '@jest/globals';
import type { IAgent, IAgentFactory } from '@sentient-world/htn';

import type { State } from '../../world/state';
import { Character } from '../character';

import { getMockedCharacterDeps, peetData, state } from './mocks';

describe(Character.name, () => {
  describe('#tick', () => {
    it('перенаправляет состояние переданное в параметрах, расширенное состоянием персонажа в HTN', () => {
      const agent: IAgent<State> = { tick: jest.fn() };
      const agentFactory = {
        create: jest.fn<IAgentFactory<State>['create']>().mockReturnValue(agent),
      } satisfies IAgentFactory<State>;
      const character = new Character(peetData, getMockedCharacterDeps({ agentFactory }));

      character.tick(state);

      expect(agent.tick).toHaveBeenCalledWith({
        ...state,
        character: character.getState(),
      });
    });
  });
});
