import type { ICompoundTask, IMethod } from '@sentient-world/htn';

import type { ISentientWorldState } from '../../types';
import { isAtHome, isNight, isDay } from '../helpers';
import { SleepTask } from '../primitives/sleep-task';
import { WanderStandardTask } from '../primitives/wander-standard-task';

import { GoHomeTask } from './go-home-task';

export class LiveDayTask implements ICompoundTask<ISentientWorldState> {
  name = 'LiveDayTask';

  getMethods(): IMethod<ISentientWorldState>[] {
    return [
      {
        name: 'NightTimeGoHome',
        preconditions: (state: ISentientWorldState) => isNight(state) && !isAtHome(state),
        decompose: () => [new GoHomeTask()],
      },
      {
        name: 'NightTimeSleep',
        preconditions: (state: ISentientWorldState) => isNight(state) && isAtHome(state),
        decompose: () => [new SleepTask((state) => isDay(state) || !isAtHome(state))],
      },
      {
        name: 'DayTime',
        preconditions: (state) => isDay(state),
        decompose: () => [new WanderStandardTask(isNight)],
      },
    ];
  }
}
