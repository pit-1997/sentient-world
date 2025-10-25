import type { IActor, IEngine, IGeometry } from '@sentient-world/engine';
import { Agent } from '@sentient-world/htn';

import type { ICharacter } from '../characters';
import { LiveDayTask } from '../tasks/compounds/live-day-task';
import type { ISentientWorldState } from '../types';

export class NPC {
  constructor(
    private readonly actor: IActor,
    private readonly character: ICharacter,
    private readonly engine: IEngine,
    private readonly geometry: IGeometry
  ) {
    const brain = new Agent(new LiveDayTask());

    const state: ISentientWorldState = {
      actor: this.actor,
      character: this.character,
      clone: () => state,
      engine: this.engine,
      geometry: this.geometry,
    };

    this.engine.createThread((thread) => {
      while (true) {
        thread.wait(1000);
        brain.tick(state);
      }
    });
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
