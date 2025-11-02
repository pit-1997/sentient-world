import { Comparison } from './types';
import type { DateTime, IComparator } from './types';

const MINUTES_IN_HOUR = 60;

export class DateTimeComparator implements IComparator<DateTime> {
  compare(a: DateTime, b: DateTime): Comparison {
    if (a.date > b.date) return Comparison.Greater;
    if (a.date < b.date) return Comparison.Less;

    const currentMinutes = a.time.hours * MINUTES_IN_HOUR + a.time.minutes;
    const targetMinutes = b.time.hours * MINUTES_IN_HOUR + b.time.minutes;

    if (currentMinutes > targetMinutes) return Comparison.Greater;
    if (currentMinutes < targetMinutes) return Comparison.Less;

    return Comparison.Equal;
  }
}
