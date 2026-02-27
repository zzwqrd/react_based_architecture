import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  items: [],
  loading: false,
  error: null,
};

const wishlistSlice = createSlice({
  name: 'wishlist',
  initialState,
  reducers: {
    setWishlistLoading(state) {
      state.loading = true;
      state.error = null;
    },
    setWishlistSuccess(state, action) {
      state.loading = false;
      state.items = action.payload ?? [];
    },
    setWishlistError(state, action) {
      state.loading = false;
      state.error = action.payload;
    },
    toggleWishlistItem(state, action) {
      const idx = state.items.findIndex((i) => i.sku === action.payload.sku);
      if (idx >= 0) {
        state.items.splice(idx, 1);
      } else {
        state.items.push(action.payload);
      }
    },
    clearWishlist(state) {
      state.items = [];
    },
  },
});

export const {
  setWishlistLoading, setWishlistSuccess, setWishlistError,
  toggleWishlistItem, clearWishlist,
} = wishlistSlice.actions;
export default wishlistSlice.reducer;
