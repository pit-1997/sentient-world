import { isCompoundTask, isPrimitiveTask } from './guards';
import type {
  ICompoundTask,
  IContext,
  IPlanner,
  IPlannerFactory,
  IPrimitiveTask,
  ITask,
} from './types';

/**
 * Результат декомпозиции задачи
 */
interface Decomposition<TContext extends IContext<unknown>> {
  /** Список примитивных задач (пустой если декомпозиция не удалась) */
  plan: IPrimitiveTask<TContext>[];
  /** Состояние после применения эффектов (исходное если декомпозиция не удалась) */
  state: TContext['state'];
}

export class Planner<TContext extends IContext<unknown>> implements IPlanner<TContext> {
  plan(rootTask: ITask<TContext>, context: TContext): IPrimitiveTask<TContext>[] {
    return this.decomposeTask(rootTask, context, context.state).plan;
  }

  /**
   * Декомпозирует задачу
   * @param task задача для декомпозиции
   * @param context текущий контекст выполнения
   * @param state текущее состояние
   * @returns результат декомпозиции (пустой план если декомпозиция невозможна)
   */
  private decomposeTask(
    task: ITask<TContext>,
    context: TContext,
    state: TContext['state']
  ): Decomposition<TContext> {
    if (isPrimitiveTask(task)) {
      return this.decomposePrimitive(task, state);
    }

    if (isCompoundTask(task)) {
      return this.decomposeCompound(task, context, state);
    }

    // Неизвестный тип задачи
    return { plan: [], state: context.state };
  }

  /**
   * Декомпозирует примитивную задачу
   * @param task примитивная задача
   * @param context текущий контекст выполнения
   * @param state текущее состояние
   * @returns результат декомпозиции (пустой план если задачу нельзя выполнить)
   */
  private decomposePrimitive(
    task: IPrimitiveTask<TContext>,
    state: TContext['state']
  ): Decomposition<TContext> {
    if (!task.canExecute(state)) {
      return { plan: [], state };
    }

    return {
      plan: [task],
      state: task.applyEffects(state),
    };
  }

  /**
   * Декомпозировать составную задачу
   * Пробует методы в порядке приоритета до первого успешного
   * @param task составная задача
   * @param context текущий контекст выполнения
   * @param state текущее состояние
   * @returns результат декомпозиции (пустой план если ни один метод не подошёл)
   */
  private decomposeCompound(
    task: ICompoundTask<TContext>,
    context: TContext,
    state: TContext['state']
  ): Decomposition<TContext> {
    const methods = task.getMethods();

    for (const method of methods) {
      if (!method.preconditions(state)) {
        continue;
      }

      const subtasks = method.decompose(state);
      const result = this.decomposeSubtasks(subtasks, context);

      if (result.plan.length > 0) {
        return result;
      }
    }

    // Ни один метод не подошёл
    return { plan: [], state };
  }

  /**
   * Декомпозирует список подзадач
   * @param subtasks подзадачи
   * @param context текущий контекст выполнения
   * @returns результат декомпозиции (пустой план если хотя бы одна подзадача не декомпозируется)
   */
  private decomposeSubtasks(
    subtasks: ITask<TContext>[],
    context: TContext
  ): Decomposition<TContext> {
    const plan: IPrimitiveTask<TContext>[] = [];
    let currentState: TContext['state'] = context.cloneState();

    for (const subtask of subtasks) {
      const result = this.decomposeTask(subtask, context, currentState);

      // Если подзадача не декомпозировалась - возвращаем пустой план
      if (!result.plan.length) {
        return { plan: [], state: context.state };
      }

      // Добавляем примитивные задачи в план
      plan.push(...result.plan);

      // Используем обновлённое состояние для следующей подзадачи
      currentState = result.state;
    }

    return {
      plan,
      state: currentState,
    };
  }
}

export class PlannerFactory<TContext extends IContext<unknown>>
  implements IPlannerFactory<TContext>
{
  create(): IPlanner<TContext> {
    return new Planner();
  }
}
