import { describe, expect, it, jest } from '@jest/globals';

import { deepClone } from '../deep-clone';

describe('deepClone', () => {
  describe('примитивные значения', () => {
    it('если передано число, возвращает то же число', () => {
      expect(deepClone(42)).toBe(42);
    });

    it('если передана строка, возвращает ту же строку', () => {
      expect(deepClone('hello')).toBe('hello');
    });

    it('если передано булево значение, возвращает то же значение', () => {
      expect(deepClone(true)).toBe(true);
      expect(deepClone(false)).toBe(false);
    });

    it('если передан null, возвращает null', () => {
      expect(deepClone(null)).toBeNull();
    });

    it('если передан undefined, возвращает undefined', () => {
      expect(deepClone(undefined)).toBeUndefined();
    });

    it('если передан NaN, возвращает NaN', () => {
      expect(deepClone(NaN)).toBeNaN();
    });

    it('если передан Infinity, возвращает Infinity', () => {
      expect(deepClone(Infinity)).toBe(Infinity);
    });
  });

  describe('объекты', () => {
    it('если передан пустой объект, возвращает новый пустой объект', () => {
      const original = {};
      const cloned = deepClone(original);

      expect(cloned).toStrictEqual(original);
      expect(cloned).not.toBe(original);
    });

    it('если передан объект с примитивными свойствами, возвращает копию объекта', () => {
      const original = { a: 1, b: 'test', c: true };
      const cloned = deepClone(original);

      expect(cloned).toStrictEqual(original);
      expect(cloned).not.toBe(original);
    });

    it('если передан объект с вложенными объектами, возвращает глубокую копию', () => {
      const original = { a: { b: { c: 42 } } };
      const cloned = deepClone(original);

      expect(cloned).toStrictEqual(original);
      expect(cloned).not.toBe(original);
      expect(cloned.a).not.toBe(original.a);
      expect(cloned.a.b).not.toBe(original.a.b);
    });

    it('если изменяются свойства клонированного объекта, оригинальный объект не изменяется', () => {
      const original = { a: 1, b: { c: 2 } };
      const cloned = deepClone(original);

      cloned.a = 100;
      cloned.b.c = 200;

      expect(original.a).toBe(1);
      expect(original.b.c).toBe(2);
    });
  });

  describe('массивы', () => {
    it('если передан пустой массив, возвращает новый пустой массив', () => {
      const original: unknown[] = [];
      const cloned = deepClone(original);

      expect(cloned).toStrictEqual(original);
      expect(cloned).not.toBe(original);
    });

    it('если передан массив с примитивами, возвращает копию массива', () => {
      const original = [1, 'test', true, null];
      const cloned = deepClone(original);

      expect(cloned).toStrictEqual(original);
      expect(cloned).not.toBe(original);
    });

    it('если передан массив с объектами, возвращает глубокую копию массива', () => {
      const original = [{ a: 1 }, { b: { c: 2 } }];
      const cloned = deepClone(original);

      expect(cloned).toStrictEqual(original);
      expect(cloned).not.toBe(original);
      expect(cloned[0]).not.toBe(original[0]);
      expect(cloned[1]!.b).not.toBe(original[1]!.b);
    });

    it('если изменяются элементы клонированного массива, оригинальный массив не изменяется', () => {
      const original = [{ value: 1 }, { value: 2 }];
      const cloned = deepClone(original);

      cloned[0]!.value = 100;
      cloned[1]!.value = 200;

      expect(original[0]!.value).toBe(1);
      expect(original[1]!.value).toBe(2);
    });
  });

  describe('даты', () => {
    it('если передан объект Date, возвращает новую дату с тем же временем', () => {
      const original = new Date('2023-01-01T00:00:00Z');
      const cloned = deepClone(original);

      expect(cloned).toStrictEqual(original);
      expect(cloned).not.toBe(original);
      expect(cloned.getTime()).toBe(original.getTime());
    });

    it('если изменяется клонированная дата, оригинальная дата не изменяется', () => {
      const original = new Date('2023-01-01T00:00:00Z');
      const cloned = deepClone(original);

      cloned.setFullYear(2024);

      expect(original.getFullYear()).toBe(2023);
      expect(cloned.getFullYear()).toBe(2024);
    });
  });

  describe('функции', () => {
    it('если передана функция, возвращает ту же функцию', () => {
      const original = jest.fn().mockReturnValue(42);
      const cloned = deepClone(original);

      expect(cloned).toBe(original);
      expect(cloned()).toBe(42);
    });

    it('если передан объект с методами, возвращает объект с теми же методами', () => {
      const original = {
        value: 1,
        getValue() {
          return this.value;
        },
        increment() {
          this.value++;
        },
      };

      const cloned = deepClone(original);

      expect(cloned.getValue).toBe(original.getValue);
      expect(cloned.increment).toBe(original.increment);
      expect(cloned.getValue()).toBe(1);
    });
  });

  describe('специальные случаи', () => {
    it('если передан объект с null и undefined значениями, возвращает копию объекта', () => {
      const original = { a: null, b: undefined, c: 0, d: '' };
      const cloned = deepClone(original);

      expect(cloned).toStrictEqual(original);
      expect(cloned).not.toBe(original);
    });

    it('если передан объект с логическими значениями, возвращает копию объекта', () => {
      const original = { a: true, b: false };
      const cloned = deepClone(original);

      expect(cloned).toStrictEqual(original);
      expect(cloned).not.toBe(original);
    });
  });
});
