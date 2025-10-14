import type { PrimitiveTask, TaskResult } from '../../../types';

import type { KitchenState } from '../state';

/** Вскипятить воду */
export class BoilWaterTask implements PrimitiveTask<KitchenState> {
  name = 'BoilWater';

  canExecute(state: KitchenState): boolean {
    return state.equipment.pot;
  }

  execute(): TaskResult {
    return 'success';
  }

  applyEffects(state: KitchenState): KitchenState {
    const newState = state.clone();
    newState.time += 10; // 10 минут на кипячение
    return newState;
  }
}
