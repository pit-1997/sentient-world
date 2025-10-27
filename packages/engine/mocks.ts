import { EventEmitter } from '@sentient-world/event-emitter';

import type { Events, IActor, IEngine, IThread, ThreadFunction, ThreadStatus } from '../engine';

export function createMockedEngine(): IEngine {
  return {
    events: new EventEmitter<Events>(),
    createActor: () => createMockedActor(),
    createThread: createMockedThread,
    getPlayerActor: () => createMockedActor(),
    getTime: () => ({ hours: 0, minutes: 0 }),
    setTime: () => {},
  };
}

export function createMockedActor(): IActor {
  return {
    destroy: () => {},
    getAngle: () => 0,
    setAngle: () => {},
    getPoint: () => ({ x: 0, y: 0, z: 0 }),
    setPoint: () => {},
    getPosition: () => ({ angle: 0, x: 0, y: 0, z: 0 }),
    setPosition: () => {},
    taskAchieveAngle: () => {},
    taskGoToPoint: () => {},
    taskClear: () => {},
    taskWander: () => {},
  };
}

export function createMockedThread<Args extends unknown[]>(
  fn: ThreadFunction<Args>,
  ...args: Args
): IThread<Args> {
  let status: ThreadStatus = 'suspended';

  const thread: IThread<Args> = {
    run: (...args: Args) => {
      status = 'running';
      fn(thread, ...args);
    },
    terminate: () => {
      status = 'yielded';
    },
    status: () => status,
    wait: () => {},
    dead: false,
    workInPause: false,
  };

  thread.run(...args);

  return thread;
}
