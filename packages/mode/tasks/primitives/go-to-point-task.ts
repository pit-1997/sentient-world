import type { IActor, Point } from '@sentient-world/engine';
import type { ExecutionStatus, IPrimitiveTask } from '@sentient-world/htn';

import type { SentientWorldContext, SentientWorldState } from '../../types';

export class GoToPointTask implements IPrimitiveTask<SentientWorldContext> {
  name = 'GoToPointTask';
  private started = false;

  constructor(private readonly targetPoint: Point) {}

  applyEffects(state: SentientWorldState): SentientWorldState {
    return state;
  }

  canExecute() {
    return true;
  }

  execute(context: SentientWorldContext): ExecutionStatus {
    const point = context.services.actor.getPoint();
    const distance = context.services.geometry.getDistance(point, this.targetPoint);

    if (distance <= 1) {
      this.complete(context.services.actor);
      return 'success';
    }

    if (!this.started) {
      this.start(context.services.actor);
    }

    return 'running';
  }

  private start(actor: IActor) {
    actor.taskGoToPoint(this.targetPoint);
    this.started = true;
  }

  private complete(actor: IActor) {
    actor.taskClear();
  }
}
