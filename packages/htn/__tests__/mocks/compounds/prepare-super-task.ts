import type { IMethod, ICompoundTask } from '../../../types';

import type { KitchenContext } from '../context';
import { BakedChickenMethod } from '../methods/baked-chicken-method';
import { CannotCookMethod } from '../methods/cannot-cook-method';
import { PastaWithTomatoSauceMethod } from '../methods/pasta-with-tomato-sauce-method';
import { PlainRiceMethod } from '../methods/plain-rice-method';
import { RiceWithVegetablesMethod } from '../methods/rice-with-vegetables-method';

/** Составная задача: Приготовить ужин */
export class PrepareSupperTask implements ICompoundTask<KitchenContext> {
  name = 'PrepareSupper';

  getMethods(): IMethod<KitchenContext>[] {
    return [
      new PastaWithTomatoSauceMethod(),
      new BakedChickenMethod(),
      new RiceWithVegetablesMethod(),
      new PlainRiceMethod(),
      new CannotCookMethod(),
    ];
  }
}
