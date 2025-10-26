# @sentient-world/htn

Реализация HTN (Hierarchical Task Network) системы планирования.

## Описание

HTN (Hierarchical Task Network) — это алгоритм планирования, который разбивает сложные задачи на простые действия. Система состоит из трёх основных компонентов:

- **Планировщик (Planner)** — разбивает составные задачи на примитивные действия
- **Исполнитель (Executor)** — последовательно выполняет план действий
- **Агент (Agent)** — объединяет планировщик и исполнителя, автоматически перепланируя при необходимости

## Ключевые особенности

- **Разделение контекста и состояния** — контекст содержит сервисы, состояние содержит данные
- **Архитектурная защита** — планировщик работает только с состоянием, исключая случайные побочные эффекты
- **Типобезопасность** — полная поддержка TypeScript с выводом типов

## Установка

```bash
npm install @sentient-world/htn
```

## Быстрый старт

### 1. Определите состояние мира и контекст

```typescript
import type { IContext } from '@sentient-world/htn';

// Состояние мира - только данные
interface GameState {
  playerEnergy: number;
  isHungry: boolean;
  position: Vector3;
}

// Контекст - состояние + сервисы
interface GameContext extends IContext<GameState> {
  state: GameState;
  services: {
    actor: Actor;
    world: World;
    ui: UIManager;
  };
  cloneState(): GameState;
}

function createGameContext(actor: Actor, world: World): GameContext {
  return {
    state: {
      playerEnergy: actor.getEnergy(),
      isHungry: actor.isHungry(),
      position: actor.getPosition(),
    },
    services: { actor, world, ui: new UIManager() },
    cloneState() {
      return { ...this.state };
    },
  };
}
```

### 2. Создайте примитивные задачи

```typescript
import type { IPrimitiveTask, ExecutionStatus } from '@sentient-world/htn';

class EatTask implements IPrimitiveTask<GameContext> {
  name = 'Eat';

  canExecute(state: GameState): boolean {
    return state.isHungry;
  }

  execute(context: GameContext): ExecutionStatus {
    // Используем сервисы для реального действия
    const success = context.services.actor.eat();
    if (success) {
      context.services.ui.showMessage('Player is eating...');
      return 'success';
    }
    return 'failure';
  }

  applyEffects(state: GameState): GameState {
    // Только симуляция для планирования - никаких сервисов!
    return {
      ...state,
      isHungry: false,
      playerEnergy: state.playerEnergy + 20,
    };
  }
}

class SleepTask implements IPrimitiveTask<GameContext> {
  name = 'Sleep';

  canExecute(state: GameState): boolean {
    return state.playerEnergy < 50;
  }

  execute(context: GameContext): ExecutionStatus {
    context.services.actor.sleep();
    context.services.ui.showMessage('Player is sleeping...');
    return 'success';
  }

  applyEffects(state: GameState): GameState {
    return {
      ...state,
      playerEnergy: 100,
    };
  }
}
```

### 3. Создайте составную задачу с методами

```typescript
import type { ICompoundTask, IMethod } from '@sentient-world/htn';

class LiveDayTask implements ICompoundTask<GameContext> {
  name = 'LiveDay';

  getMethods(): IMethod<GameContext>[] {
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

const actor = new Actor();
const world = new World();
const rootTask = new LiveDayTask();
const agent = new Agent(rootTask);

// Каждый игровой тик
function gameLoop() {
  const context = createGameContext(actor, world);
  agent.tick(context);
}
```

## Основные концепции

### Разделение контекста и состояния

**Ключевая особенность:** HTN строго разделяет контекст (сервисы) и состояние (данные).

```typescript
interface IContext<TState> {
  state: TState; // Данные для планирования
  cloneState(): TState; // Клонирование состояния
  // + любые сервисы на усмотрение реализации
}
```

- **Состояние (State)** — снимок данных мира на момент планирования
- **Контекст (Context)** — содержит состояние + ссылки на сервисы/объекты
- **Планировщик** работает только с состоянием (защита от побочных эффектов)
- **Исполнитель** использует полный контекст (доступ к сервисам)

### Примитивные задачи (Primitive Tasks)

Атомарные действия, которые не могут быть разбиты на более мелкие:

- `canExecute(state)` — проверка возможности выполнения (только состояние)
- `execute(context)` — выполнение действия (полный контекст с сервисами)
- `applyEffects(state)` — симуляция эффектов для планирования (только состояние)

**Важно:** `applyEffects` получает только состояние — планировщик **не может** случайно вызвать реальные действия.

### Составные задачи (Compound Tasks)

Сложные задачи, которые разбиваются на подзадачи через методы:

- `getMethods()` — возвращает список методов в порядке приоритета

### Методы (Methods)

Способы декомпозиции составной задачи:

- `preconditions(state)` — проверка применимости метода (только состояние)
- `decompose(state)` — разбиение на подзадачи (только состояние)

Планировщик выбирает **первый метод**, чьи предусловия выполнены.

### Планировщик (Planner)

Рекурсивно декомпозирует корневую задачу до списка примитивных действий:

```typescript
import { Planner } from '@sentient-world/htn';

const planner = new Planner<GameContext>();
const plan = planner.plan(rootTask, context);
// plan: [EatTask, SleepTask]
```

Планировщик передаёт в `applyEffects` и `preconditions` только состояние, что исключает случайные побочные эффекты.

### Исполнитель (Executor)

Последовательно выполняет примитивные задачи из плана:

```typescript
import { Executor } from '@sentient-world/htn';

const executor = new Executor<GameContext>(plan);
const result = executor.tick(context); // 'success' | 'running' | 'failure'
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
agent.tick(context); // планирует и выполняет
```

Агент автоматически:

- Создаёт план при первом вызове `tick()`
- Перепланирует если план провалился или завершился
- Ограничивает количество попыток переплана (максимум 3)

## Вложенные составные задачи

```typescript
class PrepareSupperTask implements ICompoundTask<KitchenContext> {
  name = 'PrepareSupper';

  getMethods(): IMethod<KitchenContext>[] {
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

## Задачи с долгим выполнением

```typescript
class MoveToPointTask implements IPrimitiveTask<GameContext> {
  name = 'MoveToPoint';
  private progress = 0;

  canExecute(state: GameState): boolean {
    return !state.isAtDestination;
  }

  execute(context: GameContext): ExecutionStatus {
    this.progress += 0.1;
    context.services.ui.updateProgress(this.progress);

    if (this.progress >= 1) {
      return 'success';
    }

    return 'running'; // продолжаем выполнение на следующем тике
  }

  applyEffects(state: GameState): GameState {
    return { ...state, position: this.targetPosition };
  }
}
```
