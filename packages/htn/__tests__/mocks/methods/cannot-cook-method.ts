import type { Method, PrimitiveTask } from '../../../types';

import type { KitchenState } from '../state';

/** Метод: Не можем готовить (нет ингредиентов) */
export class CannotCookMethod implements Method<KitchenState> {
  name = 'CannotCook';

  preconditions(): boolean {
    return true; // fallback - всегда подходит
  }

  decompose(): PrimitiveTask<KitchenState>[] {
    return []; // ничего не готовим
  }
}
