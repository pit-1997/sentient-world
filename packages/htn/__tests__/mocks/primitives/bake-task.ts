import type { PrimitiveTask, TaskResult } from '../../../types';

import type { KitchenState } from '../state';

/** Запечь в духовке */
export class BakeTask implements PrimitiveTask<KitchenState> {
  name = 'Bake';

  canExecute(state: KitchenState): boolean {
    return state.equipment.oven && state.ingredients.chicken && state.ingredients.cheese;
  }

  execute(): TaskResult {
    return 'success';
  }

  applyEffects(state: KitchenState): KitchenState {
    const newState = state.clone();
    newState.ingredients.chicken = false;
    newState.ingredients.cheese = false;
    newState.time += 40;
    return newState;
  }
}
