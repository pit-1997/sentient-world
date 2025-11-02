import type { IScheduleChecker } from './schedule-checker';

type MockedScheduleCheckerOptions = {
  isNight: boolean;
};

export class MockedScheduleChecker implements IScheduleChecker {
  private readonly _isNight: boolean;

  private constructor(options: MockedScheduleCheckerOptions) {
    this._isNight = options.isNight;
  }

  isNight(): boolean {
    return this._isNight;
  }

  isDay(): boolean {
    return !this._isNight;
  }

  static alwaysNight(): IScheduleChecker {
    return new MockedScheduleChecker({ isNight: true });
  }

  static alwaysDay(): IScheduleChecker {
    return new MockedScheduleChecker({ isNight: false });
  }
}
