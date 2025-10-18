import type { IPrimitiveTask, ExecutionStatus } from '../../../types';

import type { KitchenState } from '../state';

/** Варить рис */
export class CookRiceTask implements IPrimitiveTask<KitchenState> {
  name = 'CookRice';

  canExecute(state: KitchenState): boolean {
    return state.equipment.pot && state.ingredients.rice;
  }

  execute(): ExecutionStatus {
    return 'success';
  }

  applyEffects(state: KitchenState): KitchenState {
    const newState = state.clone();
    newState.ingredients.rice = false;
    newState.time += 20; // рис варится дольше
    return newState;
  }
}
