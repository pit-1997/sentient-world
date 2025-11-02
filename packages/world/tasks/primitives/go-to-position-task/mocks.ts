import { Geometry, MockedActor } from '@sentient-world/engine/mocks';

import { mockedState } from '../../../state/mocks';

import type { GoToPositionTaskDeps } from './go-to-position-task';

export function getMockedGoToPositionTaskDeps(
  overrides: Partial<GoToPositionTaskDeps> = {}
): GoToPositionTaskDeps {
  return {
    actor: new MockedActor({
      modelId: 76,
      position: mockedState.character.position,
    }),
    geometry: new Geometry(),
    ...overrides,
  };
}
