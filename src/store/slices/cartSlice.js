import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  items: [],       // cart line items
  totalQty: 0,
  totalPrice: 0,
  loading: false,
  error: null,
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    setCartLoading(state) {
      state.loading = true;
      state.error = null;
    },
    setCartSuccess(state, action) {
      state.loading = false;
      state.items = action.payload.items ?? [];
      state.totalQty = action.payload.totalQty ?? 0;
      state.totalPrice = action.payload.totalPrice ?? 0;
    },
    setCartError(state, action) {
      state.loading = false;
      state.error = action.payload;
    },
    addItem(state, action) {
      const existing = state.items.find((i) => i.sku === action.payload.sku);
      if (existing) {
        existing.quantity += action.payload.quantity ?? 1;
      } else {
        state.items.push({ ...action.payload, quantity: action.payload.quantity ?? 1 });
      }
      state.totalQty = state.items.reduce((sum, i) => sum + i.quantity, 0);
    },
    removeItem(state, action) {
      state.items = state.items.filter((i) => i.sku !== action.payload);
      state.totalQty = state.items.reduce((sum, i) => sum + i.quantity, 0);
    },
    updateQuantity(state, action) {
      const item = state.items.find((i) => i.sku === action.payload.sku);
      if (item) item.quantity = action.payload.quantity;
      state.totalQty = state.items.reduce((sum, i) => sum + i.quantity, 0);
    },
    clearCart(state) {
      state.items = [];
      state.totalQty = 0;
      state.totalPrice = 0;
    },
  },
});

export const {
  setCartLoading, setCartSuccess, setCartError,
  addItem, removeItem, updateQuantity, clearCart,
} = cartSlice.actions;
export default cartSlice.reducer;
