import type { IPrimitiveTask, ExecutionStatus } from '../../../types';

import type { KitchenContext, KitchenState } from '../context';

/** Приготовить томатный соус */
export class MakeTomatoSauceTask implements IPrimitiveTask<KitchenContext> {
  name = 'MakeTomatoSauce';

  canExecute(state: KitchenState): boolean {
    return state.equipment.pan && state.ingredients.tomatoes;
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
        tomatoes: false,
      },
    };
  }
}
