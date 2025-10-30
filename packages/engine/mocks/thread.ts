import type { IThread, ThreadFunction, ThreadStatus } from '../thread';

export class MockedThread<Args extends unknown[]> implements IThread<Args> {
  private statusInternal: ThreadStatus = 'suspended';
  private generator: Generator<number, void, void> | null = null;
  private readonly threadFn: ThreadFunction<Args>;
  private pendingWait: number = 0;

  workInPause: boolean = false;

  constructor(threadFn: ThreadFunction<Args>) {
    this.threadFn = threadFn;
  }

  run(...args: Args): void {
    if (this.statusInternal === 'dead') {
      throw new Error('Cannot run a dead thread');
    }

    if (this.statusInternal === 'running' || this.statusInternal === 'yielded') {
      throw new Error('Thread is already running');
    }

    this.generator = this.threadFn(...args);
    this.statusInternal = 'running';

    this.step();
  }

  private step(): void {
    if (!this.generator || this.statusInternal !== 'running') {
      return;
    }

    const result = this.generator.next();

    if (result.done) {
      this.statusInternal = 'dead';
      this.generator = null;
      this.pendingWait = 0;
      return;
    }

    const waitTime = result.value;

    if (typeof waitTime !== 'number' || waitTime < 0) {
      this.statusInternal = 'error';
      this.generator = null;
      this.pendingWait = 0;
      throw new Error(`Invalid wait time: ${waitTime}`);
    }

    this.statusInternal = 'yielded';
    this.pendingWait = waitTime;
  }

  /**
   * Продвинуть время потока на указанное количество миллисекунд
   * @param ms количество миллисекунд для промотки
   */
  resume(ms: number): void {
    if (this.statusInternal === 'dead' || this.statusInternal === 'error') {
      return;
    }

    if (this.statusInternal !== 'yielded') {
      return;
    }

    this.pendingWait -= ms;

    if (this.pendingWait > 0) {
      return;
    }

    this.pendingWait = 0;
    this.statusInternal = 'running';
    this.step();
  }

  terminate(): void {
    if (this.statusInternal === 'dead' || this.statusInternal === 'error') {
      return;
    }

    this.statusInternal = 'dead';
    this.generator = null;
    this.pendingWait = 0;
  }

  status(): ThreadStatus {
    return this.statusInternal;
  }

  get dead(): boolean {
    return this.statusInternal === 'dead' || this.statusInternal === 'error';
  }
}
