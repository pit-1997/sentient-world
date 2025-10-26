import type { IMethod, IPrimitiveTask } from '../../../types';

import type { KitchenContext, KitchenState } from '../context';
import { BakeTask } from '../primitives/bake-task';
import { ServeDishTask } from '../primitives/serve-dish-task';

/** Метод: Запечённая курица */
export class BakedChickenMethod implements IMethod<KitchenContext> {
  name = 'BakedChicken';

  preconditions(state: KitchenState): boolean {
    return state.ingredients.chicken && state.ingredients.cheese && state.equipment.oven;
  }

  decompose(): IPrimitiveTask<KitchenContext>[] {
    return [new BakeTask(), new ServeDishTask('ServeChicken', 'Baked Chicken with Cheese')];
  }
}
