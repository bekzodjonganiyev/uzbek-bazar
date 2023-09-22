import { WISHLIST } from "@/redux/contants";

export const setWishlistId = (id: number, wishlistId: number, extra: any) => {
    return {
      type: WISHLIST.SET,
      payload: {ids: {id, wishlistId,}, wishlistId, extra}
    };
  };
  export const deleteWishlistId = (id: number, wishlistId: number, extra: any) => {
    return {
      type: WISHLIST.DEL,
      payload: {ids: {id, wishlistId,}, wishlistId, extra}
    };
  };

  export const setAllWishlist = (id: number, wishlistId: number, extra: any) => {
    return {
      type: WISHLIST.SET_ALL,
      payload: { ids: {id, wishlistId,}, wishlistId, extra }
    };
  };