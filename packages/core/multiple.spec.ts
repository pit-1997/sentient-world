import { describe, expect, it } from '@jest/globals';

import { multiple } from './multiple';

describe(multiple.name, () => {
  it('возвращает результат умножения первого параметра на второй', () => {
    expect.assertions(1);
    expect(multiple(2, 3)).toBe(6);
  });
});
