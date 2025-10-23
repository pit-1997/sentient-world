export type Point = {
  x: number;
  y: number;
  z: number;
};

export interface IGeometry {
  /** Возвращает дистанцию между точками */
  getDistance: (pointA: Point, pointB: Point) => number;
}
