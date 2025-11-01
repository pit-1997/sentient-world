import { getExternalMocks } from '../mocks';
import type { IRepository } from '../repository';
import { MemoryRepository } from '../repository/mocks';

import { Character } from './character';
import type { CharacterData, CharacterDeps, ICharacter } from './character';
import type { ICharacterFactory } from './factory';

export function getMockedCharacterDeps(deps?: Partial<CharacterDeps>): CharacterDeps {
  return getExternalMocks(deps);
}

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
    const character = new Character(characterData, getMockedCharacterDeps());
    this.createdCharacters.push(character);
    return character;
  }

  getCreatedCharacters(): ICharacter[] {
    return this.createdCharacters;
  }
}
