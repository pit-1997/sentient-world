import type { PrimitiveTask, TaskResult } from '../../../types';

import type { KitchenState } from '../state';

/** Приготовить томатный соус */
export class MakeTomatoSauceTask implements PrimitiveTask<KitchenState> {
  name = 'MakeTomatoSauce';

  canExecute(state: KitchenState): boolean {
    return state.equipment.pan && state.ingredients.tomatoes;
  }

  execute(): TaskResult {
    return 'success';
  }

  applyEffects(state: KitchenState): KitchenState {
    const newState = state.clone();
    newState.ingredients.tomatoes = false;
    newState.time += 15;
    return newState;
  }
}
