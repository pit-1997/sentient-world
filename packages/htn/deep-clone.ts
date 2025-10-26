export function deepClone<T>(obj: T): T {
  if (obj === null || typeof obj !== 'object') {
    return obj;
  }

  if (Array.isArray(obj)) {
    return obj.map((item) => deepClone(item)) as T;
  }

  if (typeof obj === 'object') {
    const clone = {} as typeof obj;

    for (const key in obj) {
      clone[key] = deepClone(obj[key]);
    }

    return clone;
  }

  return obj;
}
