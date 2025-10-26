import type { IPrimitiveTask, ExecutionStatus } from '../../../types';

import type { KitchenState } from '../state';

/** Варить пасту */
export class CookPastaTask implements IPrimitiveTask<KitchenState> {
  name = 'CookPasta';

  canExecute(state: KitchenState): boolean {
    return state.equipment.pot && state.ingredients.pasta;
  }

  execute(): ExecutionStatus {
    return 'success';
  }

  applyEffects(state: KitchenState): KitchenState {
    return {
      ...state,
      time: state.time + 15,
      ingredients: {
        ...state.ingredients,
        pasta: false, // использовали пасту
      },
    };
  }
}
