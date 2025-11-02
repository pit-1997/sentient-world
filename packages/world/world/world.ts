import type { IEngine, IGeometry } from '@sentient-world/engine';

import { CharacterFactory } from '../character';
import type {
  CharacterData,
  CharacterFactoryDeps,
  ICharacter,
  ICharacterFactory,
} from '../character';
import type { IRepository } from '../repository';
import type { WorldSlice } from '../state';

import { constants } from './constants';

export type WorldDeps = CharacterFactoryDeps & {
  characterFactory?: ICharacterFactory;
  characterRepository: IRepository<CharacterData>;
  engine: IEngine;
  geometry: IGeometry;
};

export class World {
  // Зависимости
  private readonly characterFactory: ICharacterFactory;
  private readonly characterRepository: IRepository<CharacterData>;
  private readonly engine: IEngine;

  /** Заспавненные персонажи */
  private characters: ICharacter[];

  /** Дата в мире игры */
  private date: number = 1;

  constructor(deps: WorldDeps) {
    this.characterRepository = deps.characterRepository;
    this.engine = deps.engine;
    this.characterFactory = deps.characterFactory ?? new CharacterFactory(deps);

    this.characters = this.spawnCharacters();
    this.tickCharacters();
    this.trackDate();
  }

  getState(): WorldSlice {
    return {
      dateTime: {
        date: this.date,
        time: this.engine.getTime(),
      },
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

  /** Трекает дату в мире */
  private trackDate() {
    let lastHour = this.engine.getTime().hours;
    const increaseDate = (amount: number) => (this.date += amount);
    const getTime = () => this.engine.getTime();

    this.engine.createThread(function* () {
      while (true) {
        yield constants.DATE_TRACKING_INTERVAL;
        const currentTime = getTime();

        if (lastHour >= 20 && currentTime.hours <= 5) {
          // Переход через полночь (с позднего вечера на раннее утро)
          increaseDate(1);
        }

        lastHour = currentTime.hours;
      }
    });
  }
}
