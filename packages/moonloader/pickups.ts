import type { PickupHandle } from './handles';

// Декларируем глобальный объект Lua
declare const _G: any;

/** Создает пикап */
declare function CreatePickup(
  modelId: number,
  pickupType: number,
  x: number,
  y: number,
  z: number
): PickupHandle;
export const createPickup: typeof CreatePickup = _G.createPickup;

/** Удаляет пикап */
declare function RemovePickup(pickup: PickupHandle): void;
export const removePickup: typeof RemovePickup = _G.removePickup;

/** Проверяет существование пикапа */
declare function DoesPickupExist(pickup: PickupHandle): boolean;
export const doesPickupExist: typeof DoesPickupExist = _G.doesPickupExist;

/** Проверяет, подобран ли пикап */
declare function HasPickupBeenCollected(pickup: PickupHandle): boolean;
export const hasPickupBeenCollected: typeof HasPickupBeenCollected = _G.hasPickupBeenCollected;
