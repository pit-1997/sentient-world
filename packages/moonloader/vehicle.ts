import type { VehicleHandle, PedHandle } from './handles';

// Декларируем глобальный объект Lua
declare const _G: any;

/** Создает машину */
declare function CreateCar(modelId: number, x: number, y: number, z: number): VehicleHandle;
export const createCar: typeof CreateCar = _G.createCar;

/** Удаляет машину */
declare function DeleteCar(car: VehicleHandle): void;
export const deleteCar: typeof DeleteCar = _G.deleteCar;

/** Проверяет существование машины */
declare function DoesVehicleExist(car: VehicleHandle): boolean;
export const doesVehicleExist: typeof DoesVehicleExist = _G.doesVehicleExist;

/** Устанавливает координаты машины */
declare function SetCarCoordinates(
  car: VehicleHandle,
  x: number,
  y: number,
  z: number
): void;
export const setCarCoordinates: typeof SetCarCoordinates = _G.setCarCoordinates;

/** Получает координаты машины */
declare function GetCarCoordinates(
  car: VehicleHandle
): LuaMultiReturn<[number, number, number]>;
export const getCarCoordinates: typeof GetCarCoordinates = _G.getCarCoordinates;

/** Устанавливает угол поворота машины */
declare function SetCarHeading(car: VehicleHandle, angle: number): void;
export const setCarHeading: typeof SetCarHeading = _G.setCarHeading;

/** Получает угол поворота машины */
declare function GetCarHeading(car: VehicleHandle): number;
export const getCarHeading: typeof GetCarHeading = _G.getCarHeading;

/** Устанавливает здоровье машины */
declare function SetCarHealth(car: VehicleHandle, health: number): void;
export const setCarHealth: typeof SetCarHealth = _G.setCarHealth;

/** Получает здоровье машины */
declare function GetCarHealth(car: VehicleHandle): number;
export const getCarHealth: typeof GetCarHealth = _G.getCarHealth;

/** Устанавливает цвета машины */
declare function ChangeCarColour(car: VehicleHandle, color1: number, color2: number): void;
export const changeCarColour: typeof ChangeCarColour = _G.changeCarColour;

/** Получает цвета машины */
declare function GetCarColours(car: VehicleHandle): LuaMultiReturn<[number, number]>;
export const getCarColours: typeof GetCarColours = _G.getCarColours;

/** Взрывает машину */
declare function ExplodeCar(car: VehicleHandle): void;
export const explodeCar: typeof ExplodeCar = _G.explodeCar;

/** Чинит машину */
declare function FixCar(car: VehicleHandle): void;
export const fixCar: typeof FixCar = _G.fixCar;

/** Блокирует двери машины */
declare function LockCarDoors(car: VehicleHandle, lockStatus: number): void;
export const lockCarDoors: typeof LockCarDoors = _G.lockCarDoors;

/** Включает сирену */
declare function SwitchCarSiren(car: VehicleHandle, state: boolean): void;
export const switchCarSiren: typeof SwitchCarSiren = _G.switchCarSiren;

/** Включает фары */
declare function ForceCarLights(car: VehicleHandle, state: number): void;
export const forceCarLights: typeof ForceCarLights = _G.forceCarLights;

/** Устанавливает можно ли взорвать машину */
declare function SetCarProofs(
  car: VehicleHandle,
  bullet: boolean,
  fire: boolean,
  explosion: boolean,
  collision: boolean,
  melee: boolean
): void;
export const setCarProofs: typeof SetCarProofs = _G.setCarProofs;

/** Получает модель машины */
declare function GetCarModel(car: VehicleHandle): number;
export const getCarModel: typeof GetCarModel = _G.getCarModel;

/** Получает скорость машины */
declare function GetCarSpeed(car: VehicleHandle): number;
export const getCarSpeed: typeof GetCarSpeed = _G.getCarSpeed;

/** Устанавливает скорость машины */
declare function SetCarForwardSpeed(car: VehicleHandle, speed: number): void;
export const setCarForwardSpeed: typeof SetCarForwardSpeed = _G.setCarForwardSpeed;

/** Получает водителя машины */
declare function GetDriverOfCar(car: VehicleHandle): PedHandle;
export const getDriverOfCar: typeof GetDriverOfCar = _G.getDriverOfCar;

/** Получает количество пассажиров */
declare function GetNumberOfPassengers(car: VehicleHandle): number;
export const getNumberOfPassengers: typeof GetNumberOfPassengers = _G.getNumberOfPassengers;

/** Получает максимальное количество пассажиров */
declare function GetMaximumNumberOfPassengers(car: VehicleHandle): number;
export const getMaximumNumberOfPassengers: typeof GetMaximumNumberOfPassengers = _G.getMaximumNumberOfPassengers;

/** Проверяет наличие персонажа в машине */
declare function IsCarPassengerSeatFree(car: VehicleHandle, seatId: number): boolean;
export const isCarPassengerSeatFree: typeof IsCarPassengerSeatFree = _G.isCarPassengerSeatFree;

/** Получает пассажира на определенном месте */
declare function GetCharInCarPassengerSeat(car: VehicleHandle, seatId: number): PedHandle;
export const getCharInCarPassengerSeat: typeof GetCharInCarPassengerSeat = _G.getCharInCarPassengerSeat;

/** Замораживает машину */
declare function FreezeCarPosition(car: VehicleHandle, freeze: boolean): void;
export const freezeCarPosition: typeof FreezeCarPosition = _G.freezeCarPosition;

/** Отмечает машину как более ненужную */
declare function MarkCarAsNoLongerNeeded(car: VehicleHandle): void;
export const markCarAsNoLongerNeeded: typeof MarkCarAsNoLongerNeeded = _G.markCarAsNoLongerNeeded;

/** Устанавливает видимость машины */
declare function SetCarVisible(car: VehicleHandle, visible: boolean): void;
export const setCarVisible: typeof SetCarVisible = _G.setCarVisible;

/** Проверяет, утоплена ли машина */
declare function IsCarInWater(car: VehicleHandle): boolean;
export const isCarInWater: typeof IsCarInWater = _G.isCarInWater;

/** Проверяет, в воздухе ли машина */
declare function IsCarInAirProper(car: VehicleHandle): boolean;
export const isCarInAirProper: typeof IsCarInAirProper = _G.isCarInAirProper;

/** Проверяет, перевернута ли машина */
declare function IsCarUpsidedown(car: VehicleHandle): boolean;
export const isCarUpsidedown: typeof IsCarUpsidedown = _G.isCarUpsidedown;

/** Устанавливает невидимость для радара */
declare function DontProcessVehicleRecordingsNearNetworkPlayers(
  car: VehicleHandle,
  state: boolean
): void;
export const dontProcessVehicleRecordingsNearNetworkPlayers: typeof DontProcessVehicleRecordingsNearNetworkPlayers = _G.dontProcessVehicleRecordingsNearNetworkPlayers;
