import type { IMethod, IPrimitiveTask } from '../../../types';

import { BoilWaterTask } from '../primitives/boil-water-task';
import { ChopVegetablesTask } from '../primitives/chop-vegetables-task';
import { CookRiceTask } from '../primitives/cook-rice-task';
import { FryTask } from '../primitives/fry-task';
import { ServeDishTask } from '../primitives/serve-dish-task';

import type { KitchenState } from '../state';

/** Метод: Приготовить рис с овощами */
export class RiceWithVegetablesMethod implements IMethod<KitchenState> {
  name = 'RiceWithVegetables';

  preconditions(state: KitchenState): boolean {
    return (
      state.ingredients.rice &&
      state.ingredients.onion &&
      state.equipment.pot &&
      state.equipment.pan &&
      state.equipment.knife
    );
  }

  decompose(): IPrimitiveTask<KitchenState>[] {
    return [
      new ChopVegetablesTask('onion'),
      new FryTask('onion'),
      new BoilWaterTask(),
      new CookRiceTask(),
      new ServeDishTask('ServeRice', 'Rice with Vegetables'),
    ];
  }
}
