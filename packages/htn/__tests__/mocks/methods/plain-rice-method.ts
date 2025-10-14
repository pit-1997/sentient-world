import type { Method, PrimitiveTask } from '../../../types';

import { BoilWaterTask } from '../primitives/boil-water-task';
import { CookRiceTask } from '../primitives/cook-rice-task';
import { ServeDishTask } from '../primitives/serve-dish-task';

import type { KitchenState } from '../state';

/** Метод: Простой рис (если нет овощей) */
export class PlainRiceMethod implements Method<KitchenState> {
  name = 'PlainRice';

  preconditions(state: KitchenState): boolean {
    return state.ingredients.rice && state.equipment.pot;
  }

  decompose(): PrimitiveTask<KitchenState>[] {
    return [new BoilWaterTask(), new CookRiceTask(), new ServeDishTask('ServeRice', 'Plain Rice')];
  }
}
