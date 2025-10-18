import { Character, type ICharacter } from './characters';
import { NPC } from './npc';

export class World {
  // Сущности
  private readonly characters: ICharacter[];

  constructor() {
    this.characters = Character.create();
  }

  start() {
    this.characters.map((character) => {
      NPC.spawn(character);
    });
  }
}
