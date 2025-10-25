import type {
  CharacterHandleConstructorOptions,
  ICharacterHandle,
  Point,
} from '@sentient-world/engine';

import {
  clearCharTasks,
  createChar,
  deleteChar,
  doesCharExist,
  dontRemoveChar,
  getCharCoordinates,
  getCharHeading,
  loadAllModelsNow,
  markModelAsNoLongerNeeded,
  PedType,
  PLAYER_PED,
  requestModel,
  setCharCoordinates,
  setCharHeading,
  setLoadCollisionForCharFlag,
  taskAchieveHeading,
  taskGoStraightToCoord,
  taskWanderStandard,
  type PedHandle,
} from '@sentient-world/moonloader';

export class CharacterHandle implements ICharacterHandle {
  private readonly ped: PedHandle;

  /** Создаёт игрового персонажа, возвращает его модель */
  static createNpc(options: CharacterHandleConstructorOptions) {
    requestModel(options.modelId);
    loadAllModelsNow();

    const { x, y, z } = options.point;
    const ped = createChar(PedType.CIVMALE, options.modelId, x, y, z);
    setCharHeading(ped, options.angle);
    setLoadCollisionForCharFlag(ped, true);
    dontRemoveChar(ped);

    markModelAsNoLongerNeeded(options.modelId);

    return new CharacterHandle(ped);
  }

  /** Возвращает модель персонажа игрока */
  static getPlayerHandle() {
    return new CharacterHandle(PLAYER_PED);
  }

  constructor(ped: PedHandle) {
    this.ped = ped;
  }

  destroy() {
    if (doesCharExist(this.ped)) {
      deleteChar(this.ped);
    }
  }

  getAngle() {
    return getCharHeading(this.ped);
  }

  setAngle(angle: number) {
    return setCharHeading(this.ped, angle);
  }

  getPoint() {
    const [x, y, z] = getCharCoordinates(this.ped);

    return { x, y, z };
  }

  setPoint(point: Point) {
    setCharCoordinates(this.ped, point.x, point.y, point.z);
  }

  taskAchieveAngle(angle: number) {
    taskAchieveHeading(this.ped, angle);
  }

  taskClear() {
    clearCharTasks(this.ped);
  }

  taskGoToPoint(point: Point) {
    taskGoStraightToCoord(this.ped, point.x, point.y, point.z, 4, 0);
  }

  taskWander(): void {
    taskWanderStandard(this.ped);
  }
}
