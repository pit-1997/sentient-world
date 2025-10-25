# @sentient-world/event-emitter

Строго типизированный EventEmitter для TypeScript с полной поддержкой дженериков.

## Особенности

- 🔒 **Полная типобезопасность** — TypeScript автоматически проверяет имена событий, параметры и возвращаемые значения
- 🎯 **Простой API** — всего 4 метода: `on`, `once`, `off`, `emit`
- 📦 **Легковесный** — минимум зависимостей, простая реализация
- 🚀 **Удобный DX** — автодополнение работает везде

## Установка

```bash
npm install @sentient-world/event-emitter
```

## Пример использования

```typescript
type GameLoopEvents = {
  update: (deltaTime: number) => void;
  render: () => void;
  pause: () => void;
  resume: () => void;
};

const gameLoop = new EventEmitter<GameLoopEvents>();

// Регистрируем системы
gameLoop.on('update', (dt) => {
  physics.update(dt);
  ai.update(dt);
});

gameLoop.on('render', () => {
  renderer.render();
});

// Используем once для инициализации
gameLoop.once('update', () => {
  console.log('First frame!');
});

// Игровой цикл
let lastTime = performance.now();

function loop() {
  const currentTime = performance.now();
  const deltaTime = currentTime - lastTime;
  lastTime = currentTime;

  gameLoop.emit('update', deltaTime);
  gameLoop.emit('render');

  requestAnimationFrame(loop);
}

loop();

// Отписка при необходимости
const pauseHandler = () => {
  console.log('Game paused');
};

gameLoop.on('pause', pauseHandler);
gameLoop.off('pause', pauseHandler); // Отписываемся
```

## Типобезопасность

EventEmitter обеспечивает полную типобезопасность:

```typescript
type Events = {
  tick: (n: number) => string;
};

const emitter = new EventEmitter<Events>();

// ✅ Правильно
emitter.on('tick', (n: number) => `Tick ${n}`);
emitter.emit('tick', 42);

// ❌ Ошибка компиляции: неверное имя события
emitter.on('tock', () => {});

// ❌ Ошибка компиляции: неверный тип параметра
emitter.on('tick', (n: string) => n);

// ❌ Ошибка компиляции: неверный тип аргумента
emitter.emit('tick', 'hello');

// ❌ Ошибка компиляции: отсутствует обязательный аргумент
emitter.emit('tick');
```
