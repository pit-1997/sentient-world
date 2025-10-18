declare module 'vkeys' {
  export const VK_N: symbol;
  export const VK_Y: symbol;
}

type VKey = (typeof import('vkeys'))[keyof typeof import('vkeys')];

declare const PLAYER_PED: Ped;

/**
 * Возвращает расстояние между двумя точками в 3-х мерном пространстве
 */
declare function getDistanceBetweenCoords3d(
  x1: number,
  y1: number,
  z1: number,
  x2: number,
  y2: number,
  z2: number
): number;

/**
 * Возвращает текущее внутриигровое время
 * @returns Кортеж [часы, минуты], например [20, 7] для времени 20:07
 */
declare function getTimeOfDay(): LuaMultiReturn<[hours: number, minutes: number]>;

/**
 * Загружает указанную модель
 * @param modelId номер модели
 */
declare function requestModel(modelId: number): boolean;

/** Загрузка ранее запрошенных моделей */
declare function loadAllModelsNow(): void;

/**
 * Помечает загруженную ранее модель как более ненужную для скриптового движка
 * @param modelId номер модели
 */
declare function markModelAsNoLongerNeeded(modelId: number): void;

/**
 * Выводит текст в файл moonloader.log и вызывает событие onScriptMessage
 * @param text - текст
 */
declare function print(text: string): void;

/**
 * Выводит текст в нижней части экрана, минуя очередь
 * @param text - текст
 * @param timeInMs - время отображения текста
 */
declare function printStringNow(text: string, timeInMs: number): void;

/**
 * Приостанавливает выполнение скрипта
 * @param timeInMs - время приостановки в миллисекундах
 */
declare function wait(timeInMs: number): void;

/** Проверяет была ли клавиша нажата */
declare function wasKeyPressed(key: VKey): boolean;

declare type Ped = symbol;

/** Создает персонажа в заданных координатах с указанной моделью и поведением пешехода */
declare function createChar(pedType: number, modelId: number, x: number, y: number, z: number): Ped;

/** Возвращает Z-угол(поворот) персонажа */
declare function getCharHeading(ped: Ped): number;

/**
 * Устанавливает угол поворота персонажа
 * @param ped - персонаж, которого нужно повернуть
 * @param angle - угол на который его нужно повернуть
 */
declare function setCharHeading(ped: Ped, angle: number): void;

/**
 * Возвращает координаты персонажа
 */
declare function getCharCoordinates(ped: Ped): LuaMultiReturn<[x: number, y: number, z: number]>;

/**
 * Указывает игре, что персонажа нельзя удалять
 * @param ped - персонаж, которого нельзя удалять
 */
declare function dontRemoveChar(ped: Ped): void;

/**
 * Устанавливает персонажу колизию
 * @param ped - персонаж, для которого нужно установить колизию
 * @param enable - включить или отключить
 */
declare function setLoadCollisionForCharFlag(ped: Ped, enable: boolean): void;

/**
 * Проверяет существование персонажа
 * @param ped - персонаж которого нужно проверить
 */
declare function doesCharExist(ped: Ped): boolean;

/**
 * Удаляет персонажа из игры
 * @param ped - персонаж, которого нужно удалить
 */
declare function deleteChar(ped: Ped): void;

/**
 * Устанавливает видимость персонажа
 * @param ped - персонаж
 * @param visible - true для видимого, false для невидимого
 */
declare function setCharVisible(ped: Ped, visible: boolean): void;

/**
 * Устанавливает персонажу колизию
 * @param ped - персонаж, для которого нужно установить колизию
 * @param collision - true для включения колизии, false для отключения
 */
declare function setCharCollision(ped: Ped, collision: boolean): void;

/**
 * Устанавливает защиту персонажа от различных типов урона
 * @param ped - персонаж
 * @param BP - Bullet Proof (защита от пуль)
 * @param FP - Fire Proof (защита от огня)
 * @param EP - Explosion Proof (защита от взрывов)
 * @param CP - Collision Proof (защита от столкновений)
 * @param MP - Melee Proof (защита от ближнего боя)
 */
declare function setCharProofs(
  ped: Ped,
  BP: boolean,
  FP: boolean,
  EP: boolean,
  CP: boolean,
  MP: boolean
): void;

/**
 * Делает персонажа неуязвимым для атак других NPC.
 * Персонаж не будет автоматически выбираться в качестве цели
 * @param ped - персонаж, которого нельзя атаковать
 * @param untargetable - true чтобы сделать персонажа неуязвимым для таргетинга
 */
declare function setCharNeverTargetted(ped: Ped, untargetable: boolean): void;

/**
 * Замораживает позицию персонажа, блокируя его перемещение
 * @param ped - персонаж, которого нужно заморозить
 * @param locked - true для заморозки, false для разморозки
 */
declare function freezeCharPosition(ped: Ped, locked: boolean): void;

/**
 * Ищет случайного персонажа в заданных координатах в пределах указанного радиуса
 * @param x
 * @param y
 * @param z
 * @param radius - радиус поиска
 * @param findNext - искать следующего. При значении false всегда будет возвращать первого персонажа в пуле
 * @param skipDead пропускать мёртвых
 */
declare function findAllRandomCharsInSphere(
  x: number,
  y: number,
  z: number,
  radius: number,
  findNext: boolean,
  skipDead: boolean
): LuaMultiReturn<[boolean, Ped?]>;

/**
 * Отменяет все задачи, которые были назначены на персонажа
 */
declare function clearCharTasks(ped: Ped): void;

/**
 * Заставляет персонажа бесцельно бродить
 */
declare function taskWanderStandard(ped: Ped): void;

/**
 * Заставляет персонажа бежать к указанному персонажу
 * @param ped - кому нужно бежать
 * @param targetPed - к кому бежать, цель
 * @param timeLimit
 *    - лимит по времени. Если задача не завершится за указанное время,
 *      персонажа телепортирует к точке позади цели
 * @param stopWithinRadius - в каком радиусе от цели можно остановиться
 */
declare function taskGotoChar(
  ped: Ped,
  targetPed: Ped,
  timelimit: number,
  stopWithinRadius: number
): void;

declare class lua_thread<Args extends unknown[]> {
  /** Создаёт новый поток и сразу же запускает его с указанными параметрами */
  static create<Args extends unknown[] = []>(
    thread: (...args: Args) => void,
    ...args: Args
  ): lua_thread<Args>;
  /** Создаёт новый поток в состоянии ожидания запуска. Такой поток не начнёт выполнение сразу же после создания */
  static create_suspended<Args extends unknown[] = []>(
    thread: (...args: Args) => void
  ): lua_thread<Args>;
  /** Выполняет замороженный, выполняющийся или завершённый поток с начала */
  run(...args: Args): void;
  /** Принудительно завершает поток */
  terminate(): void;
  /** Возвращает статус потока */
  status(): 'dead' | 'suspended' | 'running' | 'yielded' | 'error';
  /** Определяет статус завершённости потока */
  readonly dead: boolean;
  /**
   * Определяет исполнение потока во время паузы игры. Чтение/запись.
   * true - выполнять во время паузы, false - не выполнять.
   */
  work_in_pause: boolean;
}

type Events = {
  onScriptTerminate: () => void;
};

type EventCallback<Event extends keyof Events> = (...args: Parameters<Events[Event]>) => void;

declare function addEventHandler<Event extends keyof Events>(
  event: Event,
  callback: EventCallback<Event>
): void;
