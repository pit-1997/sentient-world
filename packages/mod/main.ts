import { Engine, Geometry, Logger } from '@sentient-world/engine-gta-sa';
import { World } from '@sentient-world/world';

import { charactersData, CharactersRepository } from './characters';

function main() {
  const engine = new Engine();
  const logger = new Logger();
  const geometry = new Geometry();

  engine.events.on('keydown', (key) => {
    if (key === 'N') {
      new World({
        characterRepository: new CharactersRepository(charactersData),
        engine,
        geometry,
      });
    }

    if (key === 'Y') {
      const player = engine.getPlayerActor();
      const angle = player.getAngle();
      const point = player.getPoint();

      engine.setTime({ hours: 21, minutes: 30 });
      logger.log(`x: ${point.x}, y: ${point.y}, z: ${point.z}, angle: ${angle}`);
    }
  });
}

// Функция main должна быть в глобальной облас видимости,
// чтобы moonloader её запустил
// @ts-expect-error -- выше причина описана
_G.main = main;
