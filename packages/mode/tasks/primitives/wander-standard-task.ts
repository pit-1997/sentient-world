import type { ExecutionStatus, IPrimitiveTask } from '@sentient-world/htn';
import { clearCharTasks, taskWanderStandard, type PedHandle } from '@sentient-world/moonloader';

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
      this.complete(state.ped);
      return 'success';
    }

    if (!this.started) {
      this.start(state.ped);
    }

    return 'running';
  }

  private start(ped: PedHandle) {
    taskWanderStandard(ped);
    this.started = true;
  }

  private complete(ped: PedHandle) {
    if (this.started) {
      clearCharTasks(ped);
    }
  }
}
