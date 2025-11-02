import type { IThread, ThreadFunction, ThreadStatus } from '@sentient-world/engine';
import { lua_thread, wait, type LuaThread } from '@sentient-world/moonloader';

export class Thread<Args extends unknown[]> implements IThread<Args> {
  private readonly thread: LuaThread<Args>;
  private readonly threadFn: ThreadFunction<Args>;

  constructor(threadFn: ThreadFunction<Args>) {
    this.threadFn = threadFn;

    // Создаём suspended поток, который преобразует генератор в lua-функцию
    this.thread = lua_thread.create_suspended<Args>((...args: Args) => {
      const gen = this.threadFn(...args);
      let result = gen.next();

      while (!result.done) {
        wait(result.value);
        result = gen.next();
      }
    });
  }

  run(...args: Args): void {
    this.thread.run(...args);
  }

  terminate(): void {
    this.thread.terminate();
  }

  status(): ThreadStatus {
    return this.thread.status();
  }

  get dead(): boolean {
    return this.thread.dead;
  }

  get workInPause(): boolean {
    return this.thread.work_in_pause;
  }

  set workInPause(value: boolean) {
    this.thread.work_in_pause = value;
  }
}
