import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface StoreState {
  navHeight: number;
  isMobileScreen: boolean;
}

const initialState = {
  navHeight: 88,
  isMobileScreen: /Android|webOS|iPhone|iPad|iPod|BlackBerry/i.test(navigator.userAgent) || window.innerWidth < 480,
} as StoreState;



export const themeSlice = createSlice({
  name: "theme",
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

export const { setNavHeight, setIsMobileScreen } = themeSlice.actions;

export default themeSlice.reducer;
