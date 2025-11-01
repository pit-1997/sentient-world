import type { IRepository } from '../types';

/**
 * Репозиторий, хранящий данные в памяти
 * @template T Тип элементов в репозитории
 */
export class MemoryRepository<T> implements IRepository<T> {
  private readonly items: T[];

  /**
   * @param items Массив элементов для хранения
   */
  constructor(items: T[]) {
    this.items = items;
  }

  /**
   * Возвращает все элементы из репозитория
   * @returns Массив всех элементов
   */
  findAll(): T[] {
    return this.items;
  }
}
