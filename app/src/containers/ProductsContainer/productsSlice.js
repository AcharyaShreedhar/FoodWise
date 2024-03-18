// productsSlice.js
import { createSlice } from '@reduxjs/toolkit';

export const productsSlice = createSlice({
  name: 'products',
  initialState: {
    data: [],
    filters: {
      productName: '',
      productStatus: true,
      productExpiry: '',
    },
  },
  reducers: {
    setProductsData: (state, action) => {
      state.data = action.payload;
    },
    setProductFilters: (state, action) => {
      state.filters = action.payload;
    },
  },
});

export const { setProductsData, setProductFilters } = productsSlice.actions;

export default productsSlice.reducer;
