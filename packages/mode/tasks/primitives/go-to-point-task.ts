import type { ICharacterHandle, Point } from '@sentient-world/engine';
import type { ExecutionStatus, IPrimitiveTask } from '@sentient-world/htn';

import type { ISentientWorldState } from '../../types';

export class GoToPointTask implements IPrimitiveTask<ISentientWorldState> {
  name = 'GoToPointTask';
  private started = false;

  constructor(private readonly targetPoint: Point) {}

  applyEffects(state: ISentientWorldState): ISentientWorldState {
    return state;
  }

  canExecute() {
    return true;
  }

  execute(state: ISentientWorldState): ExecutionStatus {
    const point = state.characterHandle.getPoint();
    const distance = state.geometry.getDistance(point, this.targetPoint);

    if (distance <= 1) {
      this.complete(state.characterHandle);
      return 'success';
    }

    if (!this.started) {
      this.start(state);
    }

    return 'running';
  }

  private start(state: ISentientWorldState) {
    state.characterHandle.taskGoToPoint(this.targetPoint);
    this.started = true;
  }

  private complete(handle: ICharacterHandle) {
    handle.taskClear();
  }
}
