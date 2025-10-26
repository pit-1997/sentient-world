import type { IPrimitiveTask, ExecutionStatus } from '../../../types';

import type { KitchenContext, KitchenState } from '../context';

export class ServeDishTask implements IPrimitiveTask<KitchenContext> {
  constructor(
    public name: string,
    private dishName: string
  ) {}

  canExecute(): boolean {
    return true; // всегда можем подать
  }

  execute(): ExecutionStatus {
    return 'success';
  }

  applyEffects(state: KitchenState): KitchenState {
    return {
      ...state,
      prepared: [...state.prepared, this.dishName],
    };
  }
}
