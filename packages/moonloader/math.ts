// Декларируем глобальный объект Lua
declare const _G: any;

/** Получает случайное число */
declare function GenerateRandomFloatInRange(min: number, max: number): number;
export const generateRandomFloatInRange: typeof GenerateRandomFloatInRange = _G.generateRandomFloatInRange;

/** Получает случайное целое число */
declare function GenerateRandomIntInRange(min: number, max: number): number;
export const generateRandomIntInRange: typeof GenerateRandomIntInRange = _G.generateRandomIntInRange;

/** Ограничивает угол от 0 до 360 */
declare function LimitAngle(angle: number): number;
export const limitAngle: typeof LimitAngle = _G.limitAngle;
