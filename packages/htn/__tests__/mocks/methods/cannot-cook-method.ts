import type { IMethod, IPrimitiveTask } from '../../../types';

import type { KitchenState } from '../state';

/** Метод: Не можем готовить (нет ингредиентов) */
export class CannotCookMethod implements IMethod<KitchenState> {
  name = 'CannotCook';

  preconditions(): boolean {
    return true; // fallback - всегда подходит
  }

  decompose(): IPrimitiveTask<KitchenState>[] {
    return []; // ничего не готовим
  }
}
