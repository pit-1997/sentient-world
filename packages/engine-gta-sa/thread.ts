import type { IThread, ThreadFunction, ThreadStatus } from '@sentient-world/engine';
import { lua_thread, type LuaThread, wait } from '@sentient-world/moonloader';

export class Thread<Args extends unknown[]> implements IThread<Args> {
  private readonly thread: LuaThread<Args>;

  constructor(fn: ThreadFunction<Args>) {
    this.thread = lua_thread.create_suspended<Args>((...subArgs: Args) => fn(this, ...subArgs));
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

  wait(timeInMs: number): void {
    wait(timeInMs);
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
