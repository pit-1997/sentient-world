import type { PrimitiveTask, TaskResult } from '../../../types';

import type { KitchenState } from '../state';

/** Нарезать овощи */
export class ChopVegetablesTask implements PrimitiveTask<KitchenState> {
  name = 'ChopVegetables';

  constructor(private vegetable: 'tomatoes' | 'onion') {}

  canExecute(state: KitchenState): boolean {
    return state.equipment.knife && state.ingredients[this.vegetable];
  }

  execute(): TaskResult {
    return 'success';
  }

  applyEffects(state: KitchenState): KitchenState {
    const newState = state.clone();
    newState.time += 5; // 5 минут на нарезку
    return newState;
  }
}
