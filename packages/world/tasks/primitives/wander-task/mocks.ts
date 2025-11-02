import { defaultActorConstructorOptions, MockedActor } from '@sentient-world/engine/mocks';

import { DateTimeComparator } from '../../../core';

import type { WanderTaskDeps } from './wander-task';

export function getMockedWanderTaskDeps(overrides: Partial<WanderTaskDeps> = {}): WanderTaskDeps {
  return {
    actor: new MockedActor(defaultActorConstructorOptions),
    dateTimeComparator: new DateTimeComparator(),
    ...overrides,
  };
}
