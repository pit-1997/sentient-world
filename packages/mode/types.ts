import type { IState } from '@sentient-world/htn';
import type { PedHandle } from '@sentient-world/moonloader';

import type { ICharacter } from './characters';

export interface Time {
  hours: number;
  minutes: number;
}

export interface ISentientWorldState extends IState {
  character: ICharacter;
  ped: PedHandle;
  getTime: () => Time;
  clone: () => this;
}
