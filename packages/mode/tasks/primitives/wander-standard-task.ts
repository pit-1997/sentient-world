import type { IActor } from '@sentient-world/engine';
import type { ExecutionStatus, IPrimitiveTask } from '@sentient-world/htn';

import type { SentientWorldState } from '../../types';

type ShouldStopCondition = (state: SentientWorldState) => boolean;

export class WanderStandardTask implements IPrimitiveTask<SentientWorldState> {
  name = 'WanderTask';
  private started = false;

  constructor(
    private readonly shouldStop: ShouldStopCondition,
    private readonly actor: IActor
  ) {}

  applyEffects(state: SentientWorldState): SentientWorldState {
    return state;
  }

  canExecute(state: SentientWorldState) {
    return !this.shouldStop(state);
  }

  execute(state: SentientWorldState): ExecutionStatus {
    if (this.shouldStop(state)) {
      this.complete();
      return 'success';
    }

    if (!this.started) {
      this.start();
    }

    return 'running';
  }

  private start() {
    this.actor.taskWander();
    this.started = true;
  }

  private complete() {
    this.actor.taskClear();
  }
}
