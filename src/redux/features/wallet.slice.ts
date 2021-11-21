import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface StoreState {
  isConnected: boolean;
  isLoading: boolean;
}

const initialState = {
  isConnected: false,
  isLoading: false,
} as StoreState;

export const walletSlice = createSlice({
  name: "wallet",
  initialState,
  reducers: {},
});

export const {} = walletSlice.actions;

export default walletSlice.reducer;
