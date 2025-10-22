/** Проверяет существование файла */
export declare function doesFileExist(path: string): boolean;

/** Проверяет существование директории */
export declare function doesDirectoryExist(path: string): boolean;

/** Создает директорию */
export declare function createDirectory(path: string): boolean;

/** Получает путь к рабочей директории скрипта */
export declare function getWorkingDirectory(): string;

/** Получает путь к папке игры */
export declare function getGameDirectory(): string;
