import type { IActor, IGeometry, Position } from '@sentient-world/engine';
import type { ExecutionStatus, IPrimitiveTask } from '@sentient-world/htn';

import type { State } from '../../../state';

export type GoToPositionTaskDeps = {
  actor: IActor;
  geometry: IGeometry;
};

export type GoToPositionTaskOptions = {
  target: Position;
};

export class GoToPositionTask implements IPrimitiveTask<State> {
  name = 'GoToPositionTask';
  private started = false;
  private readonly target: Position;

  private readonly actor: IActor;
  private readonly geometry: IGeometry;

  constructor(options: GoToPositionTaskOptions, deps: GoToPositionTaskDeps) {
    this.target = options.target;
    this.actor = deps.actor;
    this.geometry = deps.geometry;
  }

  applyEffects(state: State): State {
    return {
      ...state,
      character: {
        ...state.character,
        position: this.target,
      },
    };
  }

  canExecute() {
    return true;
  }

  execute(state: State): ExecutionStatus {
    const distance = this.geometry.getDistance(state.character.position, this.target);

    if (distance <= 1) {
      this.complete();
      return 'success';
    }

    if (!this.started) {
      this.start();
    }

    return 'running';
  }

  getTarget() {
    return this.target;
  }

  private start() {
    this.actor.taskGoToPoint(this.target);
    this.started = true;
  }

  private complete() {
    this.actor.taskClear();
    this.actor.taskAchieveAngle(this.target.angle);
  }
}
