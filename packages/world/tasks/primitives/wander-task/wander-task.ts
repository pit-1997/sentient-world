import type { IActor } from '@sentient-world/engine';
import type { ExecutionStatus, IPrimitiveTask } from '@sentient-world/htn';

import { Comparison, DateTimeComparator } from '../../../date-time';
import type { DateTime, IComparator } from '../../../date-time';
import type { State } from '../../../state';

export type WanderTaskOptions = {
  until: DateTime;
};

export type WanderTaskDeps = {
  actor: IActor;
  dateTimeComparator?: IComparator<DateTime>;
};

export class WanderTask implements IPrimitiveTask<State> {
  name = 'WanderTask';

  private started = false;
  private until: DateTime;
  private actor: IActor;
  private dateTimeComparator: IComparator<DateTime>;

  constructor(options: WanderTaskOptions, deps: WanderTaskDeps) {
    this.until = options.until;
    this.actor = deps.actor;
    this.dateTimeComparator = deps.dateTimeComparator ?? new DateTimeComparator();
  }

  getUntil(): DateTime {
    return this.until;
  }

  applyEffects(state: State): State {
    return {
      ...state,
      world: {
        ...state.world,
        dateTime: this.until,
      },
    };
  }

  canExecute(state: State) {
    return this.dateTimeComparator.compare(state.world.dateTime, this.until) === Comparison.Less;
  }

  execute(state: State): ExecutionStatus {
    const comparsion = this.dateTimeComparator.compare(state.world.dateTime, this.until);

    if (comparsion === Comparison.Equal) {
      this.complete();
      return 'success';
    }

    if (comparsion === Comparison.Greater) {
      this.complete();
      return 'failure';
    }

    if (!this.started) {
      this.start();
    }

    return 'running';
  }

  private start() {
    this.actor.taskWander();
    this.started = true;
  }

  private complete() {
    this.actor.taskClear();
  }
}
