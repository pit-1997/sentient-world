import type { ExecutionStatus, IPrimitiveTask } from '@sentient-world/htn';

import type { SentientWorldState } from '../../types';

type ShouldStopCondition = (state: SentientWorldState) => boolean;

export class SleepTask implements IPrimitiveTask<SentientWorldState> {
  name = 'SleepTask';

  constructor(private readonly shouldStop: ShouldStopCondition) {}

  applyEffects(state: SentientWorldState): SentientWorldState {
    return state;
  }

  canExecute(state: SentientWorldState) {
    return !this.shouldStop(state);
  }

  execute(state: SentientWorldState): ExecutionStatus {
    if (this.shouldStop(state)) {
      return 'success';
    }

    return 'running';
  }
}
