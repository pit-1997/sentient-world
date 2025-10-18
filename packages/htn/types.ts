/**
 * Результат выполнения примитивной задачи
 */
export type ExecutionStatus = 'success' | 'running' | 'failure';

export interface IState {
  clone: () => this;
}

/**
 * Базовый интерфейс для всех задач
 */
// @ts-expect-error -- намеренно не использую TState - это нужно для упрощения дальнейшей типизации
// eslint-disable-next-line @typescript-eslint/no-unused-vars -- нужно для упрощения дальнейшей типизации
export interface ITask<TState extends IState> {
  /** Название задачи */
  name: string;
}

/**
 * Примитивная задача - атомарное действие, которое может быть выполнено
 */
export interface IPrimitiveTask<TState extends IState> extends ITask<TState> {
  /**
   * Выполнить задачу
   * @param state текущее состояние окружения
   * @returns результат выполнения (SUCCESS, RUNNING, FAILURE)
   */
  execute: (state: TState) => ExecutionStatus;

  /**
   * Проверить можно ли выполнить задачу в текущем состоянии
   * Проверяется во время выполнения (не планирования)
   * @param state текущее состояние мира
   * @returns true если задачу можно выполнить
   */
  canExecute: (state: TState) => boolean;

  /**
   * Применить эффекты задачи к состоянию
   * Возвращает новое состояние с применёнными изменениями
   * @param state состояние до выполнения задачи
   * @returns новое состояние после выполнения задачи
   */
  applyEffects: (state: TState) => TState;
}

/**
 * Составная задача - задача, которая декомпозируется на подзадачи
 */
export interface ICompoundTask<TState extends IState> extends ITask<TState> {
  /**
   * Получить список методов декомпозиции
   * Методы проверяются в порядке приоритета (первый = высший приоритет)
   * @returns массив методов декомпозиции
   */
  getMethods: () => IMethod<TState>[];
}

/**
 * Метод декомпозиции составной задачи
 * Проверяет условия и возвращает список подзадач
 */
export interface IMethod<TState extends IState> {
  /** Название метода */
  name: string;

  /**
   * Проверить предусловия метода
   * Проверяется во время планирования
   * @param state состояние мира на момент планирования
   * @returns true если метод подходит для текущего состояния
   */
  preconditions: (state: TState) => boolean;

  /**
   * Декомпозировать задачу на подзадачи
   * Вызывается только если preconditions вернул true
   * @param state состояние мира на момент планирования
   * @returns массив подзадач (примитивных или составных)
   */
  decompose: (state: TState) => ITask<TState>[];
}

/**
 * Фабрика для создания планировщика
 */
export interface IPlannerFactory<TState extends IState> {
  /**
   * Создаёт новый экземпляр планировщика
   */
  create(): IPlanner<TState>;
}

/**
 * Ищет подходящий метод выполнения основной задачи
 */
export interface IPlanner<TState extends IState> {
  /**
   * Построить план выполнения задачи
   * @param rootTask корневая задача (примитивная или составная)
   * @param state начальное состояние мира
   * @returns массив примитивных задач для выполнения или null если план построить не удалось
   */
  plan: (rootTask: ITask<TState>, state: TState) => IPrimitiveTask<TState>[];
}

/**
 * Фабрика для создания исполнителя
 */
export interface IExecutorFactory<TState extends IState> {
  /**
   * Создаёт новый экземпляр исполнителя
   */
  create(plan: IPrimitiveTask<TState>[]): IExecutor<TState>;
}

/**
 * Исполнитель плана - последовательно выполняет примитивные задачи из плана
 */
export interface IExecutor<TState extends IState> {
  /**
   * Выполнить один тик (один шаг выполнения текущей задачи)
   * @param state Текущее состояние мира
   * @returns Результат выполнения текущей задачи
   */
  tick: (state: TState) => ExecutionStatus;
}

/**
 * HTN агент, управляющий планированием и выполнением задач
 */
export interface IAgent<TState extends IState> {
  /**
   * Обновляет состояние агента на один такт
   * Автоматически планирует и перепланирует при необходимости
   * @param state текущее состояние мира
   */
  tick(state: TState): void;
}
