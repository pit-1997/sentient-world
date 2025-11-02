# Contributing Guide

## Тестирование

### 1. Написание тест-кейсов

Тест-кейсы должны быть написаны на русском языке в формате утверждений **без слова "должен"**.

**✅ Правильно:**

```typescript
it('возвращает актора у дома', () => { ... });
it('если дистанция больше 5, возвращает false', () => { ... });
```

**❌ Неправильно:**

```typescript
it('должен вернуть актора у дома', () => { ... });
it('должен возвращать false если дистанция больше 5', () => { ... });
```

**Шаблон для условных утверждений:**

```
если <условие>, <утверждение>
```

### 2. Тестирование поведения, а не реализации

Тесты должны проверять **что делает код**, а не **как он это делает**. Тест-кейсы должны быть
написаны так, чтобы по ним можно было переписать реализацию с нуля на другом языке, не меняя описание тестов.

**✅ Правильно (проверяем поведение):**

```typescript
it('если персонаж находится в радиусе 5 от дома, возвращает true', () => {
  const state = createState({ distanceFromHome: 3 });
  expect(checker.isAtHome(state)).toBe(true);
});
```

**❌ Неправильно (проверяем реализацию):**

```typescript
it('вызывает метод geometry.getDistance с правильными параметрами', () => {
  checker.isAtHome(state);
  expect(geometry.getDistance).toHaveBeenCalledWith(...);
});
```

### 3. Arrange-Act-Assert (AAA)

Все тесты должны следовать паттерну AAA:

```typescript
it('возвращает успех при достижении цели', () => {
  // Arrange (подготовка)
  const task = new GoToPositionTask({ target }, deps);
  const state = createState({ position: target });

  // Act (действие)
  const result = task.execute(state);

  // Assert (проверка)
  expect(result).toBe('success');
});
```

---

## Структура модулей

### 1. Организация файлов

Каждый модуль (независимо от размера) должен содержать:

```
module-name/
  __tests__/           # Тесты модуля
    feature-a.spec.ts
    feature-b.spec.ts
  module-name.ts       # Реализация
  mocks.ts             # Моки и функции создания зависимостей
  index.ts             # Публичные экспорты
```

**Примеры модулей разного размера:**

Большой модуль:

```
world/
  __tests__/
  character/
  state/
  tasks/
  world.ts
  mocks.ts
  index.ts
```

Маленький модуль:

```
go-to-position-task/
  __tests__/
  go-to-position-task.ts
  mocks.ts
  index.ts
```

### 2. Файл mocks.ts

Каждый модуль должен экспортировать из `mocks.ts`:

1. **Замоканные версии сущностей** (если нужны другим модулям):

```typescript
export class MockedEngine implements IEngine {
  // ...
}
```

2. **Функцию создания зависимостей** с возможностью переопределения:

```typescript
export function getMockedGoToPositionTaskDeps(
  overrides: Partial<GoToPositionTaskDeps> = {}
): GoToPositionTaskDeps {
  return {
    actor: new MockedActor(defaultActorConstructorOptions),
    geometry: new Geometry(),
    ...overrides,
  };
}
```

**Использование:**

```typescript
// Дефолтные зависимости
const deps = getMockedGoToPositionTaskDeps();

// С переопределением
const deps = getMockedGoToPositionTaskDeps({
  actor: customActor,
});
```

### 3. Публичный API через index.ts

Из модуля наружу должны экспортироваться **только публичные сущности**, предназначенные для использования другими модулями.

**✅ Правильно:**

```typescript
// world/index.ts
export { World } from './world';
export type { WorldDeps } from './world';
export { Character } from './character';
export type { CharacterData, ICharacter } from './character';
```

**❌ Неправильно:**

```typescript
// Не экспортируем внутренние детали
export { WorldPrivateHelper } from './world';
export { InternalStateManager } from './state/internal';
```

---

## Соглашения по коду

### 1. Передача зависимостей в конструкторе

Зависимости классов передаются через параметр `deps` в конструкторе. **Запрещено** сохранять `deps` целиком в `this`.

**✅ Правильно:**

```typescript
export type GoToPositionTaskDeps = {
  actor: IActor;
  geometry: IGeometry;
};

export class GoToPositionTask {
  private readonly actor: IActor;
  private readonly geometry: IGeometry;

  constructor(deps: GoToPositionTaskDeps) {
    this.actor = deps.actor;
    this.geometry = deps.geometry;
  }
}
```

**❌ Неправильно:**

```typescript
export class GoToPositionTask {
  private readonly deps: GoToPositionTaskDeps; // ❌

  constructor(deps: GoToPositionTaskDeps) {
    this.deps = deps; // ❌
  }
}
```

**Обоснование:** Мы должны явно видеть все зависимости класса в объявлении полей.

### 2. Порядок параметров конструктора

Runtime-данные передаются **первыми параметрами**, `deps` **всегда последний**.

**✅ Правильно:**

```typescript
export class GoToPositionTask {
  constructor(
    options: GoToPositionTaskOptions, // runtime-данные
    deps: GoToPositionTaskDeps // зависимости (последний)
  ) {}
}

// Использование
new GoToPositionTask({ target: position }, { actor, geometry });
```

**❌ Неправильно:**

```typescript
export class GoToPositionTask {
  constructor(
    deps: GoToPositionTaskDeps, // ❌ deps не последний
    options: GoToPositionTaskOptions
  ) {}
}
```

### 3. Опциональные зависимости с дефолтными значениями

Если зависимость опциональна, используйте дефолтное значение в конструкторе:

```typescript
export type MethodDeps = {
  actor: IActor;
  scheduleChecker?: IScheduleChecker; // опциональная
};

export class Method {
  private readonly actor: IActor;
  private readonly scheduleChecker: IScheduleChecker;

  constructor(deps: MethodDeps) {
    this.actor = deps.actor;
    this.scheduleChecker = deps.scheduleChecker ?? new ScheduleChecker(); // дефолт
  }
}
```

---

## Дополнительные соглашения

### Именование

- Интерфейсы: `IEngine`, `IActor`, `IGeometry`
- Моки: `MockedEngine`, `MockedActor`
- Функции создания зависимостей: `getMocked<ModuleName>Deps`
- Типы зависимостей: `<ClassName>Deps`
