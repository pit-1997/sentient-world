import { charactersData } from './data';
import type { ICharacter, ICharacterData } from './types';

export class Character implements ICharacter {
  readonly data: ICharacterData;

  constructor(data: ICharacterData) {
    this.data = data;
  }

  static create(): ICharacter[] {
    return charactersData.map((characterData) => new Character(characterData));
  }
}
