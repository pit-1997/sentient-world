import type { IActor, IGeometry, Point } from '@sentient-world/engine';
import type { ExecutionStatus, IPrimitiveTask } from '@sentient-world/htn';

import type { SentientWorldState } from '../../types';

export class GoToPointTask implements IPrimitiveTask<SentientWorldState> {
  name = 'GoToPointTask';
  private started = false;

  constructor(
    private readonly targetPoint: Point,
    private readonly actor: IActor,
    private readonly geometry: IGeometry
  ) {}

  applyEffects(state: SentientWorldState): SentientWorldState {
    return state;
  }

  canExecute() {
    return true;
  }

  execute(state: SentientWorldState): ExecutionStatus {
    const distance = this.geometry.getDistance(state.character.location, this.targetPoint);

    if (distance <= 1) {
      this.complete();
      return 'success';
    }

    if (!this.started) {
      this.start();
    }

    return 'running';
  }

  private start() {
    this.actor.taskGoToPoint(this.targetPoint);
    this.started = true;
  }

  private complete() {
    this.actor.taskClear();
  }
}
