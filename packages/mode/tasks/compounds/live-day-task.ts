import type { IActor, IGeometry } from '@sentient-world/engine';
import type { ICompoundTask, IMethod } from '@sentient-world/htn';

import type { SentientWorldState } from '../../types';
import { GoToPointTask } from '../primitives/go-to-point-task';
import { SleepTask } from '../primitives/sleep-task';
import { WanderStandardTask } from '../primitives/wander-standard-task';

export class LiveDayTask implements ICompoundTask<SentientWorldState> {
  name = 'LiveDayTask';

  constructor(
    private readonly actor: IActor,
    private readonly geometry: IGeometry
  ) {}

  getMethods(): IMethod<SentientWorldState>[] {
    return [
      {
        name: 'NightTimeGoHome',
        preconditions: (state) => this.isNight(state) && !this.isAtHome(state),
        decompose: (state) => [new GoToPointTask(state.character.spawn, this.actor, this.geometry)],
      },
      {
        name: 'NightTimeSleep',
        preconditions: (state) => this.isNight(state) && this.isAtHome(state),
        decompose: () => [new SleepTask((state) => this.isDay(state) || !this.isAtHome(state))],
      },
      {
        name: 'DayTime',
        preconditions: (state) => this.isDay(state),
        decompose: () => [new WanderStandardTask((state) => this.isNight(state), this.actor)],
      },
    ];
  }

  private isAtHome(state: SentientWorldState) {
    return this.geometry.getDistance(state.character.location, state.character.spawn) < 1;
  }

  private isDay(state: SentientWorldState) {
    return !this.isNight(state);
  }

  private isNight(state: SentientWorldState) {
    const { hours } = state.world.time;

    return hours >= 22 || hours < 8;
  }
}
