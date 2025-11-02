import type { IGeometry } from '@sentient-world/engine';
import type { IMethod } from '@sentient-world/htn';

import { LocationChecker, ScheduleChecker } from '../../../state';
import type { ILocationChecker, IScheduleChecker, State } from '../../../state';
import { SleepTask } from '../../primitives/sleep-task';

export type NightTimeSleepMethodDeps = {
  geometry: IGeometry;
  scheduleChecker?: IScheduleChecker;
  locationChecker?: ILocationChecker;
};

export class NightTimeSleepMethod implements IMethod<State> {
  name = 'NightTimeSleepMethod';

  private readonly geometry: IGeometry;
  private readonly scheduleChecker: IScheduleChecker;
  private readonly locationChecker: ILocationChecker;

  constructor(deps: NightTimeSleepMethodDeps) {
    this.geometry = deps.geometry;
    this.scheduleChecker = deps.scheduleChecker ?? new ScheduleChecker();
    this.locationChecker = deps.locationChecker ?? new LocationChecker(deps);
  }

  preconditions(state: State): boolean {
    return this.scheduleChecker.isNight(state) && this.locationChecker.isAtHome(state);
  }

  decompose(state: State) {
    const until = {
      date: state.world.dateTime.date + 1,
      time: { hours: 8, minutes: 0 },
    };

    return [new SleepTask({ until }, { geometry: this.geometry })];
  }
}
