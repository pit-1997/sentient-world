import type { IActor, IGeometry } from '@sentient-world/engine';
import type { IMethod } from '@sentient-world/htn';

import { LocationChecker, ScheduleChecker } from '../../../state';
import type { ILocationChecker, IScheduleChecker, State } from '../../../state';
import { GoToPositionTask } from '../../primitives/go-to-position-task';

export type NightTimeGoHomeMethodDeps = {
  actor: IActor;
  geometry: IGeometry;
  scheduleChecker?: IScheduleChecker;
  locationChecker?: ILocationChecker;
};

export class NightTimeGoHomeMethod implements IMethod<State> {
  name = 'NightTimeGoHomeMethod';

  private readonly actor: IActor;
  private readonly geometry: IGeometry;
  private readonly scheduleChecker: IScheduleChecker;
  private readonly locationChecker: ILocationChecker;

  constructor(deps: NightTimeGoHomeMethodDeps) {
    this.actor = deps.actor;
    this.geometry = deps.geometry;
    this.scheduleChecker = deps.scheduleChecker ?? new ScheduleChecker();
    this.locationChecker = deps.locationChecker ?? new LocationChecker(deps);
  }

  preconditions(state: State): boolean {
    return this.scheduleChecker.isNight(state) && !this.locationChecker.isAtHome(state);
  }

  decompose(state: State) {
    return [
      new GoToPositionTask(
        { target: state.character.data.spawn },
        { actor: this.actor, geometry: this.geometry }
      ),
    ];
  }
}
