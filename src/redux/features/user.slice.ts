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
    setUser(state, action: PayloadAction<StoreState["me"]>) {
      state.me = action.payload;
    },
  },
});

export const { setUser } = userSlice.actions;

export default userSlice.reducer;
