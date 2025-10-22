import type { FireHandle } from './handles';

/** Устанавливает погоду */
export declare function setWeather(weatherId: number): void;

/** Получает текущую погоду */
export declare function getCurrentWeather(): number;

/** Форсирует погоду */
export declare function forceWeather(weatherId: number): void;

/** Форсирует погоду сейчас */
export declare function forceWeatherNow(weatherId: number): void;

/** Выключает погоду */
export declare function releaseWeather(): void;

/** Устанавливает время суток */
export declare function setTimeOfDay(hours: number, minutes: number): void;

/** Получает время суток */
export declare function getTimeOfDay(): LuaMultiReturn<[number, number]>;

/** Получает минуты до следующего часа */
export declare function getMinutesToTimeOfDay(hours: number, minutes: number): number;

/** Сохраняет время суток */
export declare function storeClockState(): void;

/** Восстанавливает время суток */
export declare function restoreClockState(): void;

/** Устанавливает гравитацию */
export declare function setGravity(gravity: number): void;

/** Устанавливает скорость игры */
export declare function setTimeScale(scale: number): void;

/** Получает расстояние между координатами 2D */
export declare function getDistanceBetweenCoords2d(
  x1: number,
  y1: number,
  x2: number,
  y2: number
): number;

/** Получает расстояние между координатами 3D */
export declare function getDistanceBetweenCoords3d(
  x1: number,
  y1: number,
  z1: number,
  x2: number,
  y2: number,
  z2: number
): number;

/** Получает угол между координатами */
export declare function getHeadingFromVector2d(x: number, y: number): number;

/** Находит наземную Z-координату для точки */
export declare function getGroundZFor3dCoord(x: number, y: number, z: number): number;

/** Создает взрыв */
export declare function addExplosion(x: number, y: number, z: number, type: number): void;

/** Создает огонь */
export declare function startScriptFire(x: number, y: number, z: number): FireHandle;

/** Удаляет огонь */
export declare function removeScriptFire(fire: FireHandle): void;

/** Проверяет существование огня */
export declare function isScriptFireExtinguished(fire: FireHandle): boolean;
