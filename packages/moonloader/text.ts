/** Отрисовывает текст на экране */
export declare function displayText(x: number, y: number, text: string): void;

/** Устанавливает размер шрифта */
export declare function setTextScale(width: number, height: number): void;

/** Устанавливает цвет текста */
export declare function setTextColour(r: number, g: number, b: number, a: number): void;

/** Устанавливает шрифт */
export declare function setTextFont(font: number): void;

/** Устанавливает выравнивание текста */
export declare function setTextJustify(justify: number): void;

/** Устанавливает границу текста */
export declare function setTextEdge(size: number, r: number, g: number, b: number, a: number): void;

/** Устанавливает пропорциональность текста */
export declare function setTextProportional(state: boolean): void;

/** Устанавливает центрирование текста */
export declare function setTextCentre(state: boolean): void;

/** Устанавливает перенос текста */
export declare function setTextWrapx(x: number): void;

/** Устанавливает тень текста */
export declare function setTextDropshadow(
  size: number,
  r: number,
  g: number,
  b: number,
  a: number
): void;

/** Рисует прямоугольник на экране */
export declare function drawRect(
  x: number,
  y: number,
  width: number,
  height: number,
  r: number,
  g: number,
  b: number,
  a: number
): void;

/** Рисует текстуру */
export declare function drawTexture(
  texture: number,
  x: number,
  y: number,
  width: number,
  height: number,
  angle: number,
  r: number,
  g: number,
  b: number,
  a: number
): void;

/** Получает разрешение экрана */
export declare function getScreenResolution(): LuaMultiReturn<[number, number]>;

/** Конвертирует 3D координаты в экранные */
export declare function convert3dCoordsToScreen(
  x: number,
  y: number,
  z: number
): LuaMultiReturn<[boolean, number, number]>;

/** Конвертирует экранные координаты в 3D */
export declare function convertScreenCoordsTo3d(
  screenX: number,
  screenY: number
): LuaMultiReturn<[number, number, number]>;
