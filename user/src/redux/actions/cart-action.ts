import { CART } from "@/redux/contants";

export const setCartId = (id: number, cartId: number, extra: any) => {
  return {
    type: CART.SET,
    payload: { ids: {id, cartId,}, cartId, extra },
  };
};
export const deleteCartId = (id: number, cartId: number, extra: any) => {
  return {
    type: CART.DEL,
    payload: { ids: {id, cartId,}, cartId, extra },
  };
};

export const setAllCarts = (id: number, cartId: number, extra: any) => {
  return {
    type: CART.SET_ALL,
    payload: { ids: {id, cartId,}, cartId, extra }
  };
};