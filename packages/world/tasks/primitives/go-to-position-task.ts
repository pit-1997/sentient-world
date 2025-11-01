import type { IActor, IGeometry, Position } from '@sentient-world/engine';
import type { ExecutionStatus, IPrimitiveTask } from '@sentient-world/htn';

import type { State } from '../../state';

export class GoToPositionTask implements IPrimitiveTask<State> {
  name = 'GoToPositionTask';
  private started = false;

  constructor(
    private readonly targetPosition: Position,
    private readonly actor: IActor,
    private readonly geometry: IGeometry
  ) {}

  applyEffects(state: State): State {
    return {
      ...state,
      character: {
        ...state.character,
        location: this.targetPosition,
      },
    };
  }

  canExecute() {
    return true;
  }

  execute(state: State): ExecutionStatus {
    const distance = this.geometry.getDistance(state.character.location, this.targetPosition);

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
    this.actor.taskGoToPoint(this.targetPosition);
    this.started = true;
  }

  private complete() {
    this.actor.taskClear();
    this.actor.taskAchieveAngle(this.targetPosition.angle);
  }
}
