import { describe, expect, it } from '@jest/globals';

import { mockedState, StateBuilder } from '../../mocks';
import { ScheduleChecker } from '../schedule-checker';

describe(ScheduleChecker.name, () => {
  const checker = new ScheduleChecker();

  describe('#isNight', () => {
    it('если время 07:59, возвращает true', () => {
      const state = StateBuilder.of(mockedState)
        .withWorldDateTime({ date: 1, time: { hours: 7, minutes: 59 } })
        .build();

      expect(checker.isNight(state)).toBe(true);
    });

    it('если время 08:00, возвращает false', () => {
      const state = StateBuilder.of(mockedState)
        .withWorldDateTime({ date: 1, time: { hours: 8, minutes: 0 } })
        .build();

      expect(checker.isNight(state)).toBe(false);
    });

    it('если время 21:59, возвращает false', () => {
      const state = StateBuilder.of(mockedState)
        .withWorldDateTime({ date: 1, time: { hours: 21, minutes: 59 } })
        .build();

      expect(checker.isNight(state)).toBe(false);
    });

    it('если время 22:00, возвращает true', () => {
      const state = StateBuilder.of(mockedState)
        .withWorldDateTime({ date: 1, time: { hours: 22, minutes: 0 } })
        .build();

      expect(checker.isNight(state)).toBe(true);
    });
  });

  describe('#isDay', () => {
    it('если время 07:59, возвращает false', () => {
      const state = StateBuilder.of(mockedState)
        .withWorldDateTime({ date: 1, time: { hours: 7, minutes: 59 } })
        .build();

      expect(checker.isDay(state)).toBe(false);
    });

    it('если время 08:00, возвращает true', () => {
      const state = StateBuilder.of(mockedState)
        .withWorldDateTime({ date: 1, time: { hours: 8, minutes: 0 } })
        .build();

      expect(checker.isDay(state)).toBe(true);
    });

    it('если время 21:59, возвращает true', () => {
      const state = StateBuilder.of(mockedState)
        .withWorldDateTime({ date: 1, time: { hours: 21, minutes: 59 } })
        .build();

      expect(checker.isDay(state)).toBe(true);
    });

    it('если время 22:00, возвращает false', () => {
      const state = StateBuilder.of(mockedState)
        .withWorldDateTime({ date: 1, time: { hours: 22, minutes: 0 } })
        .build();

      expect(checker.isDay(state)).toBe(false);
    });
  });
});
