import type { Position, IActor, IEngine } from '@sentient-world/engine';
import type { IAgent, IAgentFactory } from '@sentient-world/htn';

import type { CharacterSlice, State } from '../state';
import { LiveDayTask } from '../tasks/live-day-task';

export type CharacterData = {
  id: number;
  name: string;
  surname: string;
  modelId: number;
  spawn: Position;
};

export type CharacterDeps = {
  agentFactory: IAgentFactory<State>;
  engine: IEngine;
};

export interface ICharacter {
  getActor(): IActor;
  getData(): CharacterData;
  getState(): CharacterSlice;
  tick(state: Omit<State, 'character'>): void;
}

export class Character implements ICharacter {
  private data: CharacterData;
  private readonly actor: IActor;
  private readonly agent: IAgent<State>;

  constructor(data: CharacterData, deps: CharacterDeps) {
    this.data = data;
    this.agent = deps.agentFactory.create(new LiveDayTask());
    this.actor = deps.engine.createActor({
      modelId: this.data.modelId,
      position: this.data.spawn,
    });
  }

  getActor(): IActor {
    return this.actor;
  }

  getData(): CharacterData {
    return this.data;
  }

  getState(): CharacterSlice {
    return {
      data: this.data,
      location: this.actor.getPosition(),
    };
  }

  tick(state: Omit<State, 'character'>): void {
    this.agent.tick({
      ...state,
      character: this.getState(),
    });
  }
}
