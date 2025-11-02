import { describe, expect, it } from '@jest/globals';

import { LiveDayTask } from '../live-day-task';
import { DayTimeMethod, NightTimeGoHomeMethod, NightTimeSleepMethod } from '../methods';
import { getMockedLiveDayDeps } from '../mocks';

describe(LiveDayTask.name, () => {
  describe('#getMethods', () => {
    it('возвращает методы в порядке: NightTimeGoHome, NightTimeSleep, DayTime', () => {
      const task = new LiveDayTask(getMockedLiveDayDeps());

      const methods = task.getMethods();

      expect(methods).toStrictEqual([
        expect.any(NightTimeGoHomeMethod),
        expect.any(NightTimeSleepMethod),
        expect.any(DayTimeMethod),
      ]);
    });
  });
});
