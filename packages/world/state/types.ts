import type { Position } from '@sentient-world/engine';

import type { CharacterData } from '../character';
import type { DateTime } from '../core';

export type CharacterSlice = {
  /** Текущая позиция персонажа */
  position: Position;
  /** Данные о персонаже: время, модель и т.д */
  data: CharacterData;
};

export type WorldSlice = {
  dateTime: DateTime;
};

export type State = {
  character: CharacterSlice;
  world: WorldSlice;
};
