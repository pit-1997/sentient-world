import type { IPrimitiveTask, ExecutionStatus } from '../../../types';

import type { KitchenState } from '../state';

/** Нарезать овощи */
export class ChopVegetablesTask implements IPrimitiveTask<KitchenState> {
  name = 'ChopVegetables';

  constructor(private vegetable: 'tomatoes' | 'onion') {}

  canExecute(state: KitchenState): boolean {
    return state.equipment.knife && state.ingredients[this.vegetable];
  }

  execute(): ExecutionStatus {
    return 'success';
  }

  applyEffects(state: KitchenState): KitchenState {
    return {
      ...state,
      time: state.time + 5, // 5 минут на нарезку
    };
  }
}
