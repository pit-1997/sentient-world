import {
  getMockedCharacterDeps,
  MockedCharacterFactory,
  MockedCharacterRepository,
} from '../character/mocks';

import type { WorldDeps } from './world';

export function getMockedWorldDeps(deps?: Partial<WorldDeps>): WorldDeps {
  const mockedCharacterDeps = getMockedCharacterDeps();

  return {
    characterFactory: deps?.characterFactory ?? new MockedCharacterFactory(),
    characterRepository: deps?.characterRepository ?? new MockedCharacterRepository(),
    // TODO: всё что касается внешних зависимостей (engine и agent) вынести в базовые моки
    engine: deps?.engine ?? mockedCharacterDeps.engine,
  };
}
