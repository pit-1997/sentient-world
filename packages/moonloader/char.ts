import type { PedHandle, VehicleHandle } from './handles';

/** Создает персонажа в заданных координатах с указанной моделью и поведением пешехода */
export declare function createChar(
  pedType: number,
  modelId: number,
  x: number,
  y: number,
  z: number
): PedHandle;

/** Создает персонажа в транспорте */
export declare function createCharInsideCar(
  car: VehicleHandle,
  pedType: number,
  modelId: number
): PedHandle;

/** Создает персонажа как пассажира */
export declare function createCharAsPassenger(
  car: VehicleHandle,
  pedType: number,
  modelId: number,
  seatId: number
): PedHandle;

/** Удаляет персонажа из игры */
export declare function deleteChar(ped: PedHandle): void;

/** Проверяет существование персонажа */
export declare function doesCharExist(ped: PedHandle): boolean;

/** Устанавливает угол поворота персонажа */
export declare function setCharHeading(ped: PedHandle, angle: number): void;

/** Получает угол поворота персонажа */
export declare function getCharHeading(ped: PedHandle): number;

/** Получает координаты персонажа */
export declare function getCharCoordinates(
  ped: PedHandle
): LuaMultiReturn<[number, number, number]>;

/** Устанавливает координаты персонажа */
export declare function setCharCoordinates(ped: PedHandle, x: number, y: number, z: number): void;

/** Указывает игре, что персонажа нельзя удалять */
export declare function dontRemoveChar(ped: PedHandle): void;

/** Устанавливает персонажу колизию */
export declare function setLoadCollisionForCharFlag(ped: PedHandle, enable: boolean): void;

/** Проверяет смерть персонажа */
export declare function isCharDead(ped: PedHandle): boolean;

/** Проверяет, жив ли персонаж */
export declare function isCharPlayingAnim(ped: PedHandle, animName: string): boolean;

/** Устанавливает здоровье персонажу */
export declare function setCharHealth(ped: PedHandle, health: number): void;

/** Получает здоровье персонажа */
export declare function getCharHealth(ped: PedHandle): number;

/** Устанавливает броню персонажу */
export declare function setCharArmour(ped: PedHandle, armour: number): void;

/** Получает броню персонажа */
export declare function getCharArmour(ped: PedHandle): number;

/** Дает персонажу оружие */
export declare function giveWeaponToChar(ped: PedHandle, weaponId: number, ammo: number): void;

/** Удаляет оружие у персонажа */
export declare function removeWeaponFromChar(ped: PedHandle, weaponId: number): void;

/** Устанавливает текущее оружие персонажа */
export declare function setCurrentCharWeapon(ped: PedHandle, weaponId: number): void;

/** Получает текущее оружие персонажа */
export declare function getCurrentCharWeapon(ped: PedHandle): number;

/** Устанавливает точность стрельбы персонажа */
export declare function setCharAccuracy(ped: PedHandle, accuracy: number): void;

/** Заставляет персонажа сесть в машину в качестве водителя */
export declare function taskEnterCarAsDriver(
  ped: PedHandle,
  car: VehicleHandle,
  timeout: number
): void;

/** Заставляет персонажа сесть в машину в качестве пассажира */
export declare function taskEnterCarAsPassenger(
  ped: PedHandle,
  car: VehicleHandle,
  timeout: number,
  seatId: number
): void;

/** Заставляет персонажа покинуть транспорт */
export declare function taskLeaveAnyCar(ped: PedHandle): void;

/** Заставляет персонажа идти к координатам */
export declare function taskGoToCoordAnyMeans(
  ped: PedHandle,
  x: number,
  y: number,
  z: number,
  mode: number,
  radius: number
): void;

/** Заставляет персонажа бежать к указанному персонажу */
export declare function taskGotoChar(
  ped: PedHandle,
  targetPed: PedHandle,
  timelimit: number,
  stopWithinRadius: number
): void;

/** Заставляет персонажа следовать за целью */
export declare function taskFollowPathNodesToCoord(
  ped: PedHandle,
  x: number,
  y: number,
  z: number,
  mode: number,
  timeout: number
): void;

/** Проиграть анимацию */
export declare function taskPlayAnim(
  ped: PedHandle,
  animName: string,
  ifpName: string,
  speed: number,
  loop: boolean,
  lockX: boolean,
  lockY: boolean,
  lockF: boolean,
  time: number
): void;

/** Остановить анимацию */
export declare function taskDie(ped: PedHandle): void;

/** Заставляет персонажа бродить */
export declare function taskWanderStandard(ped: PedHandle): void;

/** Заставляет персонажа атаковать */
export declare function taskCombat(ped: PedHandle, targetPed: PedHandle): void;

/** Очищает задачи персонажа */
export declare function clearCharTasks(ped: PedHandle): void;

/** Очищает задачи персонажа немедленно */
export declare function clearCharTasksImmediately(ped: PedHandle): void;

/** Проверяет, сидит ли персонаж в каком-либо транспорте */
export declare function isCharInAnyCar(ped: PedHandle): boolean;

/** Проверяет, сидит ли персонаж в конкретном транспорте */
export declare function isCharInCar(ped: PedHandle, car: VehicleHandle): boolean;

/** Проверяет, находится ли персонаж в области */
export declare function isCharInArea2d(
  ped: PedHandle,
  x1: number,
  y1: number,
  x2: number,
  y2: number,
  sphere: boolean
): boolean;

/** Проверяет, находится ли персонаж в области 3D */
export declare function isCharInArea3d(
  ped: PedHandle,
  x1: number,
  y1: number,
  z1: number,
  x2: number,
  y2: number,
  z2: number,
  sphere: boolean
): boolean;

/** Получает транспорт, в котором находится персонаж */
export declare function getCarCharIsUsing(ped: PedHandle): VehicleHandle;

/** Ищет случайного персонажа в заданных координатах в пределах указанного радиуса */
export declare function findAllRandomCharsInSphere(
  x: number,
  y: number,
  z: number,
  radius: number,
  findNext: boolean,
  skipDead: boolean
): LuaMultiReturn<[boolean, PedHandle?]>;

/** Устанавливает видимость персонажа */
export declare function setCharVisible(ped: PedHandle, visible: boolean): void;

/** Устанавливает деньги персонажу */
export declare function setCharMoney(ped: PedHandle, money: number): void;

/** Замораживает персонажа */
export declare function freezeCharPosition(ped: PedHandle, freeze: boolean): void;

/** Устанавливает невидимость для персонажа */
export declare function setCharProofs(
  ped: PedHandle,
  bullet: boolean,
  fire: boolean,
  explosion: boolean,
  collision: boolean,
  melee: boolean
): void;

/** Устанавливает можно ли сбивать персонажа с ног */
export declare function setCharCanBeKnockedOffBike(ped: PedHandle, state: boolean): void;

/** Устанавливает можно ли вытащить персонажа из машины */
export declare function setCharCanBeDraggedOut(ped: PedHandle, state: boolean): void;

/** Устанавливает можно ли застрелить персонажа в машине */
export declare function setCharCanBeShotInVehicle(ped: PedHandle, state: boolean): void;

/** Возвращает скорость персонажа */
export declare function getCharSpeed(ped: PedHandle): number;

/** Устанавливает максимальное здоровье */
export declare function setCharMaxHealth(ped: PedHandle, health: number): void;
