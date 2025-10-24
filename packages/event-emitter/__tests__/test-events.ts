export type TestEvents = {
  start: () => void;
  tick: (n: number) => string;
  end: (reason: string) => number;
  error: (message: string, code: number) => void;
};
