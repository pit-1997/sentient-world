import type { VehicleHandle, PedHandle } from './handles';

/** Создает машину */
export declare function createCar(modelId: number, x: number, y: number, z: number): VehicleHandle;

/** Удаляет машину */
export declare function deleteCar(car: VehicleHandle): void;

/** Проверяет существование машины */
export declare function doesVehicleExist(car: VehicleHandle): boolean;

/** Устанавливает координаты машины */
export declare function setCarCoordinates(
  car: VehicleHandle,
  x: number,
  y: number,
  z: number
): void;

/** Получает координаты машины */
export declare function getCarCoordinates(
  car: VehicleHandle
): LuaMultiReturn<[number, number, number]>;

/** Устанавливает угол поворота машины */
export declare function setCarHeading(car: VehicleHandle, angle: number): void;

/** Получает угол поворота машины */
export declare function getCarHeading(car: VehicleHandle): number;

/** Устанавливает здоровье машины */
export declare function setCarHealth(car: VehicleHandle, health: number): void;

/** Получает здоровье машины */
export declare function getCarHealth(car: VehicleHandle): number;

/** Устанавливает цвета машины */
export declare function changeCarColour(car: VehicleHandle, color1: number, color2: number): void;

/** Получает цвета машины */
export declare function getCarColours(car: VehicleHandle): LuaMultiReturn<[number, number]>;

/** Взрывает машину */
export declare function explodeCar(car: VehicleHandle): void;

/** Чинит машину */
export declare function fixCar(car: VehicleHandle): void;

/** Блокирует двери машины */
export declare function lockCarDoors(car: VehicleHandle, lockStatus: number): void;

/** Включает сирену */
export declare function switchCarSiren(car: VehicleHandle, state: boolean): void;

/** Включает фары */
export declare function forceCarLights(car: VehicleHandle, state: number): void;

/** Устанавливает можно ли взорвать машину */
export declare function setCarProofs(
  car: VehicleHandle,
  bullet: boolean,
  fire: boolean,
  explosion: boolean,
  collision: boolean,
  melee: boolean
): void;

/** Получает модель машины */
export declare function getCarModel(car: VehicleHandle): number;

/** Получает скорость машины */
export declare function getCarSpeed(car: VehicleHandle): number;

/** Устанавливает скорость машины */
export declare function setCarForwardSpeed(car: VehicleHandle, speed: number): void;

/** Получает водителя машины */
export declare function getDriverOfCar(car: VehicleHandle): PedHandle;

/** Получает количество пассажиров */
export declare function getNumberOfPassengers(car: VehicleHandle): number;

/** Получает максимальное количество пассажиров */
export declare function getMaximumNumberOfPassengers(car: VehicleHandle): number;

/** Проверяет наличие персонажа в машине */
export declare function isCarPassengerSeatFree(car: VehicleHandle, seatId: number): boolean;

/** Получает пассажира на определенном месте */
export declare function getCharInCarPassengerSeat(car: VehicleHandle, seatId: number): PedHandle;

/** Замораживает машину */
export declare function freezeCarPosition(car: VehicleHandle, freeze: boolean): void;

/** Отмечает машину как более ненужную */
export declare function markCarAsNoLongerNeeded(car: VehicleHandle): void;

/** Устанавливает видимость машины */
export declare function setCarVisible(car: VehicleHandle, visible: boolean): void;

/** Проверяет, утоплена ли машина */
export declare function isCarInWater(car: VehicleHandle): boolean;

/** Проверяет, в воздухе ли машина */
export declare function isCarInAirProper(car: VehicleHandle): boolean;

/** Проверяет, перевернута ли машина */
export declare function isCarUpsidedown(car: VehicleHandle): boolean;

/** Устанавливает невидимость для радара */
export declare function dontProcessVehicleRecordingsNearNetworkPlayers(
  car: VehicleHandle,
  state: boolean
): void;
