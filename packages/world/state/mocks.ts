import { peetData } from '../character/mocks';

import type { CharacterSlice, WorldSlice, State } from './types';

export const mockedCharacterState: CharacterSlice = {
  location: peetData.spawn,
  data: peetData,
};

export const mockedWorldState: WorldSlice = {
  time: { hours: 8, minutes: 2 },
  day: 1,
};

export const mockedState: State = {
  character: mockedCharacterState,
  world: mockedWorldState,
};
