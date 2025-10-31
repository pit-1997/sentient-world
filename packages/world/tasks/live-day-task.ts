import type { ICompoundTask } from '@sentient-world/htn';

import type { WorldState } from '../world/state';

export class LiveDayTask implements ICompoundTask<WorldState> {
  name = 'LiveDayTask';

  getMethods() {
    return [];
  }
}
