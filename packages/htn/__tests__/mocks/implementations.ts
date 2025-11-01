import { Agent } from '../../agent';

import type { IAgentFactory, IState, ITask } from '../../types';

export class MockedAgent<TState extends IState> extends Agent<TState> {
  /** Возвращает корневую задачу с которой был создан HTN агент */
  getRootTask(): ITask<TState> {
    return this.rootTask;
  }
}

export class MockedAgentFactory<TState extends IState> implements IAgentFactory<TState> {
  private readonly createdAgents: MockedAgent<TState>[] = [];

  create(rootTask: ITask<TState>): MockedAgent<TState> {
    const agent = new MockedAgent(rootTask);
    this.createdAgents.push(agent);

    return agent;
  }

  /** Возвращает массив созданных HTN-агентов */
  getCreatedAgents(): MockedAgent<TState>[] {
    return this.createdAgents;
  }
}
