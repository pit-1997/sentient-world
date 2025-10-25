import type { IGeometry, Point } from '@sentient-world/engine';

import { getDistanceBetweenCoords3d } from '@sentient-world/moonloader';

export class Geometry implements IGeometry {
  getDistance(pointA: Point, pointB: Point) {
    return getDistanceBetweenCoords3d(pointA.x, pointA.y, pointA.z, pointB.x, pointB.y, pointB.z);
  }
}
