// import { CART } from "@/redux/contants";
// import { productListType } from "@/interfaces/product";

// export const setCartId = (item: productListType) => {
//   return {
//     type: CART.SET,
//     payload: item,
//   };
// };
// export const deleteCartId = (item: productListType) => {
//   return {
//     type: CART.DEL,
//     payload: item,
//   };
// };

// export const storeAllCarts = () => {
//   const placeholderData: productListType = {
//     id: 0,
//     name: "string",
//     price: 0,
//     discount: 0,
//     new_price: "any",
//     gender: "string",
//     type: "",
//     season: "",
//     material: 0,
//     size: [],
//     brand: 0,
//     category: 0,
//     is_favorite: false,
//     is_cart: false,
//     photo: "",
//     rating: "",
//     row: false,
//     minimum_order_count: 0,
//   };
//   return {
//     type: CART.SET_STORE,
//     payload: placeholderData,
//   };
// }

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

export const storeAllCarts = (id: number, cartId: number, extra: any) => {
  return {
    type: CART.SET_STORE,
    payload: { ids: {id, cartId,}, cartId, extra }
  }
}