import type { Method, CompoundTask } from '../../../types';

import { PlainRiceMethod } from '../methods/plain-rice-method';
import { RiceWithVegetablesMethod } from '../methods/rice-with-vegetables-method';

import type { KitchenState } from '../state';

/** Составная задача: Приготовить гарнир */
export class PrepareSideTask implements CompoundTask<KitchenState> {
  name = 'PrepareSide';

  getMethods(): Method<KitchenState>[] {
    return [
      new RiceWithVegetablesMethod(),
      new PlainRiceMethod(),
      {
        name: 'NothingAvailable',
        preconditions: () => true,
        decompose: () => [],
      },
    ];
  }
}
