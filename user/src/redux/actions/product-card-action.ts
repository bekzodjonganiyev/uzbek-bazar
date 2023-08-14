import { PRODUCT_CARD } from "@/redux/contants";

// TODO - funksiyalarni nomlashda naming convensiyaga amal qilishim kerak
// TODO - action larni DRY ga ko'ra qayta yozaman
export class ProductCardActions {
  setCartId = (id: number) => {
    return {
      type: PRODUCT_CARD.CART.SET,
      payload: id,
    };
  };
  deleteCartId = (id: number) => {
    return {
      type: PRODUCT_CARD.CART.DEL,
      payload: id,
    };
  };
  setCompareId = (id: number) => {
    return {
      type: PRODUCT_CARD.COMPARE.SET,
      payload: id,
    };
  };
  deleteCompareId = (id: number) => {
    return {
      type: PRODUCT_CARD.COMPARE.DEL,
      payload: id,
    };
  };
  setWishlistId = (id: number) => {
    return {
      type: PRODUCT_CARD.WISHLIST.SET,
      payload: id,
    };
  };
  deleteWishlistId = (id: number) => {
    return {
      type: PRODUCT_CARD.WISHLIST.DEL,
      payload: id,
    };
  };
}
//  const setCartId = (id: number) => {
//     return {
//         type: PRODUCT_CARD.CART.SET,
//         payload: id
//     }
// }

//  const deleteCartId = (id: number) => {
//     return {
//         type: PRODUCT_CARD.CART.DEL,
//         payload: id
//     }
// }
//  const setCompareId = (id: number) => {
//     return {
//         type: PRODUCT_CARD.CART.SET,
//         payload: id
//     }
// }

//  const deleteCompareId = (id: number) => {
//     return {
//         type: PRODUCT_CARD.CART.DEL,
//         payload: id
//     }
// }
//  const setWishlistId = (id: number) => {
//     return {
//         type: PRODUCT_CARD.CART.SET,
//         payload: id
//     }
// }

//  const deleteWishlistId = (id: number) => {
//     return {
//         type: PRODUCT_CARD.CART.DEL,
//         payload: id
//     }
// }
