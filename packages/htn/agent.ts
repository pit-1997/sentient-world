import { ExecutorFactory } from './executor';
import { PlannerFactory } from './planner';
import type {
  IExecutor,
  IExecutorFactory,
  IPlannerFactory,
  IPrimitiveTask,
  IState,
  ITask,
  ExecutionStatus,
} from './types';

const MAX_REPLAN_ATTEMPTS = 3;

/**
 * HTN агент, управляющий планированием и выполнением задач
 */
export class Agent<TState extends IState> {
  private executor: IExecutor<TState> | null = null;
  private lastResult: ExecutionStatus | null = null;
  private replanAttempts: number = 0;

  constructor(
    private readonly rootTask: ITask<TState>,
    private readonly plannerFactory: IPlannerFactory<TState> = new PlannerFactory(),
    private readonly executorFactory: IExecutorFactory<TState> = new ExecutorFactory()
  ) {}

  tick(state: TState): void {
    // Если превышен лимит попыток, больше ничего не делаем
    if (this.hasExceededReplanLimit) {
      return;
    }

    // Первый вызов или нужен переплан
    if (!this.executor || this.shouldReplan()) {
      const plan = this.replan(state);
      this.executor = this.executorFactory.create(plan);
    }

    this.lastResult = this.executor.tick(state);
  }

  /**
   * Достигнут ли лимит попыток перепланировать корневую задачу
   */
  private get hasExceededReplanLimit() {
    return this.replanAttempts >= MAX_REPLAN_ATTEMPTS;
  }

  /**
   * Проверяет, нужен ли переплан
   */
  private shouldReplan(): boolean {
    // Предыдущий план завершился или провалился
    return this.lastResult === 'success' || this.lastResult === 'failure';
  }

  /**
   * Возвращает новый план
   */
  private replan(state: TState): IPrimitiveTask<TState>[] {
    const planner = this.plannerFactory.create();
    const plan = planner.plan(this.rootTask, state);

    this.replanAttempts = plan.length > 0 ? 0 : this.replanAttempts + 1;

    return plan;
  }
}
