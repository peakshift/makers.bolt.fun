import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { CreateStoryType } from "src/features/Posts/pages/CreatePostPage/CreateStoryPage/CreateStoryPage";

interface StoreState {
  storyEdit: CreateStoryType | null;
  storyPreview: Partial<CreateStoryType> | null;
}

const initialState = {
  storyEdit: null,
  storyPreview: null,
} as StoreState;

export const stagingSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    stageStoryEdit(state, action: PayloadAction<StoreState["storyEdit"]>) {
      state.storyEdit = action.payload;
      state.storyPreview = null;
    },
    stageStoryPreview(
      state,
      action: PayloadAction<StoreState["storyPreview"]>
    ) {
      state.storyPreview = action.payload;
    },

    unstageStoryEdit(state) {
      state.storyEdit = null;
    },

    unstageStoryPreview(state) {
      state.storyPreview = null;
    },
    unstageAll(state) {
      state.storyEdit = null;
      state.storyPreview = null;
    },
  },
});

export const {
  stageStoryEdit,
  stageStoryPreview,
  unstageStoryEdit,
  unstageStoryPreview,
  unstageAll,
} = stagingSlice.actions;

export default stagingSlice.reducer;
