import type { Point } from './geometry';

export type Time = {
  /** Часы от 0 до 23 */
  hours: number;

  /** Минуты от 0 до 59 */
  minutes: number;
};

type Key = 'N' | 'Y';

type Events = {
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
  /** Позволяет навесить обработчик на одно из событий движка */
  on: <EN extends EventName>(eventName: EN, callback: Callback<EN>) => void;

  /** Позволяет навесить обработчик на одно из событий движка. Обработчик выполнится только один раз */
  once: <EN extends EventName>(eventName: EN, callback: Callback<EN>) => void;

  /** Отвязать обработчик события */
  off: <EN extends EventName>(eventName: EN, callback: Callback<EN>) => void;

  /** Создаёт персонажа */
  createCharacterHandle: (options: CharacterHandleConstructorOptions) => ICharacterHandle;

  /** Возвращает время в мире игры */
  getTime: () => Time;
}

export type CharacterHandleConstructorOptions = {
  /** Угол поворота при спавне */
  angle: number;

  /** ID модели персонажа */
  modelId: number;

  /** Позиция при спавне */
  point: Point;
};

export interface ICharacterHandle {
  /** Функция, которая должна вызваться при удалении персонажа из игры */
  destroy: () => void;

  /** Возвращает угол поворота персонажа */
  getAngle: () => number;

  /** Устанавливает персонажу угол поворота */
  setAngle: (angle: number) => void;

  /** Возвращает положение персонажа */
  getPoint: () => Point;

  /** Устанавливает позицию персонажа */
  setPoint: (point: Point) => void;

  /** Заставляет персонажа достичь определённого угла поворота */
  taskAchieveAngle: (angle: number) => void;

  /** Отменяет текущие задачи персонажа */
  taskClear: () => void;

  /** Заставляет персонажа идти на указанную точку */
  taskGoToPoint: (point: Point) => void;
}
