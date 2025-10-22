/** Загружает аудиопоток */
export declare function loadAudioStream(url: string): number;

/** Проигрывает аудиопоток */
export declare function playAudioStream(stream: number): void;

/** Останавливает аудиопоток */
export declare function stopAudioStream(stream: number): void;

/** Получает длину аудиопотока */
export declare function getAudioStreamLength(stream: number): number;

/** Устанавливает громкость аудиопотока */
export declare function setAudioStreamVolume(stream: number, volume: number): void;

/** Получает состояние аудиопотока */
export declare function getAudioStreamState(stream: number): number;

/** Воспроизводит звуковой эффект */
export declare function playSoundFrontend(soundId: number): void;

/** Воспроизводит звук на позиции */
export declare function addOneOffSound(x: number, y: number, z: number, soundId: number): void;
