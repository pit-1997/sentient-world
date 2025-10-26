# @sentient-world/htn

Простая и эффективная реализация HTN (Hierarchical Task Network) системы планирования для управления поведением NPC.

## Что такое HTN

HTN (Hierarchical Task Network) — это алгоритм планирования, который разбивает сложные задачи на простые действия через иерархическую декомпозицию. Вместо поиска пути к цели, HTN описывает **как** достигать цели через методы и подзадачи.

## Архитектурные принципы

### Простота состояния

Состояние — это обычный объект с данными, без методов:

```typescript
interface GameState {
  health: number;
  position: Point;
  inventory: string[];
}
```

### Dependency Injection

Сервисы и зависимости передаются в конструкторе задач:

```typescript
class MoveTask implements IPrimitiveTask<GameState> {
  constructor(private actor: IActor) {}

  execute(state: GameState): ExecutionStatus {
    return this.actor.moveTo(state.targetPosition);
  }
}
```

### Разделение планирования и выполнения

- **Планирование** (`canExecute`, `applyEffects`, `preconditions`) — работает только с данными состояния
- **Выполнение** (`execute`) — может использовать сервисы и изменять мир

## Компоненты системы

### Примитивные задачи

Атомарные действия, которые не разбиваются на подзадачи:

```typescript
class EatTask implements IPrimitiveTask<GameState> {
  constructor(private actor: IActor) {}

  canExecute(state: GameState): boolean {
    return state.hasFood && state.hunger > 50;
  }

  execute(state: GameState): ExecutionStatus {
    return this.actor.eat() ? 'success' : 'failure';
  }

  applyEffects(state: GameState): GameState {
    return { ...state, hunger: 0, hasFood: false };
  }
}
```

### Составные задачи

Сложные задачи, которые разбиваются на подзадачи через методы:

```typescript
class SurviveTask implements ICompoundTask<GameState> {
  name = 'Survive';

  getMethods(): IMethod<GameState>[] {
    return [
      {
        name: 'EatWhenHungry',
        preconditions: (state) => state.hunger > 50 && state.hasFood,
        decompose: () => [new EatTask(this.actor)],
      },
      {
        name: 'FindFood',
        preconditions: (state) => state.hunger > 50 && !state.hasFood,
        decompose: () => [new FindFoodTask(this.actor)],
      },
    ];
  }
}
```

### Планировщик

Рекурсивно декомпозирует задачи до примитивных действий:

```typescript
const planner = new Planner<GameState>();
const plan = planner.plan(rootTask, currentState);
// Результат: [FindFoodTask, EatTask]
```

### Исполнитель

Последовательно выполняет план:

```typescript
const executor = new Executor(plan);
const result = executor.tick(currentState); // 'success' | 'running' | 'failure'
```

### Агент

Автоматически управляет планированием и выполнением:

```typescript
const agent = new Agent(new SurviveTask());

// В игровом цикле
function gameLoop() {
  const state = getCurrentGameState();
  agent.tick(state); // планирует и выполняет автоматически
}
```

## Быстрый старт

```typescript
import { Agent } from '@sentient-world/htn';

// 1. Определите состояние
interface GameState {
  health: number;
  position: Point;
  hasWeapon: boolean;
}

// 2. Создайте примитивные задачи
class AttackTask implements IPrimitiveTask<GameState> {
  constructor(private actor: IActor) {}

  canExecute(state: GameState): boolean {
    return state.hasWeapon && state.health > 0;
  }

  execute(state: GameState): ExecutionStatus {
    return this.actor.attack() ? 'success' : 'failure';
  }

  applyEffects(state: GameState): GameState {
    return { ...state, health: state.health - 10 };
  }
}

// 3. Создайте составную задачу
class FightTask implements ICompoundTask<GameState> {
  constructor(private actor: IActor) {}

  name = 'Fight';

  getMethods(): IMethod<GameState>[] {
    return [
      {
        name: 'AttackWithWeapon',
        preconditions: (state) => state.hasWeapon,
        decompose: () => [new AttackTask(this.actor)],
      },
    ];
  }
}

// 4. Создайте и запустите агента
const actor = new Actor();
const agent = new Agent(new FightTask(actor));

// В игровом цикле
const state = { health: 100, position: { x: 0, y: 0 }, hasWeapon: true };
agent.tick(state);
```

## Ключевые особенности

- **Типобезопасность** — полная поддержка TypeScript
- **Простота** — состояние это обычные объекты
- **Производительность** — эффективное клонирование состояния
- **Гибкость** — любые зависимости через DI
- **Автоматическое переplanирование** — агент перестраивает план при провале

## Установка

```bash
npm install @sentient-world/htn
```

## Важные моменты

### Чистота планирования

Методы планирования (`canExecute`, `applyEffects`, `preconditions`) должны работать **только с данными состояния**. Не обращайтесь к сервисам в этих методах — это может нарушить корректность планирования.

```typescript
// ❌ Плохо - обращение к сервису при планировании
canExecute(state: GameState): boolean {
  return state.hasWeapon && this.actor.isAlive(); // опасно!
}

// ✅ Хорошо - только данные состояния
canExecute(state: GameState): boolean {
  return state.hasWeapon && state.health > 0;
}
```

### Immutable состояние

Всегда возвращайте новое состояние в `applyEffects`:

```typescript
applyEffects(state: GameState): GameState {
  return { ...state, health: state.health - 10 }; // новый объект
}
```

Эта архитектура обеспечивает простоту использования, высокую производительность и надёжность планирования для создания сложного поведения NPC.
