import type {
  IContext,
  IExecutor,
  IPrimitiveTask,
  ExecutionStatus,
  IExecutorFactory,
} from './types';

export class Executor<TContext extends IContext<unknown>> implements IExecutor<TContext> {
  private currentTaskIndex: number = 0;
  private isCompleted: boolean = false;
  private isFailed: boolean = false;

  constructor(private readonly plan: IPrimitiveTask<TContext>[]) {}

  tick(context: TContext): ExecutionStatus {
    // План уже завершён
    if (this.isCompleted) return 'success';
    if (this.isFailed) return 'failure';

    const task = this.plan[this.currentTaskIndex];

    // Пустой план
    if (!task) {
      this.isCompleted = true;
      return 'success';
    }

    if (!task.canExecute(context)) {
      this.isFailed = true;
      return 'failure';
    }

    const result = task.execute(context);

    // Обрабатываем результат
    if (result === 'failure') {
      this.isFailed = true;
      return 'failure';
    }

    if (result === 'running') {
      return 'running';
    }

    result satisfies 'success';
    // Переходим к следующей задаче
    this.currentTaskIndex++;

    // Проверяем, есть ли ещё задачи
    if (this.currentTaskIndex >= this.plan.length) {
      this.isCompleted = true;
      return 'success';
    }

    return 'running';
  }
}

export class ExecutorFactory<TContext extends IContext<unknown>>
  implements IExecutorFactory<TContext>
{
  create(plan: IPrimitiveTask<TContext>[]): IExecutor<TContext> {
    return new Executor(plan);
  }
}
