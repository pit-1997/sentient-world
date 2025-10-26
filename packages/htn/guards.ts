import type { IContext, ICompoundTask, IPrimitiveTask, ITask } from './types';

/**
 * Проверить является ли задача примитивной
 */
export function isPrimitiveTask<TContext extends IContext<unknown>>(
  task: ITask<TContext>
): task is IPrimitiveTask<TContext> {
  return 'execute' in task && 'canExecute' in task && 'applyEffects' in task;
}

/**
 * Проверить является ли задача составной
 */
export function isCompoundTask<TContext extends IContext<unknown>>(
  task: ITask<TContext>
): task is ICompoundTask<TContext> {
  return 'getMethods' in task;
}
