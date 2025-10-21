import * as vkeys from 'vkeys';

import { World } from './world';

function main() {
  const world = new World();

  while (true) {
    wait(0);

    if (wasKeyPressed(vkeys.VK_N)) {
      world.start();
    }

    if (wasKeyPressed(vkeys.VK_Y)) {
      const [x, y, z] = getCharCoordinates(PLAYER_PED);
      const angle = getCharHeading(PLAYER_PED);
      print(`x=${x}, y=${y}, z=${z}, angle=${angle}`);
    }
  }
}

// Функция main должна быть в глобальной облас видимости,
// чтобы moonloader её запустил
// @ts-expect-error -- выше причина описана
_G.main = main;
