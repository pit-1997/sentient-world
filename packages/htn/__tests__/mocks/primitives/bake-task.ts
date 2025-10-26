import type { IPrimitiveTask, ExecutionStatus } from '../../../types';

import type { KitchenContext, KitchenState } from '../context';

/** Запечь в духовке */
export class BakeTask implements IPrimitiveTask<KitchenContext> {
  name = 'Bake';

  canExecute(state: KitchenState): boolean {
    return state.equipment.oven && state.ingredients.chicken && state.ingredients.cheese;
  }

  execute(): ExecutionStatus {
    return 'success';
  }

  applyEffects(state: KitchenState): KitchenState {
    return {
      ...state,
      time: state.time + 40,
      ingredients: {
        ...state.ingredients,
        chicken: false,
        cheese: false,
      },
    };
  }
}
