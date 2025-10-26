import type { IPrimitiveTask, ExecutionStatus } from '../../../types';

import type { KitchenContext, KitchenState } from '../context';

/** Вскипятить воду */
export class BoilWaterTask implements IPrimitiveTask<KitchenContext> {
  name = 'BoilWater';

  canExecute(state: KitchenState): boolean {
    return state.equipment.pot;
  }

  execute(): ExecutionStatus {
    return 'success';
  }

  applyEffects(state: KitchenState): KitchenState {
    return {
      ...state,
      time: state.time + 10,
    };
  }
}
