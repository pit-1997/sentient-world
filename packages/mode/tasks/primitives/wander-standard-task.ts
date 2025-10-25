import type { IActor } from '@sentient-world/engine';
import type { ExecutionStatus, IPrimitiveTask } from '@sentient-world/htn';

import type { ISentientWorldState } from '../../types';

type ShouldStopCondition = (state: ISentientWorldState) => boolean;

export class WanderStandardTask implements IPrimitiveTask<ISentientWorldState> {
  name = 'WanderTask';
  private started = false;

  constructor(private readonly shouldStop: ShouldStopCondition) {}

  applyEffects(state: ISentientWorldState): ISentientWorldState {
    return state;
  }

  canExecute(state: ISentientWorldState) {
    return !this.shouldStop(state);
  }

  execute(state: ISentientWorldState): ExecutionStatus {
    if (this.shouldStop(state)) {
      this.complete(state.actor);
      return 'success';
    }

    if (!this.started) {
      this.start(state.actor);
    }

    return 'running';
  }

  private start(actor: IActor) {
    actor.taskWander();
    this.started = true;
  }

  private complete(actor: IActor) {
    actor.taskClear();
  }
}
