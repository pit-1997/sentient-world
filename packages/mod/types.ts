import type { Point, Time } from '@sentient-world/engine';

export type SentientWorldState = {
  world: {
    time: Time;
  };
  character: {
    location: Point;
    spawn: Point;
  };
};
