import type { IMethod, IPrimitiveTask } from '../../../types';

import type { KitchenContext, KitchenState } from '../context';
import { BoilWaterTask } from '../primitives/boil-water-task';
import { CookRiceTask } from '../primitives/cook-rice-task';
import { ServeDishTask } from '../primitives/serve-dish-task';

/** Метод: Простой рис (если нет овощей) */
export class PlainRiceMethod implements IMethod<KitchenContext> {
  name = 'PlainRice';

  preconditions(state: KitchenState): boolean {
    return state.ingredients.rice && state.equipment.pot;
  }

  decompose(): IPrimitiveTask<KitchenContext>[] {
    return [new BoilWaterTask(), new CookRiceTask(), new ServeDishTask('ServeRice', 'Plain Rice')];
  }
}
