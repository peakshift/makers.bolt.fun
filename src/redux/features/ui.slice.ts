import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface StoreState {
  navHeight: number;
  isMobileDevice: boolean;
}

const initialState = {
  navHeight: 0,
  isMobileDevice:
    /Android|webOS|iPhone|iPad|iPod|BlackBerry/i.test(navigator.userAgent) ||
    window.innerWidth < 480,
} as StoreState;

export const uiSlice = createSlice({
  name: "ui",
  initialState,
  reducers: {
    setNavHeight(state, action: PayloadAction<number>) {
      state.navHeight = action.payload;
    },
    setIsMobileDevice(state, action: PayloadAction<boolean>) {
      state.isMobileDevice = action.payload;
    },
  },
});

export const { setNavHeight, setIsMobileDevice } = uiSlice.actions;

export default uiSlice.reducer;
