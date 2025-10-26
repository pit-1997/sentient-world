import type { IMethod, IPrimitiveTask } from '../../../types';

import type { KitchenContext, KitchenState } from '../context';
import { BoilWaterTask } from '../primitives/boil-water-task';
import { CookPastaTask } from '../primitives/cook-pasta-task';
import { MakeTomatoSauceTask } from '../primitives/make-tomato-sauce-task';
import { ServeDishTask } from '../primitives/serve-dish-task';

/** Метод: Приготовить пасту с томатным соусом */
export class PastaWithTomatoSauceMethod implements IMethod<KitchenContext> {
  name = 'PastaWithTomatoSauce';

  preconditions(state: KitchenState): boolean {
    return (
      state.ingredients.pasta &&
      state.ingredients.tomatoes &&
      state.equipment.pot &&
      state.equipment.pan
    );
  }

  decompose(): IPrimitiveTask<KitchenContext>[] {
    return [
      new BoilWaterTask(),
      new CookPastaTask(),
      new MakeTomatoSauceTask(),
      new ServeDishTask('ServePasta', 'Pasta with Tomato Sauce'),
    ];
  }
}
