import type { IEngine, IGeometry } from '@sentient-world/engine';
import { Geometry, MockedEngine } from '@sentient-world/engine/mocks';
import type { IAgentFactory } from '@sentient-world/htn';
import { MockedAgentFactory } from '@sentient-world/htn/mocks';

import type { State } from './state';

export type ExternalDeps = {
  agentFactory: IAgentFactory<State>;
  engine: IEngine;
  geometry: IGeometry;
};

export function getExternalMocks(deps?: Partial<ExternalDeps>): ExternalDeps {
  return {
    agentFactory: deps?.agentFactory ?? new MockedAgentFactory(),
    engine: deps?.engine ?? new MockedEngine(),
    geometry: deps?.geometry ?? new Geometry(),
  };
}
