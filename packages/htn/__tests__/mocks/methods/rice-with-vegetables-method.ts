import type { IMethod, IPrimitiveTask } from '../../../types';

import type { KitchenContext, KitchenState } from '../context';

import { BoilWaterTask } from '../primitives/boil-water-task';
import { ChopVegetablesTask } from '../primitives/chop-vegetables-task';
import { CookRiceTask } from '../primitives/cook-rice-task';
import { FryTask } from '../primitives/fry-task';
import { ServeDishTask } from '../primitives/serve-dish-task';

/** Метод: Приготовить рис с овощами */
export class RiceWithVegetablesMethod implements IMethod<KitchenContext> {
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

  decompose(): IPrimitiveTask<KitchenContext>[] {
    return [
      new ChopVegetablesTask('onion'),
      new FryTask('onion'),
      new BoilWaterTask(),
      new CookRiceTask(),
      new ServeDishTask('ServeRice', 'Rice with Vegetables'),
    ];
  }
}
