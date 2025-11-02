import { describe, expect, it } from '@jest/globals';

import { mockedState, StateBuilder } from '../../mocks';
import { HOME_RADIUS, LocationChecker } from '../location-checker';
import { getMockedLocationCheckerDeps } from '../mocks';

describe(LocationChecker.name, () => {
  describe('#isAtHome', () => {
    it('если дистанция меньше HOME_RADIUS, возвращает true', () => {
      const checker = new LocationChecker(getMockedLocationCheckerDeps());
      const state = StateBuilder.of(mockedState)
        .withCharacterAtSpawn({ x: HOME_RADIUS - 1, y: 0, z: 0 })
        .build();

      expect(checker.isAtHome(state)).toBe(true);
    });

    it('если дистанция равна HOME_RADIUS, возвращает true', () => {
      const checker = new LocationChecker(getMockedLocationCheckerDeps());
      const state = StateBuilder.of(mockedState)
        .withCharacterAtSpawn({ x: HOME_RADIUS, y: 0, z: 0 })
        .build();

      expect(checker.isAtHome(state)).toBe(true);
    });

    it('если дистанция больше HOME_RADIUS, возвращает false', () => {
      const checker = new LocationChecker(getMockedLocationCheckerDeps());
      const state = StateBuilder.of(mockedState)
        .withCharacterAtSpawn({ x: HOME_RADIUS + 1, y: 0, z: 0 })
        .build();

      expect(checker.isAtHome(state)).toBe(false);
    });
  });
});
