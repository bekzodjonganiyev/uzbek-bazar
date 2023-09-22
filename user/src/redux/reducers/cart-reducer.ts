import { CART } from "@/redux/contants";

export interface ICart {
  ids: { id: number; cartId: number }[];
  cartIds: number[];
  extra: any;
}

interface IAction {
  type: string;
  payload: { ids: { id: number; cartId: number }; cartId: number; extra: any };
}

const initialState: ICart = {
  ids: [],
  cartIds: [],
  extra: null,
};

export const cartReducer = (state = initialState, action: IAction) => {
  switch (action.type) {
    case CART.SET: {
      const obj = {
        ...state,
        ids: [...state.ids, action.payload.ids],
        cartIds: [...state.cartIds, action.payload.cartId],
        extra: action.payload.extra,
      };

      localStorage.setItem("carts", JSON.stringify(obj));
      // const carts: ICart = JSON.parse(localStorage.getItem("carts"))
      // console.log(carts, "carts")
      // console.log(obj, "obj")


      return obj;
    }
    case CART.DEL: {
      const arr = [...state.ids];
      const filteredArr = arr.filter((item) => item.id !== action.payload.ids.id);

      const arr1 = [...state.cartIds];
      const filteredArr1 = arr1.filter((item) => item !== action.payload.cartId);

      const obj = {...state, ids: filteredArr, cartIds: filteredArr1}

      localStorage.setItem("carts", JSON.stringify(obj));

      return { ...state, ids: filteredArr };
    }
    case CART.SET_ALL: {
      const carts: ICart = JSON.parse(localStorage.getItem("carts"))
      return carts
    }
    default:
      return state;
  }
};
