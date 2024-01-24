import {
  createAsyncThunk,
  createEntityAdapter,
  createSlice,
} from "@reduxjs/toolkit";
import { http } from "../../../../api/http";

export const getProducts = createAsyncThunk(
  "eCommerceApp/products/getProducts",
  async () => {
    const response = await http(false).get("products/");
    console.log(response)
    const data = await response.data?.results;

    return data;
  }
);

export const removeProducts = createAsyncThunk(
  "eCommerceApp/products", () => console.log("all removed")
  // async (productIds, { dispatch, getState }) => {
  //   await axios.delete("products/", { data: productIds });

  //   return productIds;
  // }
);

const productsAdapter = createEntityAdapter({});

export const { selectAll: selectProducts, selectById: selectProductById } =
  productsAdapter.getSelectors((state) => state.eCommerceApp.products);

const productsSlice = createSlice({
  name: "eCommerceApp/products",
  initialState: productsAdapter.getInitialState({
    searchText: "",
  }),
  reducers: {
    setProductsSearchText: {
      reducer: (state, action) => {
        state.searchText = action.payload;
      },
      prepare: (event) => ({ payload: event.target.value || "" }),
    },
  },
  extraReducers: {
    [getProducts.fulfilled]: productsAdapter.setAll,
    [removeProducts.fulfilled]: (state, action) =>
      productsAdapter.removeMany(state, action.payload),
  },
});

export const { setProductsSearchText } = productsSlice.actions;

export const selectProductsSearchText = ({ eCommerceApp }) =>
  eCommerceApp.products.searchText;

export default productsSlice.reducer;
