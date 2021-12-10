import { requestProvider } from "webln";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface StoreState {
  isConnected: boolean;
  isLoading: boolean;
  provider: any;
}

const isWebLNConnected = () => {
  // since webln spec expects webln.enable() to be called on each load
  // and extensions like alby do not inject the webln object with true
  // every refresh requires the user to re-enable, even if its been
  // given premission previously.
  // 
  // that is to say ... this function is quite useless
  if (typeof window.webln === 'undefined') {
    return false;
  } else if (window.webln.enabled === true) {
    return true;
  }
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
    connectWallet(state, action: PayloadAction<any>) {
      state.isConnected = action.payload ? true : false;
      state.provider = action.payload;
    },
  },
});

export const { connectWallet } = walletSlice.actions;

export default walletSlice.reducer;
