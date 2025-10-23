import type { PedHandle, VehicleHandle } from './handles';

// Декларируем глобальный объект Lua
declare const _G: any;

/** Создает персонажа в заданных координатах с указанной моделью и поведением пешехода */
declare function CreateChar(
  pedType: number,
  modelId: number,
  x: number,
  y: number,
  z: number
): PedHandle;
export const createChar: typeof CreateChar = _G.createChar;

/** Создает персонажа в транспорте */
declare function CreateCharInsideCar(
  car: VehicleHandle,
  pedType: number,
  modelId: number
): PedHandle;
export const createCharInsideCar: typeof CreateCharInsideCar = _G.createCharInsideCar;

/** Создает персонажа как пассажира */
declare function CreateCharAsPassenger(
  car: VehicleHandle,
  pedType: number,
  modelId: number,
  seatId: number
): PedHandle;
export const createCharAsPassenger: typeof CreateCharAsPassenger = _G.createCharAsPassenger;

/** Удаляет персонажа из игры */
declare function DeleteChar(ped: PedHandle): void;
export const deleteChar: typeof DeleteChar = _G.deleteChar;

/** Проверяет существование персонажа */
declare function DoesCharExist(ped: PedHandle): boolean;
export const doesCharExist: typeof DoesCharExist = _G.doesCharExist;

/** Устанавливает угол поворота персонажа */
declare function SetCharHeading(ped: PedHandle, angle: number): void;
export const setCharHeading: typeof SetCharHeading = _G.setCharHeading;

/** Получает угол поворота персонажа */
declare function GetCharHeading(ped: PedHandle): number;
export const getCharHeading: typeof GetCharHeading = _G.getCharHeading;

/** Получает координаты персонажа */
declare function GetCharCoordinates(
  ped: PedHandle
): LuaMultiReturn<[number, number, number]>;
export const getCharCoordinates: typeof GetCharCoordinates = _G.getCharCoordinates;

/** Устанавливает координаты персонажа */
declare function SetCharCoordinates(ped: PedHandle, x: number, y: number, z: number): void;
export const setCharCoordinates: typeof SetCharCoordinates = _G.setCharCoordinates;

/** Указывает игре, что персонажа нельзя удалять */
declare function DontRemoveChar(ped: PedHandle): void;
export const dontRemoveChar: typeof DontRemoveChar = _G.dontRemoveChar;

/** Устанавливает персонажу колизию */
declare function SetLoadCollisionForCharFlag(ped: PedHandle, enable: boolean): void;
export const setLoadCollisionForCharFlag: typeof SetLoadCollisionForCharFlag = _G.setLoadCollisionForCharFlag;

/** Проверяет смерть персонажа */
declare function IsCharDead(ped: PedHandle): boolean;
export const isCharDead: typeof IsCharDead = _G.isCharDead;

/** Проверяет, жив ли персонаж */
declare function IsCharPlayingAnim(ped: PedHandle, animName: string): boolean;
export const isCharPlayingAnim: typeof IsCharPlayingAnim = _G.isCharPlayingAnim;

/** Устанавливает здоровье персонажу */
declare function SetCharHealth(ped: PedHandle, health: number): void;
export const setCharHealth: typeof SetCharHealth = _G.setCharHealth;

/**
 * Устанавливает персонажу колизию
 * @param ped - персонаж, для которого нужно установить колизию
 * @param collision - true для включения колизии, false для отключения
 */
declare function SetCharCollision(ped: PedHandle, collision: boolean): void;
export const setCharCollision: typeof SetCharCollision = _G.setCharCollision;

/**
 * Делает персонажа неуязвимым для атак других NPC.
 * Персонаж не будет автоматически выбираться в качестве цели
 * @param ped - персонаж, которого нельзя атаковать
 * @param untargetable - true чтобы сделать персонажа неуязвимым для таргетинга
 */
declare function SetCharNeverTargetted(ped: PedHandle, untargetable: boolean): void;
export const setCharNeverTargetted: typeof SetCharNeverTargetted = _G.setCharNeverTargetted;

/** Получает здоровье персонажа */
declare function GetCharHealth(ped: PedHandle): number;
export const getCharHealth: typeof GetCharHealth = _G.getCharHealth;

