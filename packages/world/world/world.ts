import type { IEngine } from '@sentient-world/engine';

import type { CharacterData, ICharacter, ICharacterFactory } from '../character';
import type { IRepository } from '../repository';
import type { WorldSlice } from '../state';

import { constants } from './constants';

export type WorldDeps = {
  characterFactory: ICharacterFactory;
  characterRepository: IRepository<CharacterData>;
  engine: IEngine;
};

export class World {
  // Зависимости
  private readonly characterFactory: ICharacterFactory;
  private readonly characterRepository: IRepository<CharacterData>;
  private readonly engine: IEngine;

  /** Заспавненные персонажи */
  private characters: ICharacter[];

  /** Номер дня */
  private day: number = 1;

  constructor(deps: WorldDeps) {
    this.characterFactory = deps.characterFactory;
    this.characterRepository = deps.characterRepository;
    this.engine = deps.engine;

    this.characters = this.spawnCharacters();
    this.trackDays();
    this.tickCharacters();
  }

  getState(): WorldSlice {
    return {
      day: this.day,
      time: this.engine.getTime(),
    };
  }

  /** Спавнит персонажей */
  private spawnCharacters(): ICharacter[] {
    return this.characterRepository
      .findAll()
      .map((characterData) => this.characterFactory.create(characterData));
  }

  /** Обновляет заспавненных персонажей */
  private tickCharacters() {
    const characters = this.characters;
    const getState = () => this.getState();

    this.engine.createThread(function* () {
      while (true) {
        yield constants.CHARACTERS_TICK_INTERVAL;
        const state = getState();
        characters.forEach((character) => character.tick({ world: state }));
      }
    });
  }

  /** Трекает номер дня в мире */
  private trackDays() {
    let lastHour = this.engine.getTime().hours;
    const increaseDay = (amount: number) => (this.day += amount);
    const getTime = () => this.engine.getTime();

    this.engine.createThread(function* () {
      while (true) {
        yield constants.DAY_TRACKING_INTERVAL;
        const currentTime = getTime();

        if (lastHour >= 20 && currentTime.hours <= 5) {
          // Переход через полночь (с позднего вечера на раннее утро)
          increaseDay(1);
        }

        lastHour = currentTime.hours;
      }
    });
  }
}
