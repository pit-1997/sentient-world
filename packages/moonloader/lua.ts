declare const _G: any;

/** Класс для работы с Lua потоками в MoonLoader */
declare class LuaThread<Args extends unknown[]> {
  /** Создаёт новый поток и сразу же запускает его с указанными параметрами */
  static create<Args extends unknown[] = []>(
    thread: (...args: Args) => void,
    ...args: Args
  ): LuaThread<Args>;
  
  /** Создаёт новый поток в состоянии ожидания запуска */
  static create_suspended<Args extends unknown[] = []>(
    thread: (...args: Args) => void
  ): LuaThread<Args>;
  
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

// Реэкспорт класса из _G
export const lua_thread = _G.lua_thread as typeof LuaThread;
