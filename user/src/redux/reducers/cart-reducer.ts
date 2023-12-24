// import { CART } from "@/redux/contants";
// import { productListType } from "@/interfaces/product";

// interface IAction {
//   type: string;
//   payload: productListType;
// }

// const initialState: productListType[] = [];

// export const cartReducer = (state = initialState, action: IAction) => {
//   switch (action.type) {
//     case CART.SET: {
//       const arr = [...state, action.payload];

//       localStorage.setItem("carts", JSON.stringify(arr));

//       return arr;
//     }
//     case CART.DEL: {
//       const filteredArr = state.filter((item) => item.id !== action.payload.id);

//       localStorage.setItem("carts", JSON.stringify(filteredArr));

//       return filteredArr;
//     }
//     case CART.SET_STORE: {
//       const carts: productListType[] = JSON.parse(
//         localStorage.getItem("carts") || `[]`
//       );
//       return carts;
//     }
//     default:
//       return state;
//   }
// };

import { CART } from "@/redux/contants";

export interface ICart {
  ids: { id: number; cartId: number }[];
  cartIds: number[];
  extra: any;
}

interface IAction {
  type: string;
  payload: { 
    ids: { id: number; cartId: number }; 
    cartId: number; 
    extra: any 
  };
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

      return obj;
    }
    case CART.DEL: {
      const arr = [...state.ids];
      const filteredArr = arr.filter(
        (item) => item.id !== action.payload.ids.id
      );

      const arr1 = [...state.cartIds];
      const filteredArr1 = arr1.filter(
        (item) => item !== action.payload.cartId
      );

      const obj = { ...state, ids: filteredArr, cartIds: filteredArr1 };

      localStorage.setItem("carts", JSON.stringify(obj));

      return obj
    }
    case CART.SET_STORE: {
      const carts: ICart = JSON.parse(localStorage.getItem("carts") || `{"ids":[],"cartIds":[],"extra":null}`);
      if(!carts)
        return initialState;
      return carts
    }
    default:
      return state;
  }
};
