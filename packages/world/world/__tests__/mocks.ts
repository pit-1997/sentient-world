import {
  MockedCharacterFactory,
  MockedCharacterRepository,
  mockedCharacterDeps,
} from '../../character/__tests__/mocks';

import type { WorldDeps } from '../world';

export const mockedWorldDeps: WorldDeps = {
  characterFactory: new MockedCharacterFactory(),
  characterRepository: new MockedCharacterRepository(),
  engine: mockedCharacterDeps.engine, // всё что касается внешних зависимостей (engine и agent) вынести в базовые моки
};
