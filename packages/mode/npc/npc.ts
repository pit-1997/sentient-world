import type { IActor, IEngine, IGeometry } from '@sentient-world/engine';
import { Agent } from '@sentient-world/htn';

import type { ICharacter } from '../characters';
import { LiveDayTask } from '../tasks/compounds/live-day-task';
import type { SentientWorldState } from '../types';

export class NPC {
  constructor(
    private readonly actor: IActor,
    private readonly character: ICharacter,
    private readonly engine: IEngine,
    private readonly geometry: IGeometry
  ) {
    const liveDayTask = new LiveDayTask(this.actor, this.geometry);
    const brain = new Agent(liveDayTask);

    this.engine.createThread((thread) => {
      while (true) {
        thread.wait(1000);
        brain.tick(this.getState());
      }
    });
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
