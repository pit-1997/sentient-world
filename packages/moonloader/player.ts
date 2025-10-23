import type { PedHandle } from './handles';

// Декларируем глобальный объект Lua
declare const _G: any;

/** Получает персонажа игрока */
declare function GetPlayerChar(playerId: number): PedHandle;
export const getPlayerChar: typeof GetPlayerChar = _G.getPlayerChar;

/** Получает ID игрока */
declare function GetPlayerId(): number;
export const getPlayerId: typeof GetPlayerId = _G.getPlayerId;

/** Получает координаты игрока */
declare function GetActivePlayerCoords(): LuaMultiReturn<[number, number, number]>;
export const getActivePlayerCoords: typeof GetActivePlayerCoords = _G.getActivePlayerCoords;

/** Устанавливает координаты игрока */
declare function SetPlayerCoordinates(
  playerId: number,
  x: number,
  y: number,
  z: number
): void;
export const setPlayerCoordinates: typeof SetPlayerCoordinates = _G.setPlayerCoordinates;

/** Получает угол камеры игрока */
declare function GetCameraFrontVector(): LuaMultiReturn<[number, number, number]>;
export const getCameraFrontVector: typeof GetCameraFrontVector = _G.getCameraFrontVector;

/** Получает позицию камеры */
declare function GetCameraCoordinates(): LuaMultiReturn<[number, number, number]>;
export const getCameraCoordinates: typeof GetCameraCoordinates = _G.getCameraCoordinates;

/** Устанавливает позицию камеры */
declare function SetCameraPosition(x: number, y: number, z: number): void;
export const setCameraPosition: typeof SetCameraPosition = _G.setCameraPosition;

/** Направляет камеру на точку */
declare function PointCameraAtPoint(
  x: number,
  y: number,
  z: number,
  switchStyle: number
): void;
export const pointCameraAtPoint: typeof PointCameraAtPoint = _G.pointCameraAtPoint;

/** Направляет камеру на персонажа */
declare function PointCameraAtChar(ped: PedHandle, mode: number, switchStyle: number): void;
export const pointCameraAtChar: typeof PointCameraAtChar = _G.pointCameraAtChar;

/** Восстанавливает камеру за игроком */
declare function RestoreCameraJumpcut(): void;
export const restoreCameraJumpcut: typeof RestoreCameraJumpcut = _G.restoreCameraJumpcut;

/** Устанавливает управление игроком */
declare function SetPlayerControl(playerId: number, state: boolean): void;
export const setPlayerControl: typeof SetPlayerControl = _G.setPlayerControl;

/** Получает деньги игрока */
declare function GetPlayerMoney(playerId: number): number;
export const getPlayerMoney: typeof GetPlayerMoney = _G.getPlayerMoney;

/** Устанавливает деньги игроку */
declare function SetPlayerMoney(playerId: number, money: number): void;
export const setPlayerMoney: typeof SetPlayerMoney = _G.setPlayerMoney;

/** Добавляет деньги игроку */
declare function AddToPlayerMoney(playerId: number, money: number): void;
export const addToPlayerMoney: typeof AddToPlayerMoney = _G.addToPlayerMoney;

/** Получает уровень розыска */
declare function GetPlayerWantedLevel(playerId: number): number;
export const getPlayerWantedLevel: typeof GetPlayerWantedLevel = _G.getPlayerWantedLevel;

/** Устанавливает уровень розыска */
declare function AlterWantedLevel(playerId: number, level: number): void;
export const alterWantedLevel: typeof AlterWantedLevel = _G.alterWantedLevel;

/** Очищает уровень розыска */
declare function ClearWantedLevel(playerId: number): void;
export const clearWantedLevel: typeof ClearWantedLevel = _G.clearWantedLevel;

/** Устанавливает максимальный уровень розыска */
declare function SetMaxWantedLevel(level: number): void;
export const setMaxWantedLevel: typeof SetMaxWantedLevel = _G.setMaxWantedLevel;

/** Проверяет, свободен ли игрок для миссии */
declare function IsPlayerPlayingAsChar(playerId: number): boolean;
export const isPlayerPlayingAsChar: typeof IsPlayerPlayingAsChar = _G.isPlayerPlayingAsChar;

/** Проверяет, жив ли игрок */
declare function IsPlayerDead(playerId: number): boolean;
export const isPlayerDead: typeof IsPlayerDead = _G.isPlayerDead;
