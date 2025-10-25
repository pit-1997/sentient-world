import type {
  CharacterHandleConstructorOptions,
  Events,
  IEngine,
  IThread,
  Key,
  ThreadFunction,
} from '@sentient-world/engine';

import { EventEmitter } from '@sentient-world/event-emitter';
import {
  addEventHandler,
  getTimeOfDay,
  wasKeyPressed,
  type VKey,
} from '@sentient-world/moonloader';

import * as vkeys from 'vkeys';

import { CharacterHandle } from './character-handle';
import { Thread } from './thread';

export class Engine implements IEngine {
  readonly events: EventEmitter<Events>;

  constructor() {
    this.events = new EventEmitter<Events>();
    this.listenTerminate();
    this.listenTick();
    this.listenKeydown();
  }

  createCharacterHandle(options: CharacterHandleConstructorOptions) {
    const characterHandle = CharacterHandle.createNpc(options);
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

  getPlayerCharacterHandle() {
    return CharacterHandle.getPlayerHandle();
  }

  getTime() {
    const [hours, minutes] = getTimeOfDay();

    return { hours, minutes };
  }

  private listenTerminate() {
    addEventHandler('onScriptTerminate', () => this.events.emit('terminate'));
  }

  private listenTick() {
    this.createThread((thread) => {
      while (true) {
        thread.wait(16);
        this.events.emit('tick');
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
