import type { ICompoundTask } from '@sentient-world/htn';

import type { State } from '../state';

export class LiveDayTask implements ICompoundTask<State> {
  name = 'LiveDayTask';

  getMethods() {
    return [];
  }
}
