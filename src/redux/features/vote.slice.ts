import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface StoreState {
    voteAmount: number;

}

const initialState = {
    voteAmount: 0
} as StoreState;

export const voteSlice = createSlice({
    name: "vote",
    initialState,
    reducers: {
        setVoteAmount(state, action: PayloadAction<StoreState['voteAmount']>) {
            state.voteAmount = action.payload;
        },
    },
});

export const { setVoteAmount } = voteSlice.actions;

export default voteSlice.reducer;
