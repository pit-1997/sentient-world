import type { IGeometry, Point } from '../geometry';

export class Geometry implements IGeometry {
  getDistance(pointA: Point, pointB: Point): number {
    const dx = pointB.x - pointA.x;
    const dy = pointB.y - pointA.y;
    const dz = pointB.z - pointA.z;

    return Math.sqrt(dx * dx + dy * dy + dz * dz);
  }
}
