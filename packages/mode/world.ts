import type { IEngine, IGeometry } from '@sentient-world/engine';

import { Character, type ICharacter } from './characters';
import { NPC } from './npc';

export class World {
  private readonly engine: IEngine;
  private readonly geometry: IGeometry;

  // Сущности
  private readonly characters: ICharacter[];

  constructor(engine: IEngine, geometry: IGeometry) {
    this.engine = engine;
    this.geometry = geometry;
    this.characters = Character.create();
  }

  start() {
    this.characters.map((character) => {
      NPC.spawn(this.engine, this.geometry, character);
    });
  }
}
