// Декларируем глобальный объект Lua
declare const _G: any;

/** Получает никнейм игрока по ID */
declare function GetPlayerName(playerId: number): string;
export const getPlayerName: typeof GetPlayerName = _G.getPlayerName;

/** Получает пинг игрока */
declare function GetPlayerPing(playerId: number): number;
export const getPlayerPing: typeof GetPlayerPing = _G.getPlayerPing;

/** Получает IP и порт сервера */
declare function GetServerAddress(): LuaMultiReturn<[string, number]>;
export const getServerAddress: typeof GetServerAddress = _G.getServerAddress;

/** Отправляет команду на сервер */
declare function SendServerCommand(command: string): void;
export const sendServerCommand: typeof SendServerCommand = _G.sendServerCommand;

/** Отправляет сообщение в чат */
declare function SendChat(message: string): void;
export const sendChat: typeof SendChat = _G.sendChat;

/** Проверяет подключение к серверу */
declare function IsPlayerConnected(playerId: number): boolean;
export const isPlayerConnected: typeof IsPlayerConnected = _G.isPlayerConnected;

/** Получает счет игрока */
declare function GetPlayerScore(playerId: number): number;
export const getPlayerScore: typeof GetPlayerScore = _G.getPlayerScore;

/** Проверяет, пауза ли у игрока */
declare function IsPlayerPaused(playerId: number): boolean;
export const isPlayerPaused: typeof IsPlayerPaused = _G.isPlayerPaused;
