import { MockedEngine } from '@sentient-world/engine/mocks';
import { Agent, type ITask } from '@sentient-world/htn';

import type { IRepository } from '../../repository';
import { MemoryRepository } from '../../repository/__tests__/mocks';
import type { State } from '../../world';
import { Character } from '../character';
import type { CharacterData, CharacterDeps, ICharacter } from '../character';
import type { ICharacterFactory } from '../factory';

export const mockedCharacterDeps: CharacterDeps = {
  agentFactory: {
    create: (rootTask: ITask<State>) => new Agent<State>(rootTask),
  },
  engine: new MockedEngine(),
};

export const peetData: CharacterData = {
  id: 1,
  modelId: 79,
  name: 'Peet',
  surname: 'Peeterson',
  spawn: { x: 2313.28, y: 56.35, z: 26.48, angle: 359.29 },
};

export const johnData: CharacterData = {
  id: 2,
  modelId: 78,
  name: 'John',
  surname: 'Doe',
  spawn: { x: 2518.11, y: 11.04, z: 24.04, angle: 45.08 },
};

export const state: State = {
  character: {
    location: peetData.spawn,
    data: peetData,
  },
  world: {
    day: 1,
    time: { hours: 8, minutes: 10 },
  },
};

export class MockedCharacterRepository
  extends MemoryRepository<CharacterData>
  implements IRepository<CharacterData>
{
  constructor(characterData: CharacterData[] = [peetData, johnData]) {
    super(characterData);
  }
}

export class MockedCharacterFactory implements ICharacterFactory {
  private readonly createdCharacters: ICharacter[] = [];

  create(characterData: CharacterData) {
    const character = new Character(characterData, mockedCharacterDeps);
    this.createdCharacters.push(character);
    return character;
  }

  getCreatedCharacters(): ICharacter[] {
    return this.createdCharacters;
  }
}
