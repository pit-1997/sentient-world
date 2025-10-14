import type { Executor as IExecutor, PrimitiveTask, State, TaskResult } from './types';

export class Executor<TState extends State> implements IExecutor<TState> {
  private currentTaskIndex: number = 0;
  private isCompleted: boolean = false;
  private isFailed: boolean = false;

  constructor(private readonly plan: PrimitiveTask<TState>[]) {}

  tick(state: TState): TaskResult {
    // План уже завершён
    if (this.isCompleted) return 'success';
    if (this.isFailed) return 'failure';

    const task = this.plan[this.currentTaskIndex];

    // Пустой план
    if (!task) {
      this.isCompleted = true;
      return 'success';
    }

    if (!task.canExecute(state)) {
      this.isFailed = true;
      return 'failure';
    }

    const result = task.execute(state);

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
