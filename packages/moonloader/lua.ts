export declare class lua_thread<Args extends unknown[]> {
  /** Создаёт новый поток и сразу же запускает его с указанными параметрами */
  static create<Args extends unknown[] = []>(
    thread: (...args: Args) => void,
    ...args: Args
  ): lua_thread<Args>;
  /** Создаёт новый поток в состоянии ожидания запуска */
  static create_suspended<Args extends unknown[] = []>(
    thread: (...args: Args) => void
  ): lua_thread<Args>;
  /** Выполняет замороженный, выполняющийся или завершённый поток с начала */
  run(...args: Args): void;
  /** Принудительно завершает поток */
  terminate(): void;
  /** Возвращает статус потока */
  status(): 'dead' | 'suspended' | 'running' | 'yielded' | 'error';
  /** Определяет статус завершённости потока */
  readonly dead: boolean;
  /** Определяет исполнение потока во время паузы игры */
  work_in_pause: boolean;
}
