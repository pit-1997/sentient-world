// Декларируем глобальный объект Lua
declare const _G: any;

/** Загружает аудиопоток */
declare function LoadAudioStream(url: string): number;
export const loadAudioStream: typeof LoadAudioStream = _G.loadAudioStream;

/** Проигрывает аудиопоток */
declare function PlayAudioStream(stream: number): void;
export const playAudioStream: typeof PlayAudioStream = _G.playAudioStream;

/** Останавливает аудиопоток */
declare function StopAudioStream(stream: number): void;
export const stopAudioStream: typeof StopAudioStream = _G.stopAudioStream;

/** Получает длину аудиопотока */
declare function GetAudioStreamLength(stream: number): number;
export const getAudioStreamLength: typeof GetAudioStreamLength = _G.getAudioStreamLength;

/** Устанавливает громкость аудиопотока */
declare function SetAudioStreamVolume(stream: number, volume: number): void;
export const setAudioStreamVolume: typeof SetAudioStreamVolume = _G.setAudioStreamVolume;

/** Получает состояние аудиопотока */
declare function GetAudioStreamState(stream: number): number;
export const getAudioStreamState: typeof GetAudioStreamState = _G.getAudioStreamState;

/** Воспроизводит звуковой эффект */
declare function PlaySoundFrontend(soundId: number): void;
export const playSoundFrontend: typeof PlaySoundFrontend = _G.playSoundFrontend;

/** Воспроизводит звук на позиции */
declare function AddOneOffSound(x: number, y: number, z: number, soundId: number): void;
export const addOneOffSound: typeof AddOneOffSound = _G.addOneOffSound;
