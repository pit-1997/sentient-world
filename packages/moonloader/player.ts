import type { PedHandle } from './handles';

/** Получает персонажа игрока */
export declare function getPlayerChar(playerId: number): PedHandle;

/** Получает ID игрока */
export declare function getPlayerId(): number;

/** Получает координаты игрока */
export declare function getActivePlayerCoords(): LuaMultiReturn<[number, number, number]>;

/** Устанавливает координаты игрока */
export declare function setPlayerCoordinates(
  playerId: number,
  x: number,
  y: number,
  z: number
): void;

/** Получает угол камеры игрока */
export declare function getCameraFrontVector(): LuaMultiReturn<[number, number, number]>;

/** Получает позицию камеры */
export declare function getCameraCoordinates(): LuaMultiReturn<[number, number, number]>;

/** Устанавливает позицию камеры */
export declare function setCameraPosition(x: number, y: number, z: number): void;

/** Направляет камеру на точку */
export declare function pointCameraAtPoint(
  x: number,
  y: number,
  z: number,
  switchStyle: number
): void;

/** Направляет камеру на персонажа */
export declare function pointCameraAtChar(ped: PedHandle, mode: number, switchStyle: number): void;

/** Восстанавливает камеру за игроком */
export declare function restoreCameraJumpcut(): void;

/** Устанавливает управление игроком */
export declare function setPlayerControl(playerId: number, state: boolean): void;

/** Получает деньги игрока */
export declare function getPlayerMoney(playerId: number): number;

/** Устанавливает деньги игроку */
export declare function setPlayerMoney(playerId: number, money: number): void;

/** Добавляет деньги игроку */
export declare function addToPlayerMoney(playerId: number, money: number): void;

/** Получает уровень розыска */
export declare function getPlayerWantedLevel(playerId: number): number;

/** Устанавливает уровень розыска */
export declare function alterWantedLevel(playerId: number, level: number): void;

/** Очищает уровень розыска */
export declare function clearWantedLevel(playerId: number): void;

/** Устанавливает максимальный уровень розыска */
export declare function setMaxWantedLevel(level: number): void;

/** Проверяет, свободен ли игрок для миссии */
export declare function isPlayerPlayingAsChar(playerId: number): boolean;

/** Проверяет, жив ли игрок */
export declare function isPlayerDead(playerId: number): boolean;
