import { isCompoundTask, isPrimitiveTask } from './guards';
import type { CompoundTask, Planner as IPlanner, PrimitiveTask, State, Task } from './types';

/**
 * Результат декомпозиции задачи
 */
interface Decomposition<TState extends State> {
  /** Список примитивных задач (пустой если декомпозиция не удалась) */
  plan: PrimitiveTask<TState>[];
  /** Состояние после применения эффектов (исходное если декомпозиция не удалась) */
  state: TState;
}

/**
 * Реализация планировщика HTN
 * Рекурсивно декомпозирует составные задачи до примитивных
 */
export class Planner<TState extends State> implements IPlanner<TState> {
  /**
   * Построить план выполнения задачи
   * @param rootTask корневая задача
   * @param state начальное состояние мира
   * @returns массив примитивных задач для выполнения или пустой массив если план построить не удалось
   */
  plan(rootTask: Task<TState>, state: TState): PrimitiveTask<TState>[] {
    const result = this.decomposeTask(rootTask, state);
    return result.plan;
  }

  /**
   * Декомпозирует задачу
   * @param task задача для декомпозиции
   * @param state текущее состояние
   * @returns результат декомпозиции (пустой план если декомпозиция невозможна)
   */
  private decomposeTask(task: Task<TState>, state: TState): Decomposition<TState> {
    if (isPrimitiveTask(task)) {
      return this.decomposePrimitive(task, state);
    }

    if (isCompoundTask(task)) {
      return this.decomposeCompound(task, state);
    }

    // Неизвестный тип задачи
    return { plan: [], state };
  }

  /**
   * Декомпозирует примитивную задачу
   * @param task примитивная задача
   * @param state текущее состояние
   * @returns результат декомпозиции (пустой план если задачу нельзя выполнить)
   */
  private decomposePrimitive(task: PrimitiveTask<TState>, state: TState): Decomposition<TState> {
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
   * @param state текущее состояние
   * @returns результат декомпозиции (пустой план если ни один метод не подошёл)
   */
  private decomposeCompound(task: CompoundTask<TState>, state: TState): Decomposition<TState> {
    const methods = task.getMethods();

    for (const method of methods) {
      if (!method.preconditions(state)) {
        continue;
      }

      const subtasks = method.decompose(state);
      const result = this.decomposeSubtasks(subtasks, state);

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
   * @param state начальное состояние
   * @returns результат декомпозиции (пустой план если хотя бы одна подзадача не декомпозируется)
   */
  private decomposeSubtasks(subtasks: Task<TState>[], state: TState): Decomposition<TState> {
    const plan: PrimitiveTask<TState>[] = [];
    let currentState = state.clone();

    for (const subtask of subtasks) {
      const result = this.decomposeTask(subtask, currentState);

      // Если подзадача не декомпозировалась - возвращаем пустой план
      if (!result.plan.length) {
        return { plan: [], state };
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
