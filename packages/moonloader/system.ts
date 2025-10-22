/** Выводит текст в файл moonloader.log и вызывает событие onScriptMessage */
export declare function print(text: string): void;

/** Приостанавливает выполнение скрипта */
export declare function wait(timeInMs: number): void;

/** Выводит текст в нижней части экрана, минуя очередь */
export declare function printStringNow(text: string, timeInMs: number): void;

/** Выводит текст с префиксом в нижней части экрана */
export declare function printString(text: string, timeInMs: number): void;

/** Выводит отформатированную строку с префиксом */
export declare function printStringWithLiteralStringNow(
  prefix: string,
  text: string,
  timeInMs: number,
  flag: number
): void;

/** Выводит большой текст на экран */
export declare function printBig(text: string, timeInMs: number, style: number): void;

/** Очищает очередь всех текстов */
export declare function clearPrints(): void;

/** Проверяет, отображается ли сейчас текст-подсказка */
export declare function isHelpMessageBeingDisplayed(): boolean;

/** Проверяет, нажата ли клавиша */
export declare function isKeyPressed(key: VKey): boolean;

/** Проверяет, была ли клавиша нажата */
export declare function wasKeyPressed(key: VKey): boolean;

/** Получает имя текущего скрипта */
export declare function thisScript(): string;

/** Выгружает скрипт */
export declare function unloadScript(scriptName: string): void;

/** Перезагружает скрипт */
export declare function reloadScript(scriptName: string): void;

/** Получает список всех скриптов */
export declare function getAllScripts(): string[];

/** Проверяет загружен ли скрипт */
export declare function isScriptLoaded(scriptName: string): boolean;

/** Получает FPS */
export declare function getFramerate(): number;

/** Проверяет, стоит ли игра на паузе */
export declare function isGamePaused(): boolean;

/** Получает версию игры */
export declare function getGameVersion(): string;

/** Получает указатель на игрока */
export declare function getPlayerPointer(): number;

/** Проверяет, в игре ли игрок */
export declare function isPlayerPlaying(): boolean;
