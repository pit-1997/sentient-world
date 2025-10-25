import type { ICharacterHandle, IEngine, IGeometry } from '@sentient-world/engine';
import type { IState } from '@sentient-world/htn';

import type { ICharacter } from './characters';

export interface Time {
  hours: number;
  minutes: number;
}

export interface ISentientWorldState extends IState {
  character: ICharacter;
  characterHandle: ICharacterHandle;
  clone: () => this;
  engine: IEngine;
  geometry: IGeometry;
}
