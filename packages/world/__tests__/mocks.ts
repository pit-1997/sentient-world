import type { IEngine } from '@sentient-world/engine';
import { MockedEngine } from '@sentient-world/engine/mocks';
import type { IAgentFactory } from '@sentient-world/htn';
import { MockedAgentFactory } from '@sentient-world/htn/mocks';

import type { State } from '../state';

export type ExternalDeps = {
  agentFactory: IAgentFactory<State>;
  engine: IEngine;
};

export function getExternalMocks(deps?: Partial<ExternalDeps>): ExternalDeps {
  return {
    agentFactory: deps?.agentFactory ?? new MockedAgentFactory(),
    engine: deps?.engine ?? new MockedEngine(),
  };
}
