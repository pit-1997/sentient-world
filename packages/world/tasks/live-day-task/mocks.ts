import type { LiveDayTaskDeps } from './live-day-task';

import {
  getMockedDayTimeDeps,
  getMockedNightTimeGoHomeDeps,
  getMockedNightTimeSleepDeps,
} from './methods/mocks';

export function getMockedLiveDayDeps(overrides: Partial<LiveDayTaskDeps> = {}): LiveDayTaskDeps {
  return {
    ...getMockedDayTimeDeps(overrides),
    ...getMockedNightTimeGoHomeDeps(overrides),
    ...getMockedNightTimeSleepDeps(overrides),
  };
}
