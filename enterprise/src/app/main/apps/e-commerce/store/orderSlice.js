import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

import { http } from "../../../../api/http";

export const getOrder = createAsyncThunk('eCommerceApp/order/getOrder', async (orderId) => {
  const response = await http(true).get(`/orders/${orderId}`);
  const data = await response.data;

  return data === undefined ? null : data;
});

export const saveOrder = createAsyncThunk('eCommerceApp/order/saveOrder', async (order) => {
  const response = await http(true).put('/orders', order);
  const data = await response.data;

  return data;
});

const orderSlice = createSlice({
  name: 'eCommerceApp/order',
  initialState: null,
  reducers: {
    resetOrder: () => null,
  },
  extraReducers: {
    [getOrder.fulfilled]: (state, action) => action.payload,
    [saveOrder.fulfilled]: (state, action) => action.payload,
  },
});

export const { resetOrder } = orderSlice.actions;

export const selectOrder = ({ eCommerceApp }) => eCommerceApp.order;

export default orderSlice.reducer;
