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
    return {
      ...state,
      time: state.time + 20, // рис варится дольше
      ingredients: {
        ...state.ingredients,
        rice: false,
      },
    };
  }
}
