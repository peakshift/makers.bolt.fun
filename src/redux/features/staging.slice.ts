import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { CreateStoryType } from "src/features/Posts/pages/CreatePostPage/CreateStoryPage/CreateStoryPage";

interface StoreState {
    story: CreateStoryType | null

}

const initialState = {
    story: null

} as StoreState;

export const stagingSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        stageStory(state, action: PayloadAction<StoreState['story']>) {
            state.story = action.payload;
        },
        unstageStory(state) {
            state.story = null;
        },
        unstageAll(state) {
            state.story = null;
        }
    },
});

export const {
    stageStory,
    unstageStory,
    unstageAll,
} = stagingSlice.actions;

export default stagingSlice.reducer;
