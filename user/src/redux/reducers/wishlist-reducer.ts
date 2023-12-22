import { WISHLIST } from "@/redux/contants";
import { productListType } from "@/interfaces/product";

interface IAction {
  type: string;
  payload: productListType
}

const initialState: productListType[] = [] 

export const wishlistReducer = (state = initialState, action: IAction) => {
  switch (action.type) {
    case WISHLIST.SET: {
      const arr = [
        ...state, 
        action.payload
      ];

      localStorage.setItem("wishlists", JSON.stringify(arr));

      return arr;
    }
    case WISHLIST.DEL: {
      const filteredArr = state.filter((item) => item.id !== action.payload.id);

      localStorage.setItem("wishlists", JSON.stringify(filteredArr));

      return filteredArr;
    }
    case WISHLIST.SET_ALL: {
      const wishlists: productListType[] = JSON.parse(localStorage.getItem("wishlists") || `[]`);
      return wishlists;
    }
    default:
      return state;
  }
};
