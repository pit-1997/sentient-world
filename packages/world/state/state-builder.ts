import type { Point, Position } from '@sentient-world/engine';

import type { DateTime } from '../date-time';

import type { State } from './types';

export class StateBuilder {
  private state: State;

  constructor(state: State) {
    this.state = state;
  }

  static of(state: State) {
    return new StateBuilder(state);
  }

  withWorldDateTime(dateTime: DateTime): this {
    this.state = {
      ...this.state,
      world: {
        ...this.state.world,
        dateTime,
      },
    };
    return this;
  }

  withCharacterSpawn(spawn: Position): this {
    this.state = {
      ...this.state,
      character: {
        ...this.state.character,
        data: {
          ...this.state.character.data,
          spawn,
        },
      },
    };
    return this;
  }

  withCharacterPosition(position: Position): this {
    this.state = {
      ...this.state,
      character: {
        ...this.state.character,
        position,
      },
    };
    return this;
  }

  withCharacterAtSpawn(offset: Point = { x: 0, y: 0, z: 0 }) {
    const spawn = this.state.character.data.spawn;
    this.state = {
      ...this.state,
      character: {
        ...this.state.character,
        position: {
          x: spawn.x + offset.x,
          y: spawn.y + offset.y,
          z: spawn.z + offset.z,
          angle: spawn.angle,
        },
      },
    };
    return this;
  }

  build(): State {
    return this.state;
  }
}
