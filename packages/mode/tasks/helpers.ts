import { getCharCoordinates, getDistanceBetweenCoords3d } from '@sentient-world/moonloader';

import type { ISentientWorldState } from '../types';

export function isAtHome(context: ISentientWorldState): boolean {
  const spawn = context.character.data.spawn;
  const [x, y, z] = getCharCoordinates(context.ped);

  return getDistanceBetweenCoords3d(spawn.x, spawn.y, spawn.z, x, y, z) < 1;
}

export function isNight(context: ISentientWorldState): boolean {
  const hours = context.getTime().hours;

  return hours >= 22 || hours < 8;
}

export function isDay(context: ISentientWorldState): boolean {
  return !isNight(context);
}
