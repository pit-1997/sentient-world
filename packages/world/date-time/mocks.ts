import { Comparison } from './types';
import type { CompareFunction, IComparator } from './types';

export class MockedComparator<T> implements IComparator<T> {
  private readonly compareFunction: CompareFunction<T>;

  constructor(compareFunction: CompareFunction<T>) {
    this.compareFunction = compareFunction;
  }

  compare(a: T, b: T): Comparison {
    return this.compareFunction(a, b);
  }

  static alwaysLess<T>(): IComparator<T> {
    return new MockedComparator(() => Comparison.Less);
  }

  static alwaysEqual<T>(): IComparator<T> {
    return new MockedComparator(() => Comparison.Equal);
  }

  static alwaysGreater<T>(): IComparator<T> {
    return new MockedComparator(() => Comparison.Greater);
  }

  static fromFunction<T>(compareFunction: (a: T, b: T) => Comparison): IComparator<T> {
    return new MockedComparator(compareFunction);
  }
}
