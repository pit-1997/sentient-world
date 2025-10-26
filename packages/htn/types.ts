/**
 * Результат выполнения примитивной задачи
 */
export type ExecutionStatus = 'success' | 'running' | 'failure';

/**
 * Контекст выполнения задач - данные + сервисы
 */
export interface IContext<TState> {
  /** Состояние для планирования */
  state: TState;

  /**
   * Клонировать состояние для планирования
   * @returns новая копия состояния
   */
  cloneState: () => TState;
}

/**
 * Базовый интерфейс для всех задач
 */
// @ts-expect-error -- намеренно не использую TState - это нужно для упрощения дальнейшей типизации
// eslint-disable-next-line @typescript-eslint/no-unused-vars -- нужно для упрощения дальнейшей типизации
export interface ITask<TContext extends IContext<unknown>> {
  /** Название задачи */
  name: string;
}

/**
 * Примитивная задача - атомарное действие, которое может быть выполнено
 */
export interface IPrimitiveTask<TContext extends IContext<unknown>> extends ITask<TContext> {
  /**
   * Выполнить задачу
   * @param context контекст выполнения (данные + сервисы)
   * @returns результат выполнения (SUCCESS, RUNNING, FAILURE)
   */
  execute: (context: TContext) => ExecutionStatus;

  /**
   * Проверить можно ли выполнить задачу в текущем состоянии
   * Проверяется при планировании и при выполнении
   * @param state текущее состояние мира (только данные)
   * @returns true если задачу можно выполнить
   */
  canExecute: (state: TContext['state']) => boolean;

  /**
   * Применить эффекты задачи к состоянию
   * Возвращает новое состояние с применёнными изменениями
   * @param state состояние до выполнения задачи
   * @returns новое состояние после выполнения задачи
   */
  applyEffects: (state: TContext['state']) => TContext['state'];
}

/**
 * Составная задача - задача, которая декомпозируется на подзадачи
 */
export interface ICompoundTask<TContext extends IContext<unknown>> extends ITask<TContext> {
  /**
   * Получить список методов декомпозиции
   * Методы проверяются в порядке приоритета (первый = высший приоритет)
   * @returns массив методов декомпозиции
   */
  getMethods: () => IMethod<TContext>[];
}

/**
 * Метод декомпозиции составной задачи
 * Проверяет условия и возвращает список подзадач
 */
export interface IMethod<TContext extends IContext<unknown>> {
  /** Название метода */
  name: string;

  /**
   * Проверить предусловия метода
   * Проверяется во время планирования
   * @param state состояние мира на момент планирования (только данные)
   * @returns true если метод подходит для текущего состояния
   */
  preconditions: (state: TContext['state']) => boolean;

  /**
   * Декомпозировать задачу на подзадачи
   * Вызывается только если preconditions вернул true
   * @param state состояние мира на момент планирования (только данные)
   * @returns массив подзадач (примитивных или составных)
   */
  decompose: (state: TContext['state']) => ITask<TContext>[];
}

/**
 * Фабрика для создания планировщика
 */
export interface IPlannerFactory<TContext extends IContext<unknown>> {
  /**
   * Создаёт новый экземпляр планировщика
   */
  create(): IPlanner<TContext>;
}

/**
 * Ищет подходящий метод выполнения основной задачи
 */
export interface IPlanner<TContext extends IContext<unknown>> {
  /**
   * Построить план выполнения задачи
   * @param rootTask корневая задача (примитивная или составная)
   * @param context контекст с начальным состоянием мира
   * @returns массив примитивных задач для выполнения или пустой массив если план построить не удалось
   */
  plan: (rootTask: ITask<TContext>, context: TContext) => IPrimitiveTask<TContext>[];
}

/**
 * Фабрика для создания исполнителя
 */
export interface IExecutorFactory<TContext extends IContext<unknown>> {
  /**
   * Создаёт новый экземпляр исполнителя
   */
  create(plan: IPrimitiveTask<TContext>[]): IExecutor<TContext>;
}

/**
 * Исполнитель плана - последовательно выполняет примитивные задачи из плана
 */
export interface IExecutor<TContext extends IContext<unknown>> {
  /**
   * Выполнить один тик (один шаг выполнения текущей задачи)
   * @param context текущий контекст выполнения
   * @returns Результат выполнения текущей задачи
   */
  tick: (context: TContext) => ExecutionStatus;
}

/**
 * HTN агент, управляющий планированием и выполнением задач
 */
export interface IAgent<TContext extends IContext<unknown>> {
  /**
   * Обновляет состояние агента на один такт
   * Автоматически планирует и перепланирует при необходимости
   * @param context текущий контекст мира
   */
  tick(context: TContext): void;
}
