import type { State } from '../types';

/**
 * Проверяет время суток в игровом мире
 */
export interface IScheduleChecker {
  /**
   * Проверяет, является ли текущее время ночью (с 22:00 до 08:00)
   */
  isNight(state: State): boolean;

  /**
   * Проверяет, является ли текущее время днём (с 08:00 до 22:00)
   */
  isDay(state: State): boolean;
}

export class ScheduleChecker implements IScheduleChecker {
  isNight(state: State): boolean {
    const { hours } = state.world.dateTime.time;
    return hours >= 22 || hours < 8;
  }

  isDay(state: State): boolean {
    return !this.isNight(state);
  }
}
