import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Project } from "../../utils/interfaces";

import mockData from "../../api/mockData.json";

interface StoreState {
  project: Project;
}

const initialState = {
  ...mockData.project,
} as Project;

export const projectSlice = createSlice({
  name: "project",
  initialState,
  reducers: {
    setProject(state, action: PayloadAction<Project>) {
      state = action.payload;
      console.log("called:setProject",state);
    },

    unsetProject(state) {
      state = mockData.project;
    },
  },
});

export const { setProject } = projectSlice.actions;

export default projectSlice.reducer;
