import { ReactNode } from "react";

import { SHEET_CONTENT } from "@/redux/contants";

interface ISheetContent {
  side: "top" | "bottom" | "left" | "right" | null | undefined
  children: ReactNode;
}

interface IAction {
  type: string;
  payload: ISheetContent;
}

const initialState: ISheetContent = {
  side: "right",
  children: null,
};

export const sheetContentReducer = (state = initialState, action: IAction) => {
  switch (action.type) {
    case SHEET_CONTENT.SET:
      return { side: action.payload.side, children: action.payload.children };
    default:
      return state;
  }
};
