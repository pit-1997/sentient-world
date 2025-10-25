import type {
  CharacterHandleConstructorOptions,
  ICharacterHandle,
  IEngine,
  Point,
} from '@sentient-world/engine';

import {
  clearCharTasks,
  createChar,
  deleteChar,
  doesCharExist,
  dontRemoveChar,
  freezeCharPosition,
  getCharCoordinates,
  getCharHeading,
  loadAllModelsNow,
  markModelAsNoLongerNeeded,
  PedType,
  PLAYER_PED,
  requestModel,
  setCharCollision,
  setCharCoordinates,
  setCharHeading,
  setCharNeverTargetted,
  setCharProofs,
  setCharVisible,
  setLoadCollisionForCharFlag,
  taskAchieveHeading,
  taskGotoChar,
  taskWanderStandard,
  type PedHandle,
} from '@sentient-world/moonloader';

export class CharacterHandle implements ICharacterHandle {
  private readonly engine: IEngine;
  private readonly modelId: number;
  private readonly ped: PedHandle;

  /** Создаёт игрового персонажа, возвращает его модель */
  static createNpc(engine: IEngine, options: CharacterHandleConstructorOptions) {
    requestModel(options.modelId);
    loadAllModelsNow();

    const { x, y, z } = options.point;
    const ped = createChar(PedType.CIVMALE, options.modelId, x, y, z);
    setCharHeading(ped, options.angle);
    setLoadCollisionForCharFlag(ped, true);
    dontRemoveChar(ped);

    markModelAsNoLongerNeeded(options.modelId);

    return new CharacterHandle(engine, options.modelId, ped);
  }

  /** Возвращает модель персонажа игрока */
  static createPlayerHandle(engine: IEngine) {
    const CJ_MODEL = 0;
    return new CharacterHandle(engine, CJ_MODEL, PLAYER_PED);
  }

  constructor(engine: IEngine, modelId: number, ped: PedHandle) {
    this.engine = engine;
    this.modelId = modelId;
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
    // TODO: Избавиться от вспомогательного персонажа и заставлять текущего персонажа бежать например к объекту
    // Только путём создания вспомогательного педа можно заставить педа побежать на рандомные координаты
    const guide = createChar(PedType.CIVMALE, this.modelId, point.x, point.y, point.z);
    setCharVisible(guide, false);
    setCharCollision(guide, false);
    setCharProofs(guide, true, true, true, true, true);
    setCharNeverTargetted(guide, true);
    freezeCharPosition(guide, true);

    taskGotoChar(this.ped, guide, -1, 1.0);

    this.engine.events.on('terminate', () => {
      if (doesCharExist(guide)) {
        deleteChar(guide);
      }
    });
  }

  taskWander(): void {
    taskWanderStandard(this.ped);
  }
}
