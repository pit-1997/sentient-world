import { describe, expect, it } from '@jest/globals';
import type { Position } from '@sentient-world/engine';
import { MockedEngine } from '@sentient-world/engine/mocks';

import { Character } from '../character';
import { getMockedCharacterDeps, peetData } from '../mocks';

describe(Character.name, () => {
  describe('#getState', () => {
    it('в поле "position" возвращает текущую позицию актора в мире', () => {
      const engine = new MockedEngine();
      const character = new Character(peetData, getMockedCharacterDeps({ engine }));
      const currentPosition: Position = { x: 1, y: 2, z: 3, angle: 45 };

      engine.getCreatedActors().forEach((actor) => actor.setPosition(currentPosition));
      const state = character.getState();

      expect(state.location).toStrictEqual(currentPosition);
    });

    it('в поле "data" возвращает данные о персонаже', () => {
      const character = new Character(peetData, getMockedCharacterDeps());
      const state = character.getState();

      expect(state.data).toStrictEqual(peetData);
    });
  });
});
