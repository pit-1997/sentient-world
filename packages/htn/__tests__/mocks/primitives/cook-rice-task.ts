import type { PrimitiveTask, TaskResult } from '../../../types';

import type { KitchenState } from '../state';

/** Варить рис */
export class CookRiceTask implements PrimitiveTask<KitchenState> {
  name = 'CookRice';

  canExecute(state: KitchenState): boolean {
    return state.equipment.pot && state.ingredients.rice;
  }

  execute(): TaskResult {
    return 'success';
  }

  applyEffects(state: KitchenState): KitchenState {
    const newState = state.clone();
    newState.ingredients.rice = false;
    newState.time += 20; // рис варится дольше
    return newState;
  }
}
