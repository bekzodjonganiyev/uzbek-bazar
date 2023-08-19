import { PRODUCT_CARD } from "@/redux/contants";

interface IProductCard {
  wishlist: number[];
  cart: number[];
  compare: number[];
  time: number;
  alert: boolean;
}

interface IAction {
  type: string;
  payload: number;
}

const initialState: IProductCard = {
  wishlist: [],
  cart: [],
  compare: [],
  time: 0,
  alert: false,
};

export const productCardReducer = (state = initialState, action: IAction) => {
  switch (action.type) {
    case PRODUCT_CARD.CART.SET: {
      const arr = [...state.cart, action.payload];

      return { ...state, cart: arr };
    }
    case PRODUCT_CARD.CART.DEL: {
      const arr = [...state.cart];
      const filteredArr = arr.filter((item) => item !== action.payload);

      return { ...state, cart: filteredArr };
    }
    case PRODUCT_CARD.WISHLIST.SET: {
      const arr = [...state.wishlist, action.payload];

      return { ...state, wishlist: arr };
    }
    case PRODUCT_CARD.WISHLIST.DEL: {
      const arr = [...state.wishlist];
      const filteredArr = arr.filter((item) => item !== action.payload);

      return { ...state, wishlist: filteredArr };
    }
    case PRODUCT_CARD.COMPARE.SET: {
      const arr = [...state.compare, action.payload];

      return { ...state, compare: arr };
    }
    case PRODUCT_CARD.COMPARE.DEL: {
      const arr = [...state.compare];
      const filteredArr = arr.filter((item) => item !== action.payload);

      return { ...state, compare: filteredArr };
    }
    default:
        return state
  }
};
