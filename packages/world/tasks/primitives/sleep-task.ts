import type { IGeometry, Time } from '@sentient-world/engine';
import type { ExecutionStatus, IPrimitiveTask } from '@sentient-world/htn';

import type { State } from '../../world';

export type SleepTaskOptions = {
  until: Time;
};

export class SleepTask implements IPrimitiveTask<State> {
  name = 'SleepTask';

  constructor(
    private readonly options: SleepTaskOptions,
    private readonly geometry: IGeometry
  ) {}

  /** Меняется время */
  applyEffects(state: State): State {
    return {
      ...state,
      world: {
        ...state.world,
        time: this.options.until,
      },
    };
  }

  /** Может спать только если дистанция до дома меньше 10 метров */
  canExecute(state: State) {
    return this.geometry.getDistance(state.character.location, state.character.data.spawn) < 10;
  }

  execute(state: State): ExecutionStatus {
    // Вычисляем каким должно быть время в минутах
    const needMinutes = this.options.until.hours * 60 + this.options.until.minutes;
    const haveMinutes = state.world.time.hours * 60 + state.world.time.minutes;

    if (needMinutes === haveMinutes) {
      return 'success';
    }

    return 'running';
  }
}
