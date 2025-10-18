import type { ExecutionStatus, IPrimitiveTask } from '@sentient-world/htn';

import type { ISentientWorldState } from '../../types';

export interface Point {
  x: number;
  y: number;
  z: number;
}

export class GoToPointTask implements IPrimitiveTask<ISentientWorldState> {
  name = 'GoToPointTask';
  private started = false;
  private guide: Ped | null = null;

  constructor(private readonly targetPoint: Point) {}

  applyEffects(state: ISentientWorldState): ISentientWorldState {
    return state;
  }

  canExecute() {
    return true;
  }

  execute(state: ISentientWorldState): ExecutionStatus {
    const [x, y, z] = getCharCoordinates(state.ped);
    const distance = getDistanceBetweenCoords3d(
      x,
      y,
      z,
      this.targetPoint.x,
      this.targetPoint.y,
      this.targetPoint.z
    );

    if (distance <= 1) {
      this.complete(state.ped);
      return 'success';
    }

    if (!this.started) {
      this.start(state);
    }

    return 'running';
  }

  private start(state: ISentientWorldState) {
    this.guide = createChar(
      4,
      state.character.data.modelId,
      this.targetPoint.x,
      this.targetPoint.y,
      this.targetPoint.z
    );

    setCharVisible(this.guide, false);
    setCharCollision(this.guide, false);
    setCharProofs(this.guide, true, true, true, true, true);
    setCharNeverTargetted(this.guide, true);
    freezeCharPosition(this.guide, true);

    taskGotoChar(state.ped, this.guide, -1, 1);
    this.started = true;

    addEventHandler('onScriptTerminate', () => {
      if (this.guide && doesCharExist(this.guide)) {
        deleteChar(this.guide);
      }
    });
  }

  private complete(ped: Ped) {
    if (this.guide) {
      if (doesCharExist(this.guide)) {
        deleteChar(this.guide);
      }
      this.guide = null;
    }

    clearCharTasks(ped);
  }
}
