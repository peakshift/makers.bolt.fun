import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Project } from "../../utils/interfaces";

import mockData from "../../api/mockData.json";

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
    setProject(state, action: PayloadAction<Project>) {
      state.project = action.payload;
    },

    unsetProject(state) {
      state.project = null;
    },
  },
});

export const { setProject } = projectSlice.actions;

export default projectSlice.reducer;
