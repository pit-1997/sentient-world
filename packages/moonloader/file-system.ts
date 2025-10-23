// Декларируем глобальный объект Lua
declare const _G: any;

/** Проверяет существование файла */
declare function DoesFileExist(path: string): boolean;
export const doesFileExist: typeof DoesFileExist = _G.doesFileExist;

/** Проверяет существование директории */
declare function DoesDirectoryExist(path: string): boolean;
export const doesDirectoryExist: typeof DoesDirectoryExist = _G.doesDirectoryExist;

/** Создает директорию */
declare function CreateDirectory(path: string): boolean;
export const createDirectory: typeof CreateDirectory = _G.createDirectory;

/** Получает путь к рабочей директории скрипта */
declare function GetWorkingDirectory(): string;
export const getWorkingDirectory: typeof GetWorkingDirectory = _G.getWorkingDirectory;

/** Получает путь к папке игры */
declare function GetGameDirectory(): string;
export const getGameDirectory: typeof GetGameDirectory = _G.getGameDirectory;
