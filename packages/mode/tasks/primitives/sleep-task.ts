import type { ExecutionStatus, IPrimitiveTask } from '@sentient-world/htn';

import type { ISentientWorldState } from '../../types';

type ShouldStopCondition = (state: ISentientWorldState) => boolean;

export class SleepTask implements IPrimitiveTask<ISentientWorldState> {
  name = 'SleepTask';

  constructor(private readonly shouldStop: ShouldStopCondition) {}

  applyEffects(state: ISentientWorldState): ISentientWorldState {
    return state;
  }

  canExecute(state: ISentientWorldState) {
    return !this.shouldStop(state);
  }

  execute(state: ISentientWorldState): ExecutionStatus {
    if (this.shouldStop(state)) {
      return 'success';
    }

    return 'running';
  }
}
