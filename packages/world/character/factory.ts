import type { IEngine, IGeometry } from '@sentient-world/engine';
import type { IAgentFactory } from '@sentient-world/htn';

import type { State } from '../state';

import { Character } from './character';
import type { CharacterData, CharacterDeps, ICharacter } from './character';

export interface ICharacterFactory {
  create(data: CharacterData): ICharacter;
}

export type CharacterFactoryDeps = CharacterDeps;

export class CharacterFactory implements ICharacterFactory {
  private readonly agentFactory: IAgentFactory<State> | undefined;
  private readonly engine: IEngine;
  private readonly geometry: IGeometry;

  constructor(deps: CharacterFactoryDeps) {
    this.agentFactory = deps.agentFactory;
    this.engine = deps.engine;
    this.geometry = deps.geometry;
  }

  create(characterData: CharacterData): ICharacter {
    const deps: CharacterDeps = {
      engine: this.engine,
      geometry: this.geometry,
    };

    if (this.agentFactory) {
      deps.agentFactory = this.agentFactory;
    }

    return new Character(characterData, deps);
  }
}
