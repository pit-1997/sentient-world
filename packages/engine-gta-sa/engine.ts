import type {
  CharacterHandleConstructorOptions,
  Events,
  IEngine,
  Key,
} from '@sentient-world/engine';

import { EventEmitter } from '@sentient-world/event-emitter';
import {
  addEventHandler,
  getTimeOfDay,
  wait,
  wasKeyPressed,
  type VKey,
} from '@sentient-world/moonloader';

import * as vkeys from 'vkeys';

import { CharacterHandle } from './character-handle';

export class Engine implements IEngine {
  readonly events: EventEmitter<Events>;

  constructor() {
    this.events = new EventEmitter<Events>();
    this.listenTerminate();
    this.listenTick();
    this.listenKeydown();
  }

  createCharacterHandle(options: CharacterHandleConstructorOptions) {
    const characterHandle = new CharacterHandle(this, options);

    return characterHandle;
  }

  getTime() {
    const [hours, minutes] = getTimeOfDay();

    return { hours, minutes };
  }

  private listenTerminate() {
    addEventHandler('onScriptTerminate', () => this.events.emit('terminate'));
  }

  private listenTick() {
    while (true) {
      wait(0);
      this.events.emit('tick');
    }
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
