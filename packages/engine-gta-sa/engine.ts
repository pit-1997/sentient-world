import type {
  ActorConstructorOptions,
  Events,
  IEngine,
  IThread,
  Key,
  ThreadFunction,
  Time,
} from '@sentient-world/engine';

import { EventEmitter } from '@sentient-world/event-emitter';
import {
  addEventHandler,
  getTimeOfDay,
  setTimeOfDay,
  wasKeyPressed,
  type VKey,
} from '@sentient-world/moonloader';

import * as vkeys from 'vkeys';

import { Actor } from './actor';
import { Thread } from './thread';

export class Engine implements IEngine {
  readonly events: EventEmitter<Events>;

  constructor() {
    this.events = new EventEmitter<Events>();
    this.listenTerminate();
    this.listenTick();
    this.listenKeydown();
  }

  createActor(options: ActorConstructorOptions) {
    const characterHandle = Actor.createNpc(options);
    this.events.on('terminate', () => characterHandle.destroy());

    return characterHandle;
  }

  createThread<Args extends unknown[] = []>(
    fn: ThreadFunction<Args>,
    ...args: Args
  ): IThread<Args> {
    const thread = new Thread<Args>((...subArgs) => fn(...subArgs));
    thread.run(...args);
    return thread;
  }

  getPlayerActor() {
    return Actor.getPlayerHandle();
  }

  getTime() {
    const [hours, minutes] = getTimeOfDay();

    return { hours, minutes };
  }

  setTime(time: Time) {
    setTimeOfDay(time.hours, time.minutes);
  }

  private listenTerminate() {
    addEventHandler('onScriptTerminate', () => this.events.emit('terminate'));
  }

  private listenTick() {
    const emitTick = () => this.events.emit('tick');

    this.createThread(function* () {
      while (true) {
        yield 16;
        emitTick();
      }
    });
  }

  private listenKeydown() {
    const keys: Record<Key, VKey> = { N: vkeys.VK_N, Y: vkeys.VK_Y };
    const keyPairs = Object.entries(keys) as [key: Key, vKey: VKey][];

    this.events.on('tick', () => {
      keyPairs.forEach(([key, vKey]) => {
        if (wasKeyPressed(vKey)) {
          this.events.emit('keydown', key);
        }
      });
    });
  }
}
