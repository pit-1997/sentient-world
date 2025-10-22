import type { ObjectHandle, PedHandle, VehicleHandle } from './handles';

/** Создает объект */
export declare function createObject(
  modelId: number,
  x: number,
  y: number,
  z: number
): ObjectHandle;

/** Создает объект без смещения */
export declare function createObjectNoOffset(
  modelId: number,
  x: number,
  y: number,
  z: number
): ObjectHandle;

/** Удаляет объект */
export declare function deleteObject(obj: ObjectHandle): void;

/** Проверяет существование объекта */
export declare function doesObjectExist(obj: ObjectHandle): boolean;

/** Устанавливает координаты объекта */
export declare function setObjectCoordinates(
  obj: ObjectHandle,
  x: number,
  y: number,
  z: number
): void;

/** Получает координаты объекта */
export declare function getObjectCoordinates(
  obj: ObjectHandle
): LuaMultiReturn<[number, number, number]>;

/** Устанавливает угол поворота объекта */
export declare function setObjectHeading(obj: ObjectHandle, angle: number): void;

/** Получает угол поворота объекта */
export declare function getObjectHeading(obj: ObjectHandle): number;

/** Прикрепляет объект к машине */
export declare function attachObjectToCar(
  obj: ObjectHandle,
  car: VehicleHandle,
  offsetX: number,
  offsetY: number,
  offsetZ: number,
  rotX: number,
  rotY: number,
  rotZ: number
): void;

/** Прикрепляет объект к персонажу */
export declare function attachObjectToChar(
  obj: ObjectHandle,
  ped: PedHandle,
  offsetX: number,
  offsetY: number,
  offsetZ: number,
  rotX: number,
  rotY: number,
  rotZ: number
): void;

/** Отсоединяет объект */
export declare function detachObject(
  obj: ObjectHandle,
  x: number,
  y: number,
  z: number,
  collision: boolean
): void;

/** Устанавливает видимость объекта */
export declare function setObjectVisible(obj: ObjectHandle, visible: boolean): void;

/** Делает объект разрушаемым */
export declare function setObjectDynamic(obj: ObjectHandle, state: boolean): void;

/** Устанавливает невосприимчивость объекта к повреждениям */
export declare function setObjectProofs(
  obj: ObjectHandle,
  bullet: boolean,
  fire: boolean,
  explosion: boolean,
  collision: boolean,
  melee: boolean
): void;

/** Замораживает объект */
export declare function freezeObjectPosition(obj: ObjectHandle, freeze: boolean): void;

/** Получает модель объекта */
export declare function getObjectModel(obj: ObjectHandle): number;

/** Отмечает объект как более ненужный */
export declare function markObjectAsNoLongerNeeded(obj: ObjectHandle): void;
