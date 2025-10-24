import type { ILogger } from '@sentient-world/engine';

import { print } from '@sentient-world/moonloader';

export class Logger implements ILogger {
  log(message: string) {
    print(message);
  }
}
