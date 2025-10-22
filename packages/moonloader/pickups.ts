import type { PickupHandle } from './handles';

/** Создает пикап */
export declare function createPickup(
  modelId: number,
  pickupType: number,
  x: number,
  y: number,
  z: number
): PickupHandle;

/** Удаляет пикап */
export declare function removePickup(pickup: PickupHandle): void;

/** Проверяет существование пикапа */
export declare function doesPickupExist(pickup: PickupHandle): boolean;

/** Проверяет, подобран ли пикап */
export declare function hasPickupBeenCollected(pickup: PickupHandle): boolean;
