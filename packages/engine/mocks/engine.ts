import { EventEmitter } from '@sentient-world/event-emitter';

import type { IThread, ThreadFunction } from '../thread';
import type { ActorConstructorOptions, Events, IEngine, Time } from '../types';

import { MockedActor } from './actor';
import { MockedThread } from './thread';

export class MockedEngine implements IEngine {
  events = new EventEmitter<Events>();

  private createdActors: MockedActor[] = [];
  private time: Time = { hours: 0, minutes: 0 };
  private threads: MockedThread<unknown[]>[] = [];

  createActor(options: ActorConstructorOptions) {
    const actor = new MockedActor(options);
    this.createdActors.push(actor);
    return actor;
  }

  createThread<Args extends unknown[]>(fn: ThreadFunction<Args>, ...args: Args): IThread<Args> {
    const thread = new MockedThread(fn);
    this.threads.push(thread as MockedThread<unknown[]>);
    thread.run(...args);
    return thread;
  }

  getPlayerActor() {
    return new MockedActor({
      modelId: 0,
      position: { angle: 0, x: 0, y: 0, z: 0 },
    });
  }

  getTime() {
    return this.time;
  }

  setTime(time: Time) {
    this.time = time;
  }

  /**
   * Продвигает время потоков на указанное количество миллисекунд
   * @param ms количество миллисекунд для промотки
   */
  resumeThreads(ms: number) {
    this.threads.forEach((thread) => thread.resume(ms));
  }

  /** Возвращает массив созданных акторов */
  getCreatedActors(): MockedActor[] {
    return this.createdActors;
  }
}
