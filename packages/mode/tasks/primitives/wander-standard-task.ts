import type { IActor } from '@sentient-world/engine';
import type { ExecutionStatus, IPrimitiveTask } from '@sentient-world/htn';

import type { SentientWorldContext, SentientWorldState } from '../../types';

type ShouldStopCondition = (state: SentientWorldState) => boolean;

export class WanderStandardTask implements IPrimitiveTask<SentientWorldContext> {
  name = 'WanderTask';
  private started = false;

  constructor(private readonly shouldStop: ShouldStopCondition) {}

  applyEffects(state: SentientWorldState): SentientWorldState {
    return state;
  }

  canExecute(state: SentientWorldState) {
    return !this.shouldStop(state);
  }

  execute(context: SentientWorldContext): ExecutionStatus {
    if (this.shouldStop(context.state)) {
      this.complete(context.services.actor);
      return 'success';
    }

    if (!this.started) {
      this.start(context.services.actor);
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
