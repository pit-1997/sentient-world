import type { Position, Time } from '@sentient-world/engine';

import type { CharacterData } from '../character';

export type CharacterSlice = {
  /** Текущая позиция персонажа */
  location: Position;
  data: CharacterData;
};

export type WorldSlice = {
  day: number;
  time: Time;
};

export type State = {
  character: CharacterSlice;
  world: WorldSlice;
};
