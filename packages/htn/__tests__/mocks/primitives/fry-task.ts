import type { IPrimitiveTask, ExecutionStatus } from '../../../types';

import type { KitchenContext, KitchenState } from '../context';

/** Жарить на сковороде */
export class FryTask implements IPrimitiveTask<KitchenContext> {
  name = 'Fry';

  constructor(private ingredient: 'onion' | 'chicken') {}

  canExecute(state: KitchenState): boolean {
    return state.equipment.pan && state.ingredients[this.ingredient];
  }

  execute(): ExecutionStatus {
    return 'success';
  }

  applyEffects(state: KitchenState): KitchenState {
    return {
      ...state,
      time: state.time + 10,
      ingredients: {
        ...state.ingredients,
        [this.ingredient]: false,
      },
    };
  }
}
