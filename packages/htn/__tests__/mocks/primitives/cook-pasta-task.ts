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
    const newState = state.clone();
    newState.ingredients.pasta = false; // использовали пасту
    newState.time += 15; // 15 минут варки
    return newState;
  }
}
