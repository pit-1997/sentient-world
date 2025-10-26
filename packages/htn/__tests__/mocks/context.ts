import type { IContext } from '../../types';

type Ingredient = 'pasta' | 'rice' | 'tomatoes' | 'onion' | 'cheese' | 'chicken';
type Equipment = 'pot' | 'pan' | 'knife' | 'oven';

export type KitchenState = {
  ingredients: Record<Ingredient, boolean>;
  equipment: Record<Equipment, boolean>;
  prepared: string[];
  time: number;
};

export class KitchenContext implements IContext<KitchenState> {
  constructor(
    private ingredients: Record<Ingredient, boolean>,
    private equipment: Record<Equipment, boolean>,
    private prepared: string[] = [],
    private time: number = 0
  ) {}

  static create(ingredients: Ingredient[], equipment: Equipment[]) {
    return new KitchenContext(
      {
        pasta: ingredients.includes('pasta'),
        rice: ingredients.includes('rice'),
        tomatoes: ingredients.includes('tomatoes'),
        onion: ingredients.includes('onion'),
        cheese: ingredients.includes('cheese'),
        chicken: ingredients.includes('chicken'),
      },
      {
        pot: equipment.includes('pot'),
        pan: equipment.includes('pan'),
        knife: equipment.includes('knife'),
        oven: equipment.includes('oven'),
      }
    );
  }

  get state() {
    return {
      ingredients: this.ingredients,
      equipment: this.equipment,
      prepared: this.prepared,
      time: this.time,
    };
  }

  cloneState(): KitchenState {
    return {
      ingredients: { ...this.ingredients },
      equipment: { ...this.equipment },
      prepared: [...this.prepared],
      time: this.time,
    };
  }
}
