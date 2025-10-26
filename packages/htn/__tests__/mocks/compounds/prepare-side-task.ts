import type { IMethod, ICompoundTask } from '../../../types';

import type { KitchenContext } from '../context';
import { PlainRiceMethod } from '../methods/plain-rice-method';
import { RiceWithVegetablesMethod } from '../methods/rice-with-vegetables-method';

/** Составная задача: Приготовить гарнир */
export class PrepareSideTask implements ICompoundTask<KitchenContext> {
  name = 'PrepareSide';

  getMethods(): IMethod<KitchenContext>[] {
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
