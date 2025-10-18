import type { IState } from '../../types';

type Ingredient = 'pasta' | 'rice' | 'tomatoes' | 'onion' | 'cheese' | 'chicken';
type Equipment = 'pot' | 'pan' | 'knife' | 'oven';

export class KitchenState implements IState {
  constructor(
    public ingredients: Record<Ingredient, boolean>,
    public equipment: Record<Equipment, boolean>,
    public prepared: string[] = [],
    public time: number = 0
  ) {}

  static create(ingredients: Ingredient[], equipment: Equipment[]) {
    return new KitchenState(
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

  clone(): this {
    return new KitchenState(
      { ...this.ingredients },
      { ...this.equipment },
      [...this.prepared],
      this.time
    ) as this;
  }
}
