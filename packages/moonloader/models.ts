// Декларируем глобальный объект Lua
declare const _G: any;

/** Загружает указанную модель */
declare function RequestModel(modelId: number): boolean;
export const requestModel: typeof RequestModel = _G.requestModel;

/** Загрузка ранее запрошенных моделей */
declare function LoadAllModelsNow(): void;
export const loadAllModelsNow: typeof LoadAllModelsNow = _G.loadAllModelsNow;

/** Проверяет загрузку модели */
declare function HasModelLoaded(modelId: number): boolean;
export const hasModelLoaded: typeof HasModelLoaded = _G.hasModelLoaded;

/** Помечает загруженную ранее модель как более ненужную для скриптового движка */
declare function MarkModelAsNoLongerNeeded(modelId: number): void;
export const markModelAsNoLongerNeeded: typeof MarkModelAsNoLongerNeeded = _G.markModelAsNoLongerNeeded;

/** Загружает спецэффект */
declare function RequestSpecialModel(slot: number, modelId: number): void;
export const requestSpecialModel: typeof RequestSpecialModel = _G.requestSpecialModel;

/** Проверяет загрузку спецэффекта */
declare function HasSpecialCharacterLoaded(slot: number): boolean;
export const hasSpecialCharacterLoaded: typeof HasSpecialCharacterLoaded = _G.hasSpecialCharacterLoaded;

/** Загружает анимацию */
declare function RequestAnimation(animName: string): void;
export const requestAnimation: typeof RequestAnimation = _G.requestAnimation;

/** Проверяет загрузку анимации */
declare function HasAnimationLoaded(animName: string): boolean;
export const hasAnimationLoaded: typeof HasAnimationLoaded = _G.hasAnimationLoaded;

/** Удаляет анимацию из памяти */
declare function RemoveAnimation(animName: string): void;
export const removeAnimation: typeof RemoveAnimation = _G.removeAnimation;
