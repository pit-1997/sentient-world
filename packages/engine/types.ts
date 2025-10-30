import type { EventEmitter } from '@sentient-world/event-emitter';

import type { Point, Position } from './geometry';
import type { IThread, ThreadFunction } from './thread';

export type Time = {
  /** Часы от 0 до 23 */
  hours: number;

  /** Минуты от 0 до 59 */
  minutes: number;
};

export type Key = 'N' | 'Y';

export type Events = {
  /** Была ли нажата клавиша */
  keydown: (key: Key) => void;

  /** Слушатель завершения работы системы */
  terminate: () => void;

  /** Вызывается на каждый такт игры */
  tick: () => void;
};

export type EventName = keyof Events;

export type Callback<EN extends EventName> = (...args: Parameters<Events[EN]>) => void;

export interface IEngine {
  events: EventEmitter<Events>;

  /** Создаёт персонажа */
  createActor(options: ActorConstructorOptions): IActor;

  /**
   * Создать и сразу запустить новый поток
   * @param fn - функция, которая будет выполняться в потоке
   * @param args - параметры, которые будут передаваться в тред
   * @returns созданный поток
   */
  createThread<Args extends unknown[] = []>(fn: ThreadFunction<Args>, ...args: Args): IThread<Args>;

  /** Возвращает модель персонажа игрока */
  getPlayerActor(): IActor;

  /** Возвращает время в мире игры */
  getTime(): Time;

  /** Устанавливает время в мире игры */
  setTime(time: Time): void;
}

export type ActorConstructorOptions = {
  /** ID модели персонажа */
  modelId: number;

  /** Позиция при спавне */
  position: Position;
};

export interface IActor {
  /** Функция, которая должна вызваться при удалении персонажа из игры */
  destroy(): void;

  /** Возвращает угол поворота персонажа */
  getAngle(): number;

  /** Устанавливает персонажу угол поворота */
  setAngle(angle: number): void;

  /** Возвращает расположение персонажа */
  getPoint(): Point;

  /** Устанавливает расположение персонажа */
  setPoint(point: Point): void;

  /** Возвращает позицию персонажа */
  getPosition(): Position;

  /** Устанавливает позицию персонажа */
  setPosition(position: Position): void;

  /** Заставляет персонажа достичь определённого угла поворота */
  taskAchieveAngle(angle: number): void;

  /** Отменяет текущие задачи персонажа */
  taskClear(): void;

  /** Заставляет персонажа идти на указанную точку */
  taskGoToPoint(point: Point): void;

  /** Заставляет персонажа бесцельно бродить */
  taskWander(): void;
}
