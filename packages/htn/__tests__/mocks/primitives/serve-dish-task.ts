import type { PrimitiveTask, TaskResult } from '../../../types';

import type { KitchenState } from '../state';

export class ServeDishTask implements PrimitiveTask<KitchenState> {
  constructor(
    public name: string,
    private dishName: string
  ) {}

  canExecute(): boolean {
    return true; // всегда можем подать
  }

  execute(): TaskResult {
    return 'success';
  }

  applyEffects(state: KitchenState): KitchenState {
    const newState = state.clone();
    newState.prepared.push(this.dishName);
    return newState;
  }
}
