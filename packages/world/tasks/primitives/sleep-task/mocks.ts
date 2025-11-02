import { Geometry } from '@sentient-world/engine/mocks';

import { DateTimeComparator } from '../../../core';

import type { SleepTaskDeps } from './sleep-task';

export function getMockedSleepTaskDeps(overrides: Partial<SleepTaskDeps> = {}): SleepTaskDeps {
  return {
    geometry: new Geometry(),
    dateTimeComparator: new DateTimeComparator(),
    ...overrides,
  };
}
