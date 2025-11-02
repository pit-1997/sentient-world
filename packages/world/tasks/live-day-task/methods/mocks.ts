import {
  defaultActorConstructorOptions,
  MockedActor,
  Geometry,
} from '@sentient-world/engine/mocks';

import type { DayTimeMethodDeps } from './day-time-method';
import type { NightTimeGoHomeMethodDeps } from './night-time-go-home-method';
import type { NightTimeSleepMethodDeps } from './night-time-sleep-method';

export function getMockedNightTimeGoHomeDeps(
  overrides: Partial<NightTimeGoHomeMethodDeps> = {}
): NightTimeGoHomeMethodDeps {
  return {
    actor: new MockedActor(defaultActorConstructorOptions),
    geometry: new Geometry(),
    ...overrides,
  };
}

export function getMockedNightTimeSleepDeps(
  overrides: Partial<NightTimeSleepMethodDeps> = {}
): NightTimeSleepMethodDeps {
  return {
    geometry: new Geometry(),
    ...overrides,
  };
}

export function getMockedDayTimeDeps(
  overrides: Partial<DayTimeMethodDeps> = {}
): DayTimeMethodDeps {
  return {
    actor: new MockedActor(defaultActorConstructorOptions),
    ...overrides,
  };
}
