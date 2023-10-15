import { PRODUCT_MODAL } from "@/redux/contants";

export const setProductModal = (id: number, cartId: number, extra: any) => {
  return {
    type: PRODUCT_MODAL.SET,
    payload: { ids: { id, cartId }, cartId, extra },
  };
};
export const deleteProductModal = (id: number, cartId: number, extra: any) => {
  return {
    type: PRODUCT_MODAL.DEL,
    payload: { ids: { id, cartId }, cartId, extra },
  };
};
