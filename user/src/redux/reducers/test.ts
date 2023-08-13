import { TEST } from "@/redux/contants/test";

const initialState: number[] = [1];

type DataType = { type: string; payload: number };

export const testReducer = (state = initialState, action: DataType) => {
  switch (action.type) {
    case TEST.ADD:
      return [...state, action.payload];
    case TEST.DELETE: {
      const filtered = state.filter((i) => i !== action.payload);
      return filtered;
    }
    default:
      return state;
  }
};
