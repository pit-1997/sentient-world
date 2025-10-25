import type { ISentientWorldState } from '../types';

export function isAtHome(context: ISentientWorldState): boolean {
  const spawn = context.character.data.spawn;
  const point = context.characterHandle.getPoint();

  return context.geometry.getDistance(point, spawn) < 1;
}

export function isNight(context: ISentientWorldState): boolean {
  const { hours } = context.engine.getTime();

  return hours >= 22 || hours < 8;
}

export function isDay(context: ISentientWorldState): boolean {
  return !isNight(context);
}
