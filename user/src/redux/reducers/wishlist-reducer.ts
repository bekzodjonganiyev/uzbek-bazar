import { WISHLIST } from "@/redux/contants";

interface IWishlist {
  ids: { id: number; wishlistId: number }[];
  wishlistIds: number[];
  extra: any;
}

interface IAction {
  type: string;
  payload: {
    ids: { id: number; wishlistId: number };
    wishlistId: number;
    extra: any;
  };
}

const initialState: IWishlist = {
  ids: [],
  wishlistIds: [],
  extra: null,
};

export const wishlistReducer = (state = initialState, action: IAction) => {
  switch (action.type) {
    case WISHLIST.SET: {
      const obj = {
        ...state,
        ids: [...state.ids, action.payload.ids],
        wishlistIds: [...state.wishlistIds, action.payload.wishlistId],
        extra: action.payload.extra,
      };

      localStorage.setItem("wishlists", JSON.stringify(obj));

      return obj;
    }
    case WISHLIST.DEL: {
      const arr = [...state.ids];
      const filteredArr = arr.filter(
        (item) => item.id !== action.payload.ids.id
      );

      const arr1 = [...state.wishlistIds];
      const filteredArr1 = arr1.filter((item) => item !== action.payload.wishlistId);

      const obj = { ...state, ids: filteredArr, wishlistIds: filteredArr1 };

      localStorage.setItem("wishlists", JSON.stringify(obj));

      return obj;
    }
    case WISHLIST.SET_ALL: {
      const wishlists: IWishlist = JSON.parse(localStorage.getItem("wishlists") || `{"ids":[],"wishlistIds":[],"extra":null}`);
      if(wishlists)
        return wishlists;
      return initialState
    }
    default:
      return state;
  }
};
