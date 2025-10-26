import type { IMethod, ICompoundTask } from '../../../types';

import { PrepareSideTask } from '../compounds/prepare-side-task';
import type { KitchenContext } from '../context';
import { BoilWaterTask } from '../primitives/boil-water-task';
import { CookPastaTask } from '../primitives/cook-pasta-task';
import { MakeTomatoSauceTask } from '../primitives/make-tomato-sauce-task';
import { ServeDishTask } from '../primitives/serve-dish-task';

/** Составная задача: Многоступенчатый ужин (паста + гарнир) */
export class ElaborateSupperTask implements ICompoundTask<KitchenContext> {
  name = 'ElaborateSupper';

  getMethods(): IMethod<KitchenContext>[] {
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
