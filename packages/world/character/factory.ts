import type { IEngine } from '@sentient-world/engine';
import type { IAgentFactory } from '@sentient-world/htn';

import type { State } from '../world';

import { Character } from './character';
import type { CharacterData, CharacterDeps, ICharacter } from './character';

export interface ICharacterFactory {
  create(data: CharacterData): ICharacter;
}

export type CharacterFactoryDeps = CharacterDeps;

export class CharacterFactory {
  private readonly agentFactory: IAgentFactory<State>;
  private readonly engine: IEngine;

  constructor(deps: CharacterFactoryDeps) {
    this.agentFactory = deps.agentFactory;
    this.engine = deps.engine;
  }

  create(characterData: CharacterData): ICharacter {
    return new Character(characterData, {
      agentFactory: this.agentFactory,
      engine: this.engine,
    });
  }
}
