type Ingredient = 'pasta' | 'rice' | 'tomatoes' | 'onion' | 'cheese' | 'chicken';
type Equipment = 'pot' | 'pan' | 'knife' | 'oven';

export type KitchenState = {
  ingredients: Record<Ingredient, boolean>;
  equipment: Record<Equipment, boolean>;
  prepared: string[];
  time: number;
};

export function createKitchen(
  ingridients: Array<keyof KitchenState['ingredients']>,
  equipment: Array<keyof KitchenState['equipment']>
): KitchenState {
  return {
    prepared: [],
    time: 0,
    ingredients: {
      pasta: ingridients.includes('pasta'),
      rice: ingridients.includes('rice'),
      tomatoes: ingridients.includes('tomatoes'),
      onion: ingridients.includes('onion'),
      cheese: ingridients.includes('cheese'),
      chicken: ingridients.includes('chicken'),
    },
    equipment: {
      pot: equipment.includes('pot'),
      pan: equipment.includes('pan'),
      knife: equipment.includes('knife'),
      oven: equipment.includes('oven'),
    },
  };
}
