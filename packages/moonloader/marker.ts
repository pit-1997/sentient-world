import type {
  BlipHandle,
  CheckpointHandle,
  ObjectHandle,
  PedHandle,
  VehicleHandle,
} from './handles';

/** Создает маркер */
export declare function createCheckpoint(
  type: number,
  x: number,
  y: number,
  z: number,
  pointX: number,
  pointY: number,
  pointZ: number,
  radius: number
): CheckpointHandle;

/** Удаляет маркер */
export declare function deleteCheckpoint(checkpoint: CheckpointHandle): void;

/** Создает иконку на радаре */
export declare function addBlipForCoord(x: number, y: number, z: number): BlipHandle;

/** Создает иконку на персонаже */
export declare function addBlipForChar(ped: PedHandle): BlipHandle;

/** Создает иконку на машине */
export declare function addBlipForCar(car: VehicleHandle): BlipHandle;

/** Создает иконку на объекте */
export declare function addBlipForObject(obj: ObjectHandle): BlipHandle;

/** Создает иконку контактной точки */
export declare function addBlipForContactPoint(x: number, y: number, z: number): BlipHandle;

/** Удаляет иконку */
export declare function removeBlip(blip: BlipHandle): void;

/** Проверяет существование иконки */
export declare function doesBlipExist(blip: BlipHandle): boolean;

/** Устанавливает цвет иконки */
export declare function changeBlipColour(blip: BlipHandle, color: number): void;

/** Уменьшает/увеличивает иконку */
export declare function changeBlipScale(blip: BlipHandle, scale: number): void;

/** Устанавливает отображение иконки */
export declare function changeBlipDisplay(blip: BlipHandle, display: number): void;

/** Получает координаты иконки */
export declare function getBlipCoords(blip: BlipHandle): LuaMultiReturn<[number, number, number]>;
