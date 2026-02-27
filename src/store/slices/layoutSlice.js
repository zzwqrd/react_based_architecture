import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  currentIndex: 0,
};

const layoutSlice = createSlice({
  name: 'layout',
  initialState,
  reducers: {
    changeBottomNavIndex(state, action) {
      state.currentIndex = action.payload;
    },
  },
});

export const { changeBottomNavIndex } = layoutSlice.actions;
export default layoutSlice.reducer;
