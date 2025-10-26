import type { IActor, IEngine, IGeometry, Point, Time } from '@sentient-world/engine';
import type { IContext } from '@sentient-world/htn';

export type SentientWorldState = {
  world: {
    time: Time;
  };
  character: {
    location: Point;
    spawn: Point;
  };
};

export type SentientWorldContext = IContext<SentientWorldState> & {
  services: {
    actor: IActor;
    engine: IEngine;
    geometry: IGeometry;
  };
};
