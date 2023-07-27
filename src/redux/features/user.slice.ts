import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { MeQuery, User } from "src/graphql";

interface StoreState {
  me: MeQuery["me"] | undefined;
}

const initialState = {
  me: undefined,
} as StoreState;

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setMeData(state, action: PayloadAction<StoreState["me"]>) {
      state.me = action.payload;
    },
    updateMeData(state, action: PayloadAction<Partial<StoreState["me"]>>) {
      if (state.me && action.payload)
        state.me = { ...state.me, ...action.payload };
    },
  },
});

export const { setMeData, updateMeData } = userSlice.actions;

export default userSlice.reducer;
