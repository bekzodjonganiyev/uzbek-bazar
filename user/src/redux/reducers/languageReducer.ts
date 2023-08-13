import { ActionTypes } from "@/redux/contants/action-types";

const initialLanguage: string = "uz";

type DataType = { type: string; payload: string };

export const languageReducer = (state = initialLanguage, data: DataType) => {
  switch (data.type) {
    case ActionTypes.SET_LANGUAGE:
      return data.payload;

    default:
      return state;
  }
};
