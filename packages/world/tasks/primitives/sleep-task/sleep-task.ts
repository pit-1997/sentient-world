import type { IGeometry } from '@sentient-world/engine';
import type { ExecutionStatus, IPrimitiveTask } from '@sentient-world/htn';

import { Comparison, DateTimeComparator } from '../../../date-time';
import type { DateTime, IComparator } from '../../../date-time';
import type { State } from '../../../state';

/** Дистанция от дома в которой персонаж может спать */
export const HOUSE_RADIUS = 5;

export type SleepTaskOptions = {
  until: DateTime;
};

export type SleepTaskDeps = {
  geometry: IGeometry;
  dateTimeComparator?: IComparator<DateTime>;
};

export class SleepTask implements IPrimitiveTask<State> {
  name = 'SleepTask';

  private readonly until: DateTime;
  private readonly geometry: IGeometry;
  private readonly dateTimeComparator: IComparator<DateTime>;

  constructor(options: SleepTaskOptions, deps: SleepTaskDeps) {
    this.until = options.until;
    this.geometry = deps.geometry;
    this.dateTimeComparator = deps.dateTimeComparator ?? new DateTimeComparator();
  }

  getUntil(): DateTime {
    return this.until;
  }

  applyEffects(state: State): State {
    return {
      ...state,
      world: { ...state.world, dateTime: this.until },
    };
  }

  canExecute(state: State) {
    const distanceToHouse = this.geometry.getDistance(
      state.character.position,
      state.character.data.spawn
    );

    const comparison = this.dateTimeComparator.compare(state.world.dateTime, this.until);

    return distanceToHouse <= HOUSE_RADIUS && comparison === Comparison.Less;
  }

  execute(state: State): ExecutionStatus {
    const comparison = this.dateTimeComparator.compare(state.world.dateTime, this.until);

    if (comparison === Comparison.Greater) {
      return 'failure';
    }

    if (comparison === Comparison.Equal) {
      return 'success';
    }

    return 'running';
  }
}
