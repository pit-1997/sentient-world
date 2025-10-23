import type {
  BlipHandle,
  CheckpointHandle,
  ObjectHandle,
  PedHandle,
  VehicleHandle,
} from './handles';

// Декларируем глобальный объект Lua
declare const _G: any;

/** Создает маркер */
declare function CreateCheckpoint(
  type: number,
  x: number,
  y: number,
  z: number,
  pointX: number,
  pointY: number,
  pointZ: number,
  radius: number
): CheckpointHandle;
export const createCheckpoint: typeof CreateCheckpoint = _G.createCheckpoint;

/** Удаляет маркер */
declare function DeleteCheckpoint(checkpoint: CheckpointHandle): void;
export const deleteCheckpoint: typeof DeleteCheckpoint = _G.deleteCheckpoint;

/** Создает иконку на радаре */
declare function AddBlipForCoord(x: number, y: number, z: number): BlipHandle;
export const addBlipForCoord: typeof AddBlipForCoord = _G.addBlipForCoord;

/** Создает иконку на персонаже */
declare function AddBlipForChar(ped: PedHandle): BlipHandle;
export const addBlipForChar: typeof AddBlipForChar = _G.addBlipForChar;

/** Создает иконку на машине */
declare function AddBlipForCar(car: VehicleHandle): BlipHandle;
export const addBlipForCar: typeof AddBlipForCar = _G.addBlipForCar;

/** Создает иконку на объекте */
declare function AddBlipForObject(obj: ObjectHandle): BlipHandle;
export const addBlipForObject: typeof AddBlipForObject = _G.addBlipForObject;

/** Создает иконку контактной точки */
declare function AddBlipForContactPoint(x: number, y: number, z: number): BlipHandle;
export const addBlipForContactPoint: typeof AddBlipForContactPoint = _G.addBlipForContactPoint;

/** Удаляет иконку */
declare function RemoveBlip(blip: BlipHandle): void;
export const removeBlip: typeof RemoveBlip = _G.removeBlip;

/** Проверяет существование иконки */
declare function DoesBlipExist(blip: BlipHandle): boolean;
export const doesBlipExist: typeof DoesBlipExist = _G.doesBlipExist;

/** Устанавливает цвет иконки */
declare function ChangeBlipColour(blip: BlipHandle, color: number): void;
export const changeBlipColour: typeof ChangeBlipColour = _G.changeBlipColour;

/** Уменьшает/увеличивает иконку */
declare function ChangeBlipScale(blip: BlipHandle, scale: number): void;
export const changeBlipScale: typeof ChangeBlipScale = _G.changeBlipScale;

/** Устанавливает отображение иконки */
declare function ChangeBlipDisplay(blip: BlipHandle, display: number): void;
export const changeBlipDisplay: typeof ChangeBlipDisplay = _G.changeBlipDisplay;

/** Получает координаты иконки */
declare function GetBlipCoords(blip: BlipHandle): LuaMultiReturn<[number, number, number]>;
export const getBlipCoords: typeof GetBlipCoords = _G.getBlipCoords;
