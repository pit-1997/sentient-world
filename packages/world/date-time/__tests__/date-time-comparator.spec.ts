import { describe, expect, it } from '@jest/globals';

import { DateTimeComparator } from '../date-time-comparator';
import { Comparison, type DateTime } from '../types';

describe(DateTimeComparator.name, () => {
  describe('#compare', () => {
    describe('сравнение дней', () => {
      it('если первая дата позже второй, возвращает Greater', () => {
        const comparator = new DateTimeComparator();
        const a: DateTime = { date: 5, time: { hours: 0, minutes: 0 } };
        const b: DateTime = { date: 3, time: { hours: 23, minutes: 59 } };

        const result = comparator.compare(a, b);

        expect(result).toBe(Comparison.Greater);
      });

      it('если первая дата меньше второй, возвращает Less', () => {
        const comparator = new DateTimeComparator();
        const a: DateTime = { date: 2, time: { hours: 23, minutes: 59 } };
        const b: DateTime = { date: 3, time: { hours: 0, minutes: 0 } };

        const result = comparator.compare(a, b);

        expect(result).toBe(Comparison.Less);
      });
    });

    describe('сравнение часов при равных днях', () => {
      it('если первое время больше второго, возвращает Greater', () => {
        const comparator = new DateTimeComparator();
        const a: DateTime = { date: 3, time: { hours: 8, minutes: 0 } };
        const b: DateTime = { date: 3, time: { hours: 7, minutes: 0 } };

        const result = comparator.compare(a, b);

        expect(result).toBe(Comparison.Greater);
      });

      it('если текущее время меньше целевого, возвращает Less', () => {
        const comparator = new DateTimeComparator();
        const a: DateTime = { date: 3, time: { hours: 6, minutes: 59 } };
        const b: DateTime = { date: 3, time: { hours: 7, minutes: 0 } };

        const result = comparator.compare(a, b);

        expect(result).toBe(Comparison.Less);
      });

      it('если время равно равно, возвращает Equal', () => {
        const comparator = new DateTimeComparator();
        const a: DateTime = { date: 3, time: { hours: 7, minutes: 30 } };
        const b: DateTime = { date: 3, time: { hours: 7, minutes: 30 } };

        const result = comparator.compare(a, b);

        expect(result).toBe(Comparison.Equal);
      });
    });

    describe('сравнение минут при равных днях и часах', () => {
      it('если минуты в первом времени больше, возвращает Greater', () => {
        const comparator = new DateTimeComparator();
        const a: DateTime = { date: 3, time: { hours: 7, minutes: 31 } };
        const b: DateTime = { date: 3, time: { hours: 7, minutes: 30 } };

        const result = comparator.compare(a, b);

        expect(result).toBe(Comparison.Greater);
      });

      it('если минуты меньше, возвращает Less', () => {
        const comparator = new DateTimeComparator();
        const a: DateTime = { date: 3, time: { hours: 7, minutes: 29 } };
        const b: DateTime = { date: 3, time: { hours: 7, minutes: 30 } };

        const result = comparator.compare(a, b);

        expect(result).toBe(Comparison.Less);
      });
    });
  });
});
