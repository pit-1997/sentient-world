import type { Position, Time } from '@sentient-world/engine';

import type { CharacterData } from '../character';

export type CharacterState = {
  /** Текущая позиция персонажа */
  location: Position;
  data: CharacterData;
};

export type WorldState = {
  day: number;
  time: Time;
};

export type State = {
  character: CharacterState;
  world: WorldState;
};
