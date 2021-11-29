import { createSlice } from "@reduxjs/toolkit";

interface StoreState {
  isConnected: boolean;
  isLoading: boolean;
  provider: any;
}

const initialState = {
  isConnected: false,
  isLoading: false,
  provider: null,
} as StoreState;

export const walletSlice = createSlice({
  name: "wallet",
  initialState,
  reducers: {
    connectWallet(state) {
      state.isConnected = true;
    },
  },
});

export const { connectWallet } = walletSlice.actions;

export default walletSlice.reducer;
