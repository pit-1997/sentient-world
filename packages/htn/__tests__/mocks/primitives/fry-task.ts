import type { IPrimitiveTask, ExecutionStatus } from '../../../types';

import type { KitchenState } from '../state';

/** Жарить на сковороде */
export class FryTask implements IPrimitiveTask<KitchenState> {
  name = 'Fry';

  constructor(private ingredient: 'onion' | 'chicken') {}

  canExecute(state: KitchenState): boolean {
    return state.equipment.pan && state.ingredients[this.ingredient];
  }

  execute(): ExecutionStatus {
    return 'success';
  }

  applyEffects(state: KitchenState): KitchenState {
    const newState = state.clone();
    newState.ingredients[this.ingredient] = false;
    newState.time += 10;
    return newState;
  }
}
