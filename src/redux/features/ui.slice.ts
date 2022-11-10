import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface StoreState {
  navHeight: number;
  isMobileScreen: boolean;
  theme: 'light' | 'dark'
}

const initialState = {
  navHeight: 0,
  isMobileScreen: /Android|webOS|iPhone|iPad|iPod|BlackBerry/i.test(navigator.userAgent) || window.innerWidth < 480,
  theme: "light"
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
    setTheme(state, action: PayloadAction<StoreState['theme']>) {
      state.theme = action.payload;
    }
  },
});

export const { setNavHeight, setIsMobileScreen, setTheme } = uiSlice.actions;

export default uiSlice.reducer;
