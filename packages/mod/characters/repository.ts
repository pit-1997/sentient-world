import type { CharacterData, IRepository } from '@sentient-world/world';

export const charactersData: CharacterData[] = [
  {
    id: 1,
    modelId: 79,
    name: 'Peet',
    surname: 'Peeterson',
    spawn: {
      x: 2313.28,
      y: 56.35,
      z: 26.48,
      angle: 359.29,
    },
  },
];

export class CharactersRepository implements IRepository<CharacterData> {
  private readonly charactersData: CharacterData[];

  constructor(charactersData: CharacterData[]) {
    this.charactersData = charactersData;
  }

  findAll(): CharacterData[] {
    return this.charactersData;
  }
}
