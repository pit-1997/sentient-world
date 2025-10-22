/** Получает никнейм игрока по ID */
export declare function getPlayerName(playerId: number): string;

/** Получает пинг игрока */
export declare function getPlayerPing(playerId: number): number;

/** Получает IP и порт сервера */
export declare function getServerAddress(): LuaMultiReturn<[string, number]>;

/** Отправляет команду на сервер */
export declare function sendServerCommand(command: string): void;

/** Отправляет сообщение в чат */
export declare function sendChat(message: string): void;

/** Проверяет подключение к серверу */
export declare function isPlayerConnected(playerId: number): boolean;

/** Получает счет игрока */
export declare function getPlayerScore(playerId: number): number;

/** Проверяет, пауза ли у игрока */
export declare function isPlayerPaused(playerId: number): boolean;
