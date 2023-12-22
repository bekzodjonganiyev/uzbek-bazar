import { WISHLIST } from "@/redux/contants";
import { productListType } from "@/interfaces/product";

export const setWishlistId = (item: productListType) => {
  return {
    type: WISHLIST.SET,
    payload: item,
  };
};
export const deleteWishlistId = (item: productListType) => {
  return {
    type: WISHLIST.DEL,
    payload: item,
  };
};

export const storeAllWishlist = () => {
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
    type: WISHLIST.SET_ALL,
    payload: placeholderData,
  };
};
