import type { IGeometry } from '@sentient-world/engine';

import type { State } from '../types';

/** Дистанция от дома в которой персонаж считается дома */
export const HOME_RADIUS = 5;

/**
 * Проверяет местоположение персонажа в игровом мире
 */
export interface ILocationChecker {
  /**
   * Проверяет, находится ли персонаж дома (в радиусе HOME_RADIUS от spawn)
   */
  isAtHome(state: State): boolean;
}

export type LocationCheckerDeps = {
  geometry: IGeometry;
};

export class LocationChecker implements ILocationChecker {
  private readonly geometry: IGeometry;

  constructor(deps: LocationCheckerDeps) {
    this.geometry = deps.geometry;
  }

  isAtHome(state: State): boolean {
    const distance = this.geometry.getDistance(
      state.character.position,
      state.character.data.spawn
    );

    return distance <= HOME_RADIUS;
  }
}
