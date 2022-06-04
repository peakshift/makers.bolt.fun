import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface StoreState {
    me: {
        id: number;
        name: string;
        avatar: string;
        join_date: string;
    }
    | undefined // fetching user data if exist
    | null // user not logged in

}

const initialState = {
    me: undefined
} as StoreState;

export const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        setUser(state, action: PayloadAction<StoreState['me']>) {
            state.me = action.payload;
        },
    },
});

export const { setUser } = userSlice.actions;

export default userSlice.reducer;
