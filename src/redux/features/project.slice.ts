import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Project } from "../../utils/interfaces";

interface StoreState {
  openId: Project["id"] | null;
  project: Project | null;
}

const initialState = {
  project: null,
} as StoreState;

export const projectSlice = createSlice({
  name: "project",
  initialState,
  reducers: {
    openProject(state, action: PayloadAction<StoreState["openId"]>) {
      state.openId = action.payload;
    },
    setProject(state, action: PayloadAction<StoreState["project"]>) {
      state.project = action.payload;
    },
  },
});

export const { setProject, openProject } = projectSlice.actions;

export default projectSlice.reducer;
