import type { ICompoundTask, IMethod } from '@sentient-world/htn';

import type { ISentientWorldState } from '../../types';

import { GoToPointTask } from '../primitives/go-to-point-task';

export class GoHomeTask implements ICompoundTask<ISentientWorldState> {
  name = 'GoHomeTask';

  getMethods(): IMethod<ISentientWorldState>[] {
    return [
      {
        name: 'GoHome',
        preconditions: () => true,
        decompose: (state) => [new GoToPointTask(state.character.data.spawn)],
      },
    ];
  }
}
