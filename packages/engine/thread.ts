export type ThreadStatus = 'dead' | 'suspended' | 'running' | 'yielded' | 'error';

export type ThreadFunction<Args extends unknown[]> = (
  ...args: Args
) => Generator<number, void, void>;

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
   * Проверить завершён ли поток
   */
  readonly dead: boolean;

  /**
   * Определяет выполнение потока во время паузы игры
   */
  workInPause: boolean;
}
