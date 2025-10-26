import type { ExecutionStatus, IPrimitiveTask } from '@sentient-world/htn';

import type { SentientWorldContext, SentientWorldState } from '../../types';

type ShouldStopCondition = (state: SentientWorldState) => boolean;

export class SleepTask implements IPrimitiveTask<SentientWorldContext> {
  name = 'SleepTask';

  constructor(private readonly shouldStop: ShouldStopCondition) {}

  applyEffects(state: SentientWorldState): SentientWorldState {
    return state;
  }

  canExecute(state: SentientWorldState) {
    return !this.shouldStop(state);
  }

  execute(context: SentientWorldContext): ExecutionStatus {
    if (this.shouldStop(context.state)) {
      return 'success';
    }

    return 'running';
  }
}
