/** Проверяет, активен ли диалог */
export declare function isDialogActive(): boolean;

/** Показывает диалоговое окно */
export declare function showDialog(
  dialogId: number,
  style: number,
  title: string,
  button1: string,
  button2: string,
  text: string
): void;

/** Обрабатывает ответ диалога */
export declare function processDialogResponse(): LuaMultiReturn<
  [boolean, number, number, number, string]
>;

/** Показывает меню */
export declare function showTextdraw(textdrawId: number): void;

/** Скрывает меню */
export declare function hideTextdraw(textdrawId: number): void;
