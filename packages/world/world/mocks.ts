import { MockedCharacterFactory, MockedCharacterRepository } from '../character/mocks';

import { getExternalMocks } from '../mocks';

import type { WorldDeps } from './world';

export function getMockedWorldDeps(overrides: Partial<WorldDeps> = {}): WorldDeps {
  return {
    ...getExternalMocks(),
    characterFactory: new MockedCharacterFactory(),
    characterRepository: new MockedCharacterRepository(),
    ...overrides,
  };
}
