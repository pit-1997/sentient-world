import type { IMethod, IPrimitiveTask } from '../../../types';

import type { KitchenContext } from '../context';

/** Метод: Не можем готовить (нет ингредиентов) */
export class CannotCookMethod implements IMethod<KitchenContext> {
  name = 'CannotCook';

  preconditions(): boolean {
    return true; // fallback - всегда подходит
  }

  decompose(): IPrimitiveTask<KitchenContext>[] {
    return []; // ничего не готовим
  }
}