/** Устанавливает броню персонажу */
declare function SetCharArmour(ped: PedHandle, armour: number): void;
export const setCharArmour: typeof SetCharArmour = _G.setCharArmour;

/** Получает броню персонажа */
declare function GetCharArmour(ped: PedHandle): number;
export const getCharArmour: typeof GetCharArmour = _G.getCharArmour;

/** Дает персонажу оружие */
declare function GiveWeaponToChar(ped: PedHandle, weaponId: number, ammo: number): void;
export const giveWeaponToChar: typeof GiveWeaponToChar = _G.giveWeaponToChar;

/** Удаляет оружие у персонажа */
declare function RemoveWeaponFromChar(ped: PedHandle, weaponId: number): void;
export const removeWeaponFromChar: typeof RemoveWeaponFromChar = _G.removeWeaponFromChar;

/** Устанавливает текущее оружие персонажа */
declare function SetCurrentCharWeapon(ped: PedHandle, weaponId: number): void;
export const setCurrentCharWeapon: typeof SetCurrentCharWeapon = _G.setCurrentCharWeapon;

/** Получает текущее оружие персонажа */
declare function GetCurrentCharWeapon(ped: PedHandle): number;
export const getCurrentCharWeapon: typeof GetCurrentCharWeapon = _G.getCurrentCharWeapon;

/** Устанавливает точность стрельбы персонажа */
declare function SetCharAccuracy(ped: PedHandle, accuracy: number): void;
export const setCharAccuracy: typeof SetCharAccuracy = _G.setCharAccuracy;

/** Заставляет персонажа сесть в машину в качестве водителя */
declare function TaskEnterCarAsDriver(
  ped: PedHandle,
  car: VehicleHandle,
  timeout: number
): void;
export const taskEnterCarAsDriver: typeof TaskEnterCarAsDriver = _G.taskEnterCarAsDriver;

/** Заставляет персонажа сесть в машину в качестве пассажира */
declare function TaskEnterCarAsPassenger(
  ped: PedHandle,
  car: VehicleHandle,
  timeout: number,
  seatId: number
): void;
export const taskEnterCarAsPassenger: typeof TaskEnterCarAsPassenger = _G.taskEnterCarAsPassenger;

/** Заставляет персонажа покинуть транспорт */
declare function TaskLeaveAnyCar(ped: PedHandle): void;
export const taskLeaveAnyCar: typeof TaskLeaveAnyCar = _G.taskLeaveAnyCar;

/** Заставляет персонажа идти к координатам */
declare function TaskGoToCoordAnyMeans(
  ped: PedHandle,
  x: number,
  y: number,
  z: number,
  mode: number,
  radius: number
): void;
export const taskGoToCoordAnyMeans: typeof TaskGoToCoordAnyMeans = _G.taskGoToCoordAnyMeans;

/** Заставляет персонажа бежать к указанному персонажу */
declare function TaskGotoChar(
  ped: PedHandle,
  targetPed: PedHandle,
  timelimit: number,
  stopWithinRadius: number
): void;
export const taskGotoChar: typeof TaskGotoChar = _G.taskGotoChar;

/** Заставляет персонажа следовать за целью */
declare function TaskFollowPathNodesToCoord(
  ped: PedHandle,
  x: number,
  y: number,
  z: number,
  mode: number,
  timeout: number
): void;
export const taskFollowPathNodesToCoord: typeof TaskFollowPathNodesToCoord = _G.taskFollowPathNodesToCoord;

