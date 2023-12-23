import { CART } from "@/redux/contants";
import { productListType } from "@/interfaces/product";

interface IAction {
  type: string;
  payload: productListType;
}

const initialState: productListType[] = [];

export const cartReducer = (state = initialState, action: IAction) => {
  switch (action.type) {
    case CART.SET: {
      const arr = [...state, action.payload];

      localStorage.setItem("carts", JSON.stringify(arr));

      return arr;
    }
    case CART.DEL: {
      const filteredArr = state.filter((item) => item.id !== action.payload.id);

      localStorage.setItem("carts", JSON.stringify(filteredArr));

      return filteredArr;
    }
    case CART.SET_STORE: {
      const carts: productListType[] = JSON.parse(
        localStorage.getItem("carts") || `[]`
      );
      return carts;
    }
    default:
      return state;
  }
};
