import { Engine, Geometry, Logger } from '@sentient-world/engine-gta-sa';

import { World } from './world';

function main() {
  const engine = new Engine();
  const logger = new Logger();
  const geometry = new Geometry();
  const world = new World(engine, geometry);

  engine.events.on('keydown', (key) => {
    if (key === 'N') {
      world.start();
    }

    if (key === 'Y') {
      const player = engine.getPlayerActor();
      const angle = player.getAngle();
      const point = player.getPoint();

      logger.log(`x: ${point.x}, y: ${point.y}, z: ${point.z}, angle: ${angle}`);
    }
  });
}

// Функция main должна быть в глобальной облас видимости,
// чтобы moonloader её запустил
// @ts-expect-error -- выше причина описана
_G.main = main;
