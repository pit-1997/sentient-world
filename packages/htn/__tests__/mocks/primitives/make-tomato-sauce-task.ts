import type { IPrimitiveTask, ExecutionStatus } from '../../../types';

import type { KitchenState } from '../state';

/** Приготовить томатный соус */
export class MakeTomatoSauceTask implements IPrimitiveTask<KitchenState> {
  name = 'MakeTomatoSauce';

  canExecute(state: KitchenState): boolean {
    return state.equipment.pan && state.ingredients.tomatoes;
  }

  execute(): ExecutionStatus {
    return 'success';
  }

  applyEffects(state: KitchenState): KitchenState {
    const newState = state.clone();
    newState.ingredients.tomatoes = false;
    newState.time += 15;
    return newState;
  }
}
