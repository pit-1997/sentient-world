/**
 * Интерфейс событий MoonLoader
 */
export type Events = {
  /** Вызывается при завершении скрипта */
  onScriptTerminate: () => void;
  /** Вызывается каждый кадр */
  onFrame: () => void;
  /** Вызывается при отправке сообщения в чат */
  onSendChat: (message: string) => LuaMultiReturn<[boolean?, string?]>;
  /** Вызывается при получении сообщения из чата */
  onReceiveChat: (message: string) => LuaMultiReturn<[boolean?, string?]>;
  /** Вызывается при отправке команды */
  onSendCommand: (command: string) => boolean;
  /** Вызывается при получении RPC */
  onReceiveRpc: (rpcId: number, bitStream: unknown) => boolean;
  /** Вызывается при отправке RPC */
  onSendRpc: (rpcId: number, bitStream: unknown) => boolean;
  /** Вызывается при отправке пакета */
  onSendPacket: (packetId: number, bitStream: unknown) => boolean;
  /** Вызывается при получении пакета */
  onReceivePacket: (packetId: number, bitStream: unknown) => boolean;
  /** Вызывается при получении сообщения через print */
  onScriptMessage: (message: string) => void;
  /** Вызывается при смерти игрока */
  onPlayerDeath: (killerId: number, reason: number) => void;
  /** Вызывается при спавне игрока */
  onPlayerSpawn: () => void;
  /** Вызывается при входе в транспорт */
  onVehicleEnter: (vehicleId: number) => void;
  /** Вызывается при выходе из транспорта */
  onVehicleExit: (vehicleId: number) => void;
  /** Вызывается при изменении интерьера */
  onInteriorChanged: (interiorId: number) => void;
  /** Вызывается при нажатии клавиши */
  onWindowMessage: (
    msg: number,
    wparam: number,
    lparam: number
  ) => LuaMultiReturn<[number?, boolean?]>;
};

export type EventCallback<Event extends keyof Events> = (
  ...args: Parameters<Events[Event]>
) => ReturnType<Events[Event]>;

/**
 * Интерфейс функций для работы с событиями в MoonLoader
 */
interface EventsGlobal {
  /** Добавляет обработчик события */
  addEventHandler<Event extends keyof Events>(
    this: void,
    event: Event,
    callback: EventCallback<Event>
  ): void;
}

declare const _G: EventsGlobal;

export const { addEventHandler } = _G;
