import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { http } from 'src/app/api/http';
import FuseUtils from '@fuse/utils';


export const getProduct = createAsyncThunk('eCommerceApp/product/getProduct', async (productId) => {
  const response = await http(false).get(`/products/${productId}/details/`);
  const data = await response.data;

  return data === undefined ? null : data;
});

export const removeProduct = createAsyncThunk(
  'eCommerceApp/product/removeProduct',
  async (val, { dispatch, getState }) => {
    const { id } = getState().eCommerceApp.product;
    await axios.delete(`/api/ecommerce/products/${id}`);
    return id;
  }
);

export const saveProduct = createAsyncThunk(
  'eCommerceApp/product/saveProduct',
  async (productData) => {
    const response = await http(true).post(`/products/`, productData);

    const data = await response.data;

    return data;
  }
);

//update function

export const updateProduct = createAsyncThunk(
  'eCommerceApp/product/updateProduct',
  async ({productData, id}) => {
    console.log(id, "id")
    const response = await http(true).put(`/products/${id}/`, productData);

    const data = await response.data;

    return data;
  }
);

const productSlice = createSlice({
  name: 'eCommerceApp/product',
  initialState: null,
  reducers: {
    resetProduct: () => null,
    newProduct: {
      reducer: (state, action) => action.payload,
      prepare: (event) => ({
        payload: {
          id: FuseUtils.generateGUID(),
          images: [],
          translations: {},
          price: 0,
          discount: 0,
          gender: "",
          type: "",
          season: "",
          material: "",
          brand: "",
          size: [],
          category: "",
          organization: "",
          active: true,
        },
      }),
    },
  },
  extraReducers: {
    [getProduct.fulfilled]: (state, action) => action.payload,
    [saveProduct.fulfilled]: (state, action) => action.payload,
    [removeProduct.fulfilled]: (state, action) => null,
  },
});

export const { newProduct, resetProduct } = productSlice.actions;

export const selectProduct = ({ eCommerceApp }) => eCommerceApp.product;

export default productSlice.reducer;
