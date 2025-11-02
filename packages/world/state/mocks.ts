import { peetData } from '../character/mocks';

import type { CharacterSlice, WorldSlice, State } from './types';

export { MockedLocationChecker, getMockedLocationCheckerDeps } from './location-checker/mocks';
export { MockedScheduleChecker } from './schedule-checker/mocks';
export { StateBuilder } from './state-builder';

export const mockedCharacterState: CharacterSlice = {
  position: peetData.spawn,
  data: peetData,
};

export const mockedWorldState: WorldSlice = {
  dateTime: {
    date: 1,
    time: { hours: 8, minutes: 2 },
  },
};

export const mockedState: State = {
  character: mockedCharacterState,
  world: mockedWorldState,
};
