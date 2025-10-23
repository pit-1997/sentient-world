// Декларируем глобальный объект Lua
declare const _G: any;

/** Проверяет, активен ли диалог */
declare function IsDialogActive(): boolean;
export const isDialogActive: typeof IsDialogActive = _G.isDialogActive;

/** Показывает диалоговое окно */
declare function ShowDialog(
  dialogId: number,
  style: number,
  title: string,
  button1: string,
  button2: string,
  text: string
): void;
export const showDialog: typeof ShowDialog = _G.showDialog;

/** Обрабатывает ответ диалога */
declare function ProcessDialogResponse(): LuaMultiReturn<
  [boolean, number, number, number, string]
>;
export const processDialogResponse: typeof ProcessDialogResponse = _G.processDialogResponse;

/** Показывает меню */
declare function ShowTextdraw(textdrawId: number): void;
export const showTextdraw: typeof ShowTextdraw = _G.showTextdraw;

/** Скрывает меню */
declare function HideTextdraw(textdrawId: number): void;
export const hideTextdraw: typeof HideTextdraw = _G.hideTextdraw;
