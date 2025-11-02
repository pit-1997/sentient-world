import type { IActor, IGeometry } from '@sentient-world/engine';
import type { ICompoundTask, IMethod } from '@sentient-world/htn';

import type { State } from '../../state';

import {
  DayTimeMethod,
  type DayTimeMethodDeps,
  NightTimeGoHomeMethod,
  type NightTimeGoHomeMethodDeps,
  NightTimeSleepMethod,
  type NightTimeSleepMethodDeps,
} from './methods';

export type LiveDayTaskDeps = NightTimeGoHomeMethodDeps &
  NightTimeSleepMethodDeps &
  DayTimeMethodDeps;

export class LiveDayTask implements ICompoundTask<State> {
  name = 'LiveDayTask';

  private readonly actor: IActor;
  private readonly geometry: IGeometry;

  constructor(deps: LiveDayTaskDeps) {
    this.actor = deps.actor;
    this.geometry = deps.geometry;
  }

  getMethods(): IMethod<State>[] {
    return [
      new NightTimeGoHomeMethod({ actor: this.actor, geometry: this.geometry }),
      new NightTimeSleepMethod({ geometry: this.geometry }),
      new DayTimeMethod({ actor: this.actor }),
    ];
  }
}
