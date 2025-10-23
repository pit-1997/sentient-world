import { Agent } from '@sentient-world/htn';
import {
  addEventHandler,
  createChar,
  deleteChar,
  doesCharExist,
  dontRemoveChar,
  getTimeOfDay,
  loadAllModelsNow,
  markModelAsNoLongerNeeded,
  requestModel,
  setCharHeading,
  setLoadCollisionForCharFlag,
  wait,
  type PedHandle,
} from '@sentient-world/moonloader';

import type { ICharacter } from '../characters';
import { LiveDayTask } from '../tasks/compounds/live-day-task';
import type { ISentientWorldState } from '../types';

export class NPC {
  constructor(
    private readonly character: ICharacter,
    private readonly ped: PedHandle
  ) {
    const brain = new Agent(new LiveDayTask());

    const state: ISentientWorldState = {
      character: this.character,
      ped: this.ped,
      clone: () => state,
      getTime: () => {
        const [hours, minutes] = getTimeOfDay();
        return { hours, minutes };
      },
    };

    while (true) {
      wait(1000);
      brain.tick(state);
    }
  }

  static spawn(character: ICharacter): NPC {
    const position = character.data.spawn;

    requestModel(character.data.modelId);
    loadAllModelsNow();

    const ped = createChar(4, character.data.modelId, position.x, position.y, position.z);
    setCharHeading(ped, position.angle);
    markModelAsNoLongerNeeded(character.data.modelId);
    dontRemoveChar(ped);
    setLoadCollisionForCharFlag(ped, true);

    addEventHandler('onScriptTerminate', () => {
      if (doesCharExist(ped)) {
        deleteChar(ped);
      }
    });

    return new NPC(character, ped);
  }
}
