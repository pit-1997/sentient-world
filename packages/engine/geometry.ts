export type Point = {
  x: number;
  y: number;
  z: number;
};

export type Position = Point & {
  angle: number; // угол поворота чего-либо в пространстве
};

export interface IGeometry {
  /** Возвращает дистанцию между точками */
  getDistance: (pointA: Point, pointB: Point) => number;
}
