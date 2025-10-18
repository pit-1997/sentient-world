import type { IMethod, ICompoundTask } from '../../../types';

import { BakedChickenMethod } from '../methods/baked-chicken-method';
import { CannotCookMethod } from '../methods/cannot-cook-method';
import { PastaWithTomatoSauceMethod } from '../methods/pasta-with-tomato-sauce-method';
import { PlainRiceMethod } from '../methods/plain-rice-method';
import { RiceWithVegetablesMethod } from '../methods/rice-with-vegetables-method';

import type { KitchenState } from '../state';

/** Составная задача: Приготовить ужин */
export class PrepareSupperTask implements ICompoundTask<KitchenState> {
  name = 'PrepareSupper';

  getMethods(): IMethod<KitchenState>[] {
    return [
      new PastaWithTomatoSauceMethod(),
      new BakedChickenMethod(),
      new RiceWithVegetablesMethod(),
      new PlainRiceMethod(),
      new CannotCookMethod(),
    ];
  }
}
