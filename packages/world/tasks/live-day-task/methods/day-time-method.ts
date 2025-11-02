import type { IActor } from '@sentient-world/engine';
import type { IMethod } from '@sentient-world/htn';

import { ScheduleChecker } from '../../../state';
import type { IScheduleChecker, State } from '../../../state';
import { WanderTask } from '../../primitives/wander-task';

export type DayTimeMethodDeps = {
  actor: IActor;
  scheduleChecker?: IScheduleChecker;
};

export class DayTimeMethod implements IMethod<State> {
  name = 'DayTime';

  private readonly actor: IActor;
  private readonly scheduleChecker: IScheduleChecker;

  constructor(deps: DayTimeMethodDeps) {
    this.actor = deps.actor;
    this.scheduleChecker = deps.scheduleChecker ?? new ScheduleChecker();
  }

  preconditions(state: State): boolean {
    return this.scheduleChecker.isDay(state);
  }

  decompose(state: State) {
    const until = {
      date: state.world.dateTime.date,
      time: { hours: 22, minutes: 0 },
    };

    return [new WanderTask({ until }, { actor: this.actor })];
  }
}
