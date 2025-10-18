import type { IMethod, IPrimitiveTask } from '../../../types';

import { BakeTask } from '../primitives/bake-task';
import { ServeDishTask } from '../primitives/serve-dish-task';

import type { KitchenState } from '../state';

/** Метод: Запечённая курица */
export class BakedChickenMethod implements IMethod<KitchenState> {
  name = 'BakedChicken';

  preconditions(state: KitchenState): boolean {
    return state.ingredients.chicken && state.ingredients.cheese && state.equipment.oven;
  }

  decompose(): IPrimitiveTask<KitchenState>[] {
    return [new BakeTask(), new ServeDishTask('ServeChicken', 'Baked Chicken with Cheese')];
  }
}
