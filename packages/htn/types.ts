/**
 * Результат выполнения примитивной задачи
 */
export type TaskResult = 'success' | 'running' | 'failure'; // TODO: Переименовать на ExecutionStatus

export interface State {
  clone: () => this;
}

/**
 * Базовый интерфейс для всех задач
 */
// @ts-expect-error -- намеренно не использую TState - это нужно для упрощения дальнейшей типизации
// eslint-disable-next-line @typescript-eslint/no-unused-vars -- нужно для упрощения дальнейшей типизации
export interface Task<TState extends State> {
  // TODO: Переименовать интерфейсы на те же с приставкой I
  /** Название задачи */
  name: string;
}

/**
 * Примитивная задача - атомарное действие, которое может быть выполнено
 */
export interface PrimitiveTask<TState extends State> extends Task<TState> {
  /**
   * Выполнить задачу
   * @param state текущее состояние окружения
   * @returns результат выполнения (SUCCESS, RUNNING, FAILURE)
   */
  execute: (state: TState) => TaskResult;

  /**
   * Проверить можно ли выполнить задачу в текущем состоянии
   * Проверяется во время выполнения (не планирования)
   * @param state текущее состояние мира
   * @returns true если задачу можно выполнить
   */
  canExecute: (state: TState) => boolean;

  /**
   * Отменяет выполнение задачи
   */
  cancel?: () => void;

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
export interface CompoundTask<TState extends State> extends Task<TState> {
  /**
   * Получить список методов декомпозиции
   * Методы проверяются в порядке приоритета (первый = высший приоритет)
   * @returns массив методов декомпозиции
   */
  getMethods: () => Method<TState>[];
}

/**
 * Метод декомпозиции составной задачи
 * Проверяет условия и возвращает список подзадач
 */
export interface Method<TState extends State> {
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
  decompose: (state: TState) => Task<TState>[];
}

/**
 * Фабрика для создания планировщика
 */
export interface PlannerFactory<TState extends State> {
  /**
   * Создаёт новый экземпляр планировщика
   */
  create(): Planner<TState>;
}

/**
 * Ищет подходящий метод выполнения основной задачи
 */
export interface Planner<TState extends State> {
  /**
   * Построить план выполнения задачи
   * @param rootTask корневая задача (примитивная или составная)
   * @param state начальное состояние мира
   * @returns массив примитивных задач для выполнения или null если план построить не удалось
   */
  plan: (rootTask: Task<TState>, state: TState) => PrimitiveTask<TState>[];
}

/**
 * Фабрика для создания исполнителя
 */
export interface ExecutorFactory<TState extends State> {
  /**
   * Создаёт новый экземпляр исполнителя
   */
  create(plan: PrimitiveTask<TState>[]): Executor<TState>;
}

/**
 * Исполнитель плана - последовательно выполняет примитивные задачи из плана
 */
export interface Executor<TState extends State> {
  /**
   * Выполнить один тик (один шаг выполнения текущей задачи)
   * @param state Текущее состояние мира
   * @returns Результат выполнения текущей задачи
   */
  tick: (state: TState) => TaskResult;
}

/**
 * HTN агент, управляющий планированием и выполнением задач
 */
export interface Agent<TState extends State> {
  /**
   * Обновляет состояние агента на один такт
   * Автоматически планирует и перепланирует при необходимости
   * @param state текущее состояние мира
   */
  tick(state: TState): void;
}
