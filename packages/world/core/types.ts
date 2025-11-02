export enum Comparison {
  Less = 'Less',
  Equal = 'Equal',
  Greater = 'Greater',
}

export type CompareFunction<T> = (a: T, b: T) => Comparison;

export interface IComparator<T> {
  compare(a: T, b: T): Comparison;
}

export type Date = number;

export type Time = {
  hours: number;
  minutes: number;
};

export type DateTime = {
  date: Date;
  time: Time;
};
