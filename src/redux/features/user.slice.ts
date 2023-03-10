import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { User } from "src/graphql";

interface StoreState {
  me:
    | Pick<User, "id" | "name" | "avatar" | "bio" | "jobTitle" | "join_date">
    | undefined // fetching user data if exist
    | null; // user not logged in
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
