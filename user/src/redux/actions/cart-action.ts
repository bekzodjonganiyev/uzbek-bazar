import { CART } from "@/redux/contants";
import { productListType } from "@/interfaces/product";

export const setCartId = (item: productListType) => {
  return {
    type: CART.SET,
    payload: item,
  };
};
export const deleteCartId = (item: productListType) => {
  return {
    type: CART.DEL,
    payload: item,
  };
};

export const storeAllCarts = () => {
  const placeholderData: productListType = {
    id: 0,
    name: "string",
    price: 0,
    discount: 0,
    new_price: "any",
    gender: "string",
    type: "",
    season: "",
    material: 0,
    size: [],
    brand: 0,
    category: 0,
    is_favorite: false,
    is_cart: false,
    photo: "",
    rating: "",
    row: false,
    minimum_order_count: 0,
  };
  return {
    type: CART.SET_STORE,
    payload: placeholderData,
  };
}