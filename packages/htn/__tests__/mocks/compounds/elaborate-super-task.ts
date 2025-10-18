import type { IMethod, ICompoundTask } from '../../../types';

import { PrepareSideTask } from '../compounds/prepare-side-task';
import { BoilWaterTask } from '../primitives/boil-water-task';
import { CookPastaTask } from '../primitives/cook-pasta-task';
import { MakeTomatoSauceTask } from '../primitives/make-tomato-sauce-task';
import { ServeDishTask } from '../primitives/serve-dish-task';
import type { KitchenState } from '../state';

/** Составная задача: Многоступенчатый ужин (паста + гарнир) */
export class ElaborateSupperTask implements ICompoundTask<KitchenState> {
  name = 'ElaborateSupper';

  getMethods(): IMethod<KitchenState>[] {
    return [
      {
        name: 'PastaAndSide',
        preconditions: (state) =>
          state.ingredients.pasta && state.ingredients.tomatoes && state.ingredients.rice,
        decompose: () => [
          new BoilWaterTask(),
          new CookPastaTask(),
          new MakeTomatoSauceTask(),
          new PrepareSideTask(), // ← Вложенная составная задача!
          new ServeDishTask('ServeMeal', 'Elaborate Supper'),
        ],
      },
    ];
  }
}
