import type { FireHandle } from './handles';

// Декларируем глобальный объект Lua
declare const _G: any;

/** Устанавливает погоду */
declare function SetWeather(weatherId: number): void;
export const setWeather: typeof SetWeather = _G.setWeather;

/** Получает текущую погоду */
declare function GetCurrentWeather(): number;
export const getCurrentWeather: typeof GetCurrentWeather = _G.getCurrentWeather;

/** Форсирует погоду */
declare function ForceWeather(weatherId: number): void;
export const forceWeather: typeof ForceWeather = _G.forceWeather;

/** Форсирует погоду сейчас */
declare function ForceWeatherNow(weatherId: number): void;
export const forceWeatherNow: typeof ForceWeatherNow = _G.forceWeatherNow;

/** Выключает погоду */
declare function ReleaseWeather(): void;
export const releaseWeather: typeof ReleaseWeather = _G.releaseWeather;

/** Устанавливает время суток */
declare function SetTimeOfDay(hours: number, minutes: number): void;
export const setTimeOfDay: typeof SetTimeOfDay = _G.setTimeOfDay;

/** Получает время суток */
declare function GetTimeOfDay(): LuaMultiReturn<[number, number]>;
export const getTimeOfDay: typeof GetTimeOfDay = _G.getTimeOfDay;

/** Получает минуты до следующего часа */
declare function GetMinutesToTimeOfDay(hours: number, minutes: number): number;
export const getMinutesToTimeOfDay: typeof GetMinutesToTimeOfDay = _G.getMinutesToTimeOfDay;

/** Сохраняет время суток */
declare function StoreClockState(): void;
export const storeClockState: typeof StoreClockState = _G.storeClockState;

/** Восстанавливает время суток */
declare function RestoreClockState(): void;
export const restoreClockState: typeof RestoreClockState = _G.restoreClockState;

/** Устанавливает гравитацию */
declare function SetGravity(gravity: number): void;
export const setGravity: typeof SetGravity = _G.setGravity;

/** Устанавливает скорость игры */
declare function SetTimeScale(scale: number): void;
export const setTimeScale: typeof SetTimeScale = _G.setTimeScale;

/** Получает расстояние между координатами 2D */
declare function GetDistanceBetweenCoords2d(
  x1: number,
  y1: number,
  x2: number,
  y2: number
): number;
export const getDistanceBetweenCoords2d: typeof GetDistanceBetweenCoords2d = _G.getDistanceBetweenCoords2d;

/** Получает расстояние между координатами 3D */
declare function GetDistanceBetweenCoords3d(
  x1: number,
  y1: number,
  z1: number,
  x2: number,
  y2: number,
  z2: number
): number;
export const getDistanceBetweenCoords3d: typeof GetDistanceBetweenCoords3d = _G.getDistanceBetweenCoords3d;

/** Получает угол между координатами */
declare function GetHeadingFromVector2d(x: number, y: number): number;
export const getHeadingFromVector2d: typeof GetHeadingFromVector2d = _G.getHeadingFromVector2d;

/** Находит наземную Z-координату для точки */
declare function GetGroundZFor3dCoord(x: number, y: number, z: number): number;
export const getGroundZFor3dCoord: typeof GetGroundZFor3dCoord = _G.getGroundZFor3dCoord;

/** Создает взрыв */
declare function AddExplosion(x: number, y: number, z: number, type: number): void;
export const addExplosion: typeof AddExplosion = _G.addExplosion;

/** Создает огонь */
declare function StartScriptFire(x: number, y: number, z: number): FireHandle;
export const startScriptFire: typeof StartScriptFire = _G.startScriptFire;

/** Удаляет огонь */
declare function RemoveScriptFire(fire: FireHandle): void;
export const removeScriptFire: typeof RemoveScriptFire = _G.removeScriptFire;

/** Проверяет существование огня */
declare function IsScriptFireExtinguished(fire: FireHandle): boolean;
export const isScriptFireExtinguished: typeof IsScriptFireExtinguished = _G.isScriptFireExtinguished;
