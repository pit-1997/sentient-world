/** Загружает указанную модель */
export declare function requestModel(modelId: number): boolean;

/** Загрузка ранее запрошенных моделей */
export declare function loadAllModelsNow(): void;

/** Проверяет загрузку модели */
export declare function hasModelLoaded(modelId: number): boolean;

/** Помечает загруженную ранее модель как более ненужную для скриптового движка */
export declare function markModelAsNoLongerNeeded(modelId: number): void;

/** Загружает спецэффект */
export declare function requestSpecialModel(slot: number, modelId: number): void;

/** Проверяет загрузку спецэффекта */
export declare function hasSpecialCharacterLoaded(slot: number): boolean;

/** Загружает анимацию */
export declare function requestAnimation(animName: string): void;

/** Проверяет загрузку анимации */
export declare function hasAnimationLoaded(animName: string): boolean;

/** Удаляет анимацию из памяти */
export declare function removeAnimation(animName: string): void;
