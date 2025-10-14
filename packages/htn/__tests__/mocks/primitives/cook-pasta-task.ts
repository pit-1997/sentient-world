import type { PrimitiveTask, TaskResult } from '../../../types';

import type { KitchenState } from '../state';

/** Варить пасту */
export class CookPastaTask implements PrimitiveTask<KitchenState> {
  name = 'CookPasta';

  canExecute(state: KitchenState): boolean {
    return state.equipment.pot && state.ingredients.pasta;
  }

  cancel() {}

  execute(): TaskResult {
    return 'success';
  }

  applyEffects(state: KitchenState): KitchenState {
    const newState = state.clone();
    newState.ingredients.pasta = false; // использовали пасту
    newState.time += 15; // 15 минут варки
    return newState;
  }
}
