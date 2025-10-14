import type { Method, PrimitiveTask } from '../../../types';

import { BoilWaterTask } from '../primitives/boil-water-task';
import { CookPastaTask } from '../primitives/cook-pasta-task';
import { MakeTomatoSauceTask } from '../primitives/make-tomato-sauce-task';
import { ServeDishTask } from '../primitives/serve-dish-task';

import type { KitchenState } from '../state';

/** Метод: Приготовить пасту с томатным соусом */
export class PastaWithTomatoSauceMethod implements Method<KitchenState> {
  name = 'PastaWithTomatoSauce';

  preconditions(state: KitchenState): boolean {
    return (
      state.ingredients.pasta &&
      state.ingredients.tomatoes &&
      state.equipment.pot &&
      state.equipment.pan
    );
  }

  decompose(): PrimitiveTask<KitchenState>[] {
    return [
      new BoilWaterTask(),
      new CookPastaTask(),
      new MakeTomatoSauceTask(),
      new ServeDishTask('ServePasta', 'Pasta with Tomato Sauce'),
    ];
  }
}
