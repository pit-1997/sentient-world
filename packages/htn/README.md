# @sentient-world/htn

Реализация HTN (Hierarchical Task Network) системы планирования для управления поведением NPC.

## Описание

HTN (Hierarchical Task Network) — это алгоритм планирования, который разбивает сложные задачи на простые действия. Система состоит из трёх основных компонентов:

- **Планировщик (Planner)** — разбивает составные задачи на примитивные действия
- **Исполнитель (Executor)** — последовательно выполняет план действий
- **Агент (Agent)** — объединяет планировщик и исполнителя, автоматически перепланируя при необходимости

## Установка

```bash
npm install @sentient-world/htn
```

## Быстрый старт

### 1. Определите состояние мира

```typescript
import type { IState } from '@sentient-world/htn';

class GameState implements IState {
  constructor(
    public playerEnergy: number,
    public isHungry: boolean
  ) {}

  clone(): this {
    return new GameState(this.playerEnergy, this.isHungry) as this;
  }
}
```

### 2. Создайте примитивные задачи

```typescript
import type { IPrimitiveTask, ExecutionStatus } from '@sentient-world/htn';

class EatTask implements IPrimitiveTask<GameState> {
  name = 'Eat';

  canExecute(state: GameState): boolean {
    return state.isHungry;
  }

  execute(state: GameState): ExecutionStatus {
    // Логика выполнения
    state.isHungry = false;
    return 'success';
  }

  applyEffects(state: GameState): GameState {
    // Симуляция эффектов для планирования
    const newState = state.clone();
    newState.isHungry = false;
    newState.playerEnergy += 20;
    return newState;
  }
}

class SleepTask implements IPrimitiveTask<GameState> {
  name = 'Sleep';

  canExecute(state: GameState): boolean {
    return state.playerEnergy < 50;
  }

  execute(state: GameState): ExecutionStatus {
    state.playerEnergy = 100;
    return 'success';
  }

  applyEffects(state: GameState): GameState {
    const newState = state.clone();
    newState.playerEnergy = 100;
    return newState;
  }
}
```

### 3. Создайте составную задачу с методами

```typescript
import type { ICompoundTask, IMethod } from '@sentient-world/htn';

class LiveDayTask implements ICompoundTask<GameState> {
  name = 'LiveDay';

  getMethods(): IMethod<GameState>[] {
    return [
      {
        name: 'TiredAndHungry',
        preconditions: (state) => state.playerEnergy < 30 && state.isHungry,
        decompose: () => [new EatTask(), new SleepTask()],
      },
      {
        name: 'OnlyTired',
        preconditions: (state) => state.playerEnergy < 30,
        decompose: () => [new SleepTask()],
      },
      {
        name: 'OnlyHungry',
        preconditions: (state) => state.isHungry,
        decompose: () => [new EatTask()],
      },
      {
        name: 'DoNothing',
        preconditions: () => true, // fallback
        decompose: () => [],
      },
    ];
  }
}
```

### 4. Создайте и запустите агента

```typescript
import { Agent } from '@sentient-world/htn';

const state = new GameState(20, true); // устал и голоден
const rootTask = new LiveDayTask();
const agent = new Agent(rootTask);

// Каждый игровой тик
function gameLoop() {
  agent.tick(state);
  // состояние изменяется задачами автоматически
}
```

## Основные концепции

### Примитивные задачи (Primitive Tasks)

Атомарные действия, которые не могут быть разбиты на более мелкие:

- `canExecute(state)` — проверка возможности выполнения
- `execute(state)` — выполнение действия (изменяет реальное состояние)
- `applyEffects(state)` — симуляция эффектов для планирования (возвращает новое состояние)

**Важно:** `applyEffects` используется **только планировщиком** для предсказания будущего состояния. `execute` изменяет реальное состояние во время выполнения.

### Составные задачи (Compound Tasks)

Сложные задачи, которые разбиваются на подзадачи через методы:

- `getMethods()` — возвращает список методов в порядке приоритета

### Методы (Methods)

Способы декомпозиции составной задачи:

- `preconditions(state)` — проверка применимости метода
- `decompose(state)` — разбиение на подзадачи

Планировщик выбирает **первый метод**, чьи предусловия выполнены.

### Планировщик (Planner)

Рекурсивно декомпозирует корневую задачу до списка примитивных действий:

```typescript
import { Planner } from '@sentient-world/htn';

const planner = new Planner<GameState>();
const plan = planner.plan(rootTask, state);
// plan: [EatTask, SleepTask]
```

### Исполнитель (Executor)

Последовательно выполняет примитивные задачи из плана:

```typescript
import { Executor } from '@sentient-world/htn';

const executor = new Executor(plan);
const result = executor.tick(state); // 'success' | 'running' | 'failure'
```

Статусы выполнения:

- `'success'` — задача выполнена успешно
- `'running'` — задача ещё выполняется
- `'failure'` — задача провалилась

### Агент (Agent)

Автоматически управляет планированием и выполнением:

```typescript
import { Agent } from '@sentient-world/htn';

const agent = new Agent(rootTask);
agent.tick(state); // планирует и выполняет
```

Агент автоматически:

- Создаёт план при первом вызове `tick()`
- Перепланирует если план провалился или завершился
- Ограничивает количество попыток переплана (максимум 3)

## Примеры

### Вложенные составные задачи

```typescript
class PrepareSupperTask implements ICompoundTask<KitchenState> {
  name = 'PrepareSupper';

  getMethods(): IMethod<KitchenState>[] {
    return [
      {
        name: 'PastaAndSide',
        preconditions: (state) => state.ingredients.pasta && state.ingredients.rice,
        decompose: () => [
          new CookPastaTask(),
          new PrepareSideTask(), // ← вложенная составная задача
        ],
      },
    ];
  }
}
```

### Задачи с долгим выполнением

```typescript
class MoveToPointTask implements IPrimitiveTask<GameState> {
  name = 'MoveToPoint';
  private progress = 0;

  canExecute(state: GameState): boolean {
    return !state.isAtDestination;
  }

  execute(state: GameState): ExecutionStatus {
    this.progress += 0.1;

    if (this.progress >= 1) {
      state.position = this.targetPosition;
      return 'success';
    }

    return 'running'; // продолжаем выполнение на следующем тике
  }

  applyEffects(state: GameState): GameState {
    const newState = state.clone();
    newState.position = this.targetPosition;
    return newState;
  }
}
```

### Использование фабрик

```typescript
import { Agent, PlannerFactory, ExecutorFactory } from '@sentient-world/htn';

const plannerFactory = new PlannerFactory<GameState>();
const executorFactory = new ExecutorFactory<GameState>();

const agent = new Agent(rootTask, plannerFactory, executorFactory);
```
