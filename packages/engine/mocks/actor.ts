import type { Point, Position } from '../geometry';
import type { ActorConstructorOptions, IActor } from '../types';

export class MockedActor implements IActor {
  private angle: number;
  private point: Point;

  constructor(options: ActorConstructorOptions) {
    this.angle = options.position.angle;
    this.point = { x: options.position.x, y: options.position.y, z: options.position.z };
  }

  destroy() {}

  getAngle() {
    return this.angle;
  }

  setAngle(angle: number) {
    this.angle = angle;
  }

  getPoint() {
    return this.point;
  }

  setPoint(point: Point) {
    this.point = point;
  }

  getPosition() {
    return {
      ...this.getPoint(),
      angle: this.angle,
    };
  }

  setPosition(position: Position) {
    this.angle = position.angle;
    this.setPoint({ x: position.x, y: position.y, z: position.z });
  }

  taskAchieveAngle() {
    this.setAngle(this.angle);
  }

  taskGoToPoint(point: Point) {
    this.setPoint(point);
  }

  taskClear() {}
  taskWander() {}
}
