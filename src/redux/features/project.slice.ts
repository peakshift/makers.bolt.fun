import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Project } from "../../utils/interfaces";

interface StoreState {
  project: Project | null;
  projectSet: boolean;
}

const initialState = {
  project: null,
} as StoreState;

export const projectSlice = createSlice({
  name: "project",
  initialState,
  reducers: {
    setProject(state, action: PayloadAction<Project | null>) {
      state.project = action.payload;
    },


  },
});

export const { setProject } = projectSlice.actions;

export default projectSlice.reducer;
