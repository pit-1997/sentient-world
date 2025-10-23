// Декларируем глобальный объект Lua
declare const _G: any;

export type VKey = (typeof import('vkeys'))[keyof typeof import('vkeys')];

/** Выводит текст в файл moonloader.log и вызывает событие onScriptMessage */
declare function Print(text: string): void;
export const print: typeof Print = _G.print;

/** Приостанавливает выполнение скрипта */
declare function Wait(timeInMs: number): void;
export const wait: typeof Wait = _G.wait;

/** Выводит текст в нижней части экрана, минуя очередь */
declare function PrintStringNow(text: string, timeInMs: number): void;
export const printStringNow: typeof PrintStringNow = _G.printStringNow;

/** Выводит текст с префиксом в нижней части экрана */
declare function PrintString(text: string, timeInMs: number): void;
export const printString: typeof PrintString = _G.printString;

/** Выводит отформатированную строку с префиксом */
declare function PrintStringWithLiteralStringNow(
  prefix: string,
  text: string,
  timeInMs: number,
  flag: number
): void;
export const printStringWithLiteralStringNow: typeof PrintStringWithLiteralStringNow = _G.printStringWithLiteralStringNow;

/** Выводит большой текст на экран */
declare function PrintBig(text: string, timeInMs: number, style: number): void;
export const printBig: typeof PrintBig = _G.printBig;

/** Очищает очередь всех текстов */
declare function ClearPrints(): void;
export const clearPrints: typeof ClearPrints = _G.clearPrints;

/** Проверяет, отображается ли сейчас текст-подсказка */
declare function IsHelpMessageBeingDisplayed(): boolean;
export const isHelpMessageBeingDisplayed: typeof IsHelpMessageBeingDisplayed = _G.isHelpMessageBeingDisplayed;

/** Проверяет, нажата ли клавиша */
declare function IsKeyPressed(key: VKey): boolean;
export const isKeyPressed: typeof IsKeyPressed = _G.isKeyPressed;

/** Проверяет, была ли клавиша нажата */
declare function WasKeyPressed(key: VKey): boolean;
export const wasKeyPressed: typeof WasKeyPressed = _G.wasKeyPressed;

/** Получает имя текущего скрипта */
declare function ThisScript(): string;
export const thisScript: typeof ThisScript = _G.thisScript;

/** Выгружает скрипт */
declare function UnloadScript(scriptName: string): void;
export const unloadScript: typeof UnloadScript = _G.unloadScript;

/** Перезагружает скрипт */
declare function ReloadScript(scriptName: string): void;
export const reloadScript: typeof ReloadScript = _G.reloadScript;

/** Получает список всех скриптов */
declare function GetAllScripts(): string[];
export const getAllScripts: typeof GetAllScripts = _G.getAllScripts;

/** Проверяет загружен ли скрипт */
declare function IsScriptLoaded(scriptName: string): boolean;
export const isScriptLoaded: typeof IsScriptLoaded = _G.isScriptLoaded;

/** Получает FPS */
declare function GetFramerate(): number;
export const getFramerate: typeof GetFramerate = _G.getFramerate;

/** Проверяет, стоит ли игра на паузе */
declare function IsGamePaused(): boolean;
export const isGamePaused: typeof IsGamePaused = _G.isGamePaused;

/** Получает версию игры */
declare function GetGameVersion(): string;
export const getGameVersion: typeof GetGameVersion = _G.getGameVersion;

/** Получает указатель на игрока */
declare function GetPlayerPointer(): number;
export const getPlayerPointer: typeof GetPlayerPointer = _G.getPlayerPointer;

/** Проверяет, в игре ли игрок */
declare function IsPlayerPlaying(): boolean;
export const isPlayerPlaying: typeof IsPlayerPlaying = _G.isPlayerPlaying;
