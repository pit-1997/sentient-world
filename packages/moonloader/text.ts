// Декларируем глобальный объект Lua
declare const _G: any;

/** Отрисовывает текст на экране */
declare function DisplayText(x: number, y: number, text: string): void;
export const displayText: typeof DisplayText = _G.displayText;

/** Устанавливает размер шрифта */
declare function SetTextScale(width: number, height: number): void;
export const setTextScale: typeof SetTextScale = _G.setTextScale;

/** Устанавливает цвет текста */
declare function SetTextColour(r: number, g: number, b: number, a: number): void;
export const setTextColour: typeof SetTextColour = _G.setTextColour;

/** Устанавливает шрифт */
declare function SetTextFont(font: number): void;
export const setTextFont: typeof SetTextFont = _G.setTextFont;

/** Устанавливает выравнивание текста */
declare function SetTextJustify(justify: number): void;
export const setTextJustify: typeof SetTextJustify = _G.setTextJustify;

/** Устанавливает границу текста */
declare function SetTextEdge(size: number, r: number, g: number, b: number, a: number): void;
export const setTextEdge: typeof SetTextEdge = _G.setTextEdge;

/** Устанавливает пропорциональность текста */
declare function SetTextProportional(state: boolean): void;
export const setTextProportional: typeof SetTextProportional = _G.setTextProportional;

/** Устанавливает центрирование текста */
declare function SetTextCentre(state: boolean): void;
export const setTextCentre: typeof SetTextCentre = _G.setTextCentre;

/** Устанавливает перенос текста */
declare function SetTextWrapx(x: number): void;
export const setTextWrapx: typeof SetTextWrapx = _G.setTextWrapx;

/** Устанавливает тень текста */
declare function SetTextDropshadow(
  size: number,
  r: number,
  g: number,
  b: number,
  a: number
): void;
export const setTextDropshadow: typeof SetTextDropshadow = _G.setTextDropshadow;

/** Рисует прямоугольник на экране */
declare function DrawRect(
  x: number,
  y: number,
  width: number,
  height: number,
  r: number,
  g: number,
  b: number,
  a: number
): void;
export const drawRect: typeof DrawRect = _G.drawRect;

/** Рисует текстуру */
declare function DrawTexture(
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
export const drawTexture: typeof DrawTexture = _G.drawTexture;

/** Получает разрешение экрана */
declare function GetScreenResolution(): LuaMultiReturn<[number, number]>;
export const getScreenResolution: typeof GetScreenResolution = _G.getScreenResolution;

/** Конвертирует 3D координаты в экранные */
declare function Convert3dCoordsToScreen(
  x: number,
  y: number,
  z: number
): LuaMultiReturn<[boolean, number, number]>;
export const convert3dCoordsToScreen: typeof Convert3dCoordsToScreen = _G.convert3dCoordsToScreen;

/** Конвертирует экранные координаты в 3D */
declare function ConvertScreenCoordsTo3d(
  screenX: number,
  screenY: number
): LuaMultiReturn<[number, number, number]>;
export const convertScreenCoordsTo3d: typeof ConvertScreenCoordsTo3d = _G.convertScreenCoordsTo3d;
