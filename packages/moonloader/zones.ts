// Декларируем глобальный объект Lua
declare const _G: any;

/** Получает название зоны */
declare function GetNameOfZone(x: number, y: number, z: number): string;
export const getNameOfZone: typeof GetNameOfZone = _G.getNameOfZone;

/** Получает название города */
declare function GetNameOfInfoZone(x: number, y: number, z: number): string;
export const getNameOfInfoZone: typeof GetNameOfInfoZone = _G.getNameOfInfoZone;

/** Получает текущую зону игрока */
declare function GetCurrentZoneScavengerValue(): number;
export const getCurrentZoneScavengerValue: typeof GetCurrentZoneScavengerValue = _G.getCurrentZoneScavengerValue;
