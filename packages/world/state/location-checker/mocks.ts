import { Geometry } from '@sentient-world/engine/mocks';

import type { ILocationChecker, LocationCheckerDeps } from './location-checker';

export function getMockedLocationCheckerDeps(
  overrides: Partial<LocationCheckerDeps> = {}
): LocationCheckerDeps {
  return {
    geometry: new Geometry(),
    ...overrides,
  };
}

type MockedLocationCheckerOptions = {
  isAtHome: boolean;
};

export class MockedLocationChecker implements ILocationChecker {
  private readonly _isAtHome: boolean;

  private constructor(options: MockedLocationCheckerOptions) {
    this._isAtHome = options.isAtHome;
  }

  isAtHome(): boolean {
    return this._isAtHome;
  }

  static alwaysAtHome(): ILocationChecker {
    return new MockedLocationChecker({ isAtHome: true });
  }

  static alwaysNotAtHome(): ILocationChecker {
    return new MockedLocationChecker({ isAtHome: false });
  }
}
