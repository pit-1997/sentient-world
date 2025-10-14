import type { CompoundTask, Task, PrimitiveTask } from './types';

/**
 * Проверить является ли задача примитивной
 */
export function isPrimitiveTask<TState>(task: Task<TState>): task is PrimitiveTask<TState> {
  return 'execute' in task && 'canExecute' in task && 'applyEffects' in task;
}

/**
 * Проверить является ли задача составной
 */
export function isCompoundTask<TState>(task: Task<TState>): task is CompoundTask<TState> {
  return 'getMethods' in task;
}
