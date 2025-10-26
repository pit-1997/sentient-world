import type { IActor, IEngine, IGeometry } from '@sentient-world/engine';
import { Agent } from '@sentient-world/htn';

import type { ICharacter } from '../characters';
import { LiveDayTask } from '../tasks/compounds/live-day-task';
import type { SentientWorldContext, SentientWorldState } from '../types';

export class NPC {
  private readonly context: SentientWorldContext;

  constructor(
    private readonly actor: IActor,
    private readonly character: ICharacter,
    private readonly engine: IEngine,
    private readonly geometry: IGeometry
  ) {
    // Создаём контекст один раз
    this.context = {
      services: {
        actor: this.actor,
        engine: this.engine,
        geometry: this.geometry,
      },
      state: this.getState(),
      cloneState: () => this.cloneState(this.context.state),
    };

    const brain = new Agent(new LiveDayTask(this.geometry));

    this.engine.createThread((thread) => {
      while (true) {
        thread.wait(1000);
        this.context.state = this.getState();
        brain.tick(this.context);
      }
    });
  }

  private cloneState(state: SentientWorldState): SentientWorldState {
    return {
      character: {
        location: { ...state.character.location },
        spawn: { ...state.character.spawn },
      },
      world: {
        time: { ...state.world.time },
      },
    };
  }

  private getState(): SentientWorldState {
    return {
      world: {
        time: this.engine.getTime(),
      },
      character: {
        location: this.actor.getPoint(),
        spawn: this.character.data.spawn,
      },
    };
  }

  static spawn(engine: IEngine, geometry: IGeometry, character: ICharacter): NPC {
    const actor = engine.createActor({
      angle: character.data.spawn.angle,
      modelId: character.data.modelId,
      point: character.data.spawn,
    });

    return new NPC(actor, character, engine, geometry);
  }
}
