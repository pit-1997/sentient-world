import type { ObjectHandle, PedHandle, VehicleHandle } from './handles';

// Декларируем глобальный объект Lua
declare const _G: any;

/** Создает объект */
declare function CreateObject(
  modelId: number,
  x: number,
  y: number,
  z: number
): ObjectHandle;
export const createObject: typeof CreateObject = _G.createObject;

/** Создает объект без смещения */
declare function CreateObjectNoOffset(
  modelId: number,
  x: number,
  y: number,
  z: number
): ObjectHandle;
export const createObjectNoOffset: typeof CreateObjectNoOffset = _G.createObjectNoOffset;

/** Удаляет объект */
declare function DeleteObject(obj: ObjectHandle): void;
export const deleteObject: typeof DeleteObject = _G.deleteObject;

/** Проверяет существование объекта */
declare function DoesObjectExist(obj: ObjectHandle): boolean;
export const doesObjectExist: typeof DoesObjectExist = _G.doesObjectExist;

/** Устанавливает координаты объекта */
declare function SetObjectCoordinates(
  obj: ObjectHandle,
  x: number,
  y: number,
  z: number
): void;
export const setObjectCoordinates: typeof SetObjectCoordinates = _G.setObjectCoordinates;

/** Получает координаты объекта */
declare function GetObjectCoordinates(
  obj: ObjectHandle
): LuaMultiReturn<[number, number, number]>;
export const getObjectCoordinates: typeof GetObjectCoordinates = _G.getObjectCoordinates;

/** Устанавливает угол поворота объекта */
declare function SetObjectHeading(obj: ObjectHandle, angle: number): void;
export const setObjectHeading: typeof SetObjectHeading = _G.setObjectHeading;

/** Получает угол поворота объекта */
declare function GetObjectHeading(obj: ObjectHandle): number;
export const getObjectHeading: typeof GetObjectHeading = _G.getObjectHeading;

/** Прикрепляет объект к машине */
declare function AttachObjectToCar(
  obj: ObjectHandle,
  car: VehicleHandle,
  offsetX: number,
  offsetY: number,
  offsetZ: number,
  rotX: number,
  rotY: number,
  rotZ: number
): void;
export const attachObjectToCar: typeof AttachObjectToCar = _G.attachObjectToCar;

/** Прикрепляет объект к персонажу */
declare function AttachObjectToChar(
  obj: ObjectHandle,
  ped: PedHandle,
  offsetX: number,
  offsetY: number,
  offsetZ: number,
  rotX: number,
  rotY: number,
  rotZ: number
): void;
export const attachObjectToChar: typeof AttachObjectToChar = _G.attachObjectToChar;

/** Отсоединяет объект */
declare function DetachObject(
  obj: ObjectHandle,
  x: number,
  y: number,
  z: number,
  collision: boolean
): void;
export const detachObject: typeof DetachObject = _G.detachObject;

/** Устанавливает видимость объекта */
declare function SetObjectVisible(obj: ObjectHandle, visible: boolean): void;
export const setObjectVisible: typeof SetObjectVisible = _G.setObjectVisible;

/** Делает объект разрушаемым */
declare function SetObjectDynamic(obj: ObjectHandle, state: boolean): void;
export const setObjectDynamic: typeof SetObjectDynamic = _G.setObjectDynamic;

/** Устанавливает невосприимчивость объекта к повреждениям */
declare function SetObjectProofs(
  obj: ObjectHandle,
  bullet: boolean,
  fire: boolean,
  explosion: boolean,
  collision: boolean,
  melee: boolean
): void;
export const setObjectProofs: typeof SetObjectProofs = _G.setObjectProofs;

/** Замораживает объект */
declare function FreezeObjectPosition(obj: ObjectHandle, freeze: boolean): void;
export const freezeObjectPosition: typeof FreezeObjectPosition = _G.freezeObjectPosition;