/** Проиграть анимацию */
declare function TaskPlayAnim(
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
export const taskPlayAnim: typeof TaskPlayAnim = _G.taskPlayAnim;

/** Остановить анимацию */
declare function TaskDie(ped: PedHandle): void;
export const taskDie: typeof TaskDie = _G.taskDie;

/** Заставляет персонажа бродить */
declare function TaskWanderStandard(ped: PedHandle): void;
export const taskWanderStandard: typeof TaskWanderStandard = _G.taskWanderStandard;

/** Заставляет персонажа атаковать */
declare function TaskCombat(ped: PedHandle, targetPed: PedHandle): void;
export const taskCombat: typeof TaskCombat = _G.taskCombat;

/** Очищает задачи персонажа */
declare function ClearCharTasks(ped: PedHandle): void;
export const clearCharTasks: typeof ClearCharTasks = _G.clearCharTasks;

/** Очищает задачи персонажа немедленно */
declare function ClearCharTasksImmediately(ped: PedHandle): void;
export const clearCharTasksImmediately: typeof ClearCharTasksImmediately = _G.clearCharTasksImmediately;

/** Проверяет, сидит ли персонаж в каком-либо транспорте */
declare function IsCharInAnyCar(ped: PedHandle): boolean;
export const isCharInAnyCar: typeof IsCharInAnyCar = _G.isCharInAnyCar;

/** Проверяет, сидит ли персонаж в конкретном транспорте */
declare function IsCharInCar(ped: PedHandle, car: VehicleHandle): boolean;
export const isCharInCar: typeof IsCharInCar = _G.isCharInCar;

/** Проверяет, находится ли персонаж в области */
declare function IsCharInArea2d(
  ped: PedHandle,
  x1: number,
  y1: number,
  x2: number,
  y2: number,
  sphere: boolean
): boolean;
export const isCharInArea2d: typeof IsCharInArea2d = _G.isCharInArea2d;

/** Проверяет, находится ли персонаж в области 3D */
declare function IsCharInArea3d(
  ped: PedHandle,
  x1: number,
  y1: number,
  z1: number,
  x2: number,
  y2: number,
  z2: number,
  sphere: boolean
): boolean;
export const isCharInArea3d: typeof IsCharInArea3d = _G.isCharInArea3d;

/** Получает транспорт, в котором находится персонаж */
declare function GetCarCharIsUsing(ped: PedHandle): VehicleHandle;
export const getCarCharIsUsing: typeof GetCarCharIsUsing = _G.getCarCharIsUsing;

/** Ищет случайного персонажа в заданных координатах в пределах указанного радиуса */
declare function FindAllRandomCharsInSphere(
  x: number,
  y: number,
  z: number,
  radius: number,
  findNext: boolean,
  skipDead: boolean
): LuaMultiReturn<[boolean, PedHandle?]>;
export const findAllRandomCharsInSphere: typeof FindAllRandomCharsInSphere = _G.findAllRandomCharsInSphere;

/** Устанавливает видимость персонажа */
declare function SetCharVisible(ped: PedHandle, visible: boolean): void;
export const setCharVisible: typeof SetCharVisible = _G.setCharVisible;

/** Устанавливает деньги персонажу */
declare function SetCharMoney(ped: PedHandle, money: number): void;
export const setCharMoney: typeof SetCharMoney = _G.setCharMoney;

/** Замораживает персонажа */
declare function FreezeCharPosition(ped: PedHandle, freeze: boolean): void;
export const freezeCharPosition: typeof FreezeCharPosition = _G.freezeCharPosition;

/** Устанавливает невидимость для персонажа */
declare function SetCharProofs(
  ped: PedHandle,
  bullet: boolean,
  fire: boolean,
  explosion: boolean,
  collision: boolean,
  melee: boolean
): void;
export const setCharProofs: typeof SetCharProofs = _G.setCharProofs;

/** Устанавливает можно ли сбивать персонажа с ног */
declare function SetCharCanBeKnockedOffBike(ped: PedHandle, state: boolean): void;
export const setCharCanBeKnockedOffBike: typeof SetCharCanBeKnockedOffBike = _G.setCharCanBeKnockedOffBike;

/** Устанавливает можно ли вытащить персонажа из машины */
declare function SetCharCanBeDraggedOut(ped: PedHandle, state: boolean): void;
export const setCharCanBeDraggedOut: typeof SetCharCanBeDraggedOut = _G.setCharCanBeDraggedOut;

/** Устанавливает можно ли застрелить персонажа в машине */
declare function SetCharCanBeShotInVehicle(ped: PedHandle, state: boolean): void;
export const setCharCanBeShotInVehicle: typeof SetCharCanBeShotInVehicle = _G.setCharCanBeShotInVehicle;

/** Возвращает скорость персонажа */
declare function GetCharSpeed(ped: PedHandle): number;
export const getCharSpeed: typeof GetCharSpeed = _G.getCharSpeed;

/** Устанавливает максимальное здоровье */
declare function SetCharMaxHealth(ped: PedHandle, health: number): void;
export const setCharMaxHealth: typeof SetCharMaxHealth = _G.setCharMaxHealth;
