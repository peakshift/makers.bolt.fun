import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface StoreState {
  navHeight: number;
  isMobileScreen: boolean;
}

const initialState = {
  navHeight: 0,
  isMobileScreen: /Android|webOS|iPhone|iPad|iPod|BlackBerry/i.test(navigator.userAgent) || window.innerWidth < 480,
} as StoreState;



export const uiSlice = createSlice({
  name: "ui",
  initialState,
  reducers: {
    setNavHeight(state, action: PayloadAction<number>) {
      state.navHeight = action.payload;
    },
    setIsMobileScreen(state, action: PayloadAction<boolean>) {
      state.isMobileScreen = action.payload;
    },
  },
});

export const { setNavHeight, setIsMobileScreen } = uiSlice.actions;

export default uiSlice.reducer;
