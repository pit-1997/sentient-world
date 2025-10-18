import type { IState } from '@sentient-world/htn';

import type { ICharacter } from './characters';

export interface Time {
  hours: number;
  minutes: number;
}

export interface ISentientWorldState extends IState {
  character: ICharacter;
  ped: Ped;
  getTime: () => Time;
  clone: () => this;
}
