import type { EventEmitter } from '@sentient-world/event-emitter';

import type { Point } from './geometry';

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

export type ThreadStatus = 'dead' | 'suspended' | 'running' | 'yielded' | 'error';

export type ThreadFunction<Args extends unknown[]> = (thread: IThread<Args>, ...args: Args) => void;

/**
 * Поток выполнения
 */
export interface IThread<Args extends unknown[]> {
  /**
   * Запустить поток с начала
   */
  run(...args: Args): void;

  /**
   * Принудительно завершить поток
   */
  terminate(): void;

  /**
   * Получить текущий статус потока
   */
  status(): ThreadStatus;

  /**
   * Приостановить выполнение текущего потока
   * @param timeInMs - время приостановки в миллисекундах
   */
  wait(timeInMs: number): void;

  /**
   * Проверить завершён ли поток
   */
  readonly dead: boolean;

  /**
   * Определяет выполнение потока во время паузы игры
   */
  workInPause: boolean;
}

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
  /** Угол поворота при спавне */
  angle: number;

  /** ID модели персонажа */
  modelId: number;

  /** Позиция при спавне */
  point: Point;
};

export interface IActor {
  /** Функция, которая должна вызваться при удалении персонажа из игры */
  destroy(): void;

  /** Возвращает угол поворота персонажа */
  getAngle(): number;

  /** Устанавливает персонажу угол поворота */
  setAngle(angle: number): void;

  /** Возвращает положение персонажа */
  getPoint(): Point;

  /** Устанавливает позицию персонажа */
  setPoint(point: Point): void;

  /** Заставляет персонажа достичь определённого угла поворота */
  taskAchieveAngle(angle: number): void;

  /** Отменяет текущие задачи персонажа */
  taskClear(): void;

  /** Заставляет персонажа идти на указанную точку */
  taskGoToPoint(point: Point): void;

  /** Заставляет персонажа бесцельно бродить */
  taskWander(): void;
}
