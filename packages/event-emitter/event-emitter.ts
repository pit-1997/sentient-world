export type EventName<T> = keyof T & string;

export type EventCallback<T, E extends EventName<T>> = T[E] extends (...args: infer Args) => infer R
  ? (...args: Args) => R
  : never;

/**
 * Обёртка над callback для отслеживания оригинального обработчика
 */
type ListenerEntry<T, E extends EventName<T>> = {
  /** Функция которая будет вызвана (может быть wrapper для once) */
  handler: EventCallback<T, E>;
  /** Оригинальный callback переданный пользователем */
  original: EventCallback<T, E>;
};

type Listeners<T> = {
  [E in EventName<T>]?: ListenerEntry<T, E>[];
};

/**
 * Типизированный EventEmitter для управления событиями
 * @template T - Тип объекта с определениями событий
 * @example
 * ```ts
 * type Events = {
 *   start: () => void;
 *   tick: (n: number) => string;
 * };
 *
 * const emitter = new EventEmitter<Events>();
 * emitter.on('tick', (n) => `Tick ${n}`);
 * emitter.emit('tick', 42);
 * ```
 */
export class EventEmitter<T> {
  private readonly listeners: Listeners<T> = {};

  /**
   * Подписаться на событие
   * @template E - Имя события из типа T
   * @param eventName - Название события
   * @param callback - Функция-обработчик события
   */
  on<E extends EventName<T>>(eventName: E, callback: EventCallback<T, E>): void {
    const eventListeners = this.listeners[eventName];

    const entry: ListenerEntry<T, E> = {
      handler: callback,
      original: callback,
    };

    if (!eventListeners) {
      this.listeners[eventName] = [entry];
      return;
    }

    eventListeners.push(entry);
  }

  /**
   * Подписаться на событие один раз. После первого вызова обработчик автоматически отписывается от события
   * @template E - Имя события из типа T
   * @param eventName - Название события
   * @param callback - Функция-обработчик события
   */
  once<E extends EventName<T>>(eventName: E, callback: EventCallback<T, E>): void {
    const wrapper = ((...args: Parameters<EventCallback<T, E>>) => {
      this.off(eventName, callback);
      return callback(...args);
    }) as EventCallback<T, E>;

    const eventListeners = this.listeners[eventName];

    const entry: ListenerEntry<T, E> = {
      handler: wrapper,
      original: callback,
    };

    if (!eventListeners) {
      this.listeners[eventName] = [entry];
      return;
    }

    eventListeners.push(entry);
  }

  /**
   * Отписаться от события
   * @template E - Имя события из типа T
   * @param eventName - Название события
   * @param callback - Функция-обработчик, которую нужно удалить
   */
  off<E extends EventName<T>>(eventName: E, callback: EventCallback<T, E>): void {
    const eventListeners = this.listeners[eventName];

    if (!eventListeners) {
      return;
    }

    const filtered = eventListeners.filter((entry) => entry.original !== callback);
    this.listeners[eventName] = filtered;
  }

  /**
   * Вызвать все обработчики события
   * @template E - Имя события из типа T
   * @param eventName - Название события
   * @param args - Аргументы, передаваемые в обработчики
   * @returns Массив результатов выполнения всех обработчиков
   */
  emit<E extends EventName<T>>(
    eventName: E,
    ...args: Parameters<EventCallback<T, E>>
  ): ReturnType<EventCallback<T, E>>[] {
    const eventListeners = this.listeners[eventName];

    if (!eventListeners) {
      return [];
    }

    return eventListeners.map((entry) => entry.handler(...args)) as ReturnType<
      EventCallback<T, E>
    >[];
  }
}
