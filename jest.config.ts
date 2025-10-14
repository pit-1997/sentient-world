import { createJsWithTsEsmPreset, type JestConfigWithTsJest } from 'ts-jest';

export default {
  ...createJsWithTsEsmPreset({}),
  testMatch: [`<rootDir>/packages/**/*.spec.{ts,tsx}`],
} satisfies JestConfigWithTsJest;
