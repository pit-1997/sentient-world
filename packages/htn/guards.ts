import type { ICompoundTask, IPrimitiveTask, IState, ITask } from './types';

/**
 * Проверить является ли задача примитивной
 */
export function isPrimitiveTask<TState extends IState>(
  task: ITask<TState>
): task is IPrimitiveTask<TState> {
  return 'execute' in task && 'canExecute' in task && 'applyEffects' in task;
}

/**
 * Проверить является ли задача составной
 */
export function isCompoundTask<TState extends IState>(
  task: ITask<TState>
): task is ICompoundTask<TState> {
  return 'getMethods' in task;
}
