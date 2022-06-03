import { configureStore } from "@reduxjs/toolkit";
import modalsSlice from "./features/modals.slice";
import projectSlice from "./features/project.slice";
import walletSlice from "./features/wallet.slice";
import voteSlice from "./features/vote.slice";
import uiSlice from "./features/ui.slice";
import { actionReducer } from './features/action-reducer'
import userSlice from "./features/user.slice";
import stagingSlice from "./features/staging.slice";

const defaultStore = configureStore({
  reducer: {
    modals: modalsSlice,
    project: projectSlice,
    wallet: walletSlice,
    vote: voteSlice,
    ui: uiSlice,
    action: actionReducer,
    user: userSlice,
    staging: stagingSlice
  },
});

export let store = defaultStore;

export const createReduxStore = (initalState?: Partial<RootState>) => {
  return store = configureStore({
    reducer: {
      modals: modalsSlice,
      project: projectSlice,
      wallet: walletSlice,
      vote: voteSlice,
      ui: uiSlice,
      action: actionReducer,
      user: userSlice,
      staging: stagingSlice
    },
    preloadedState: initalState
  });
}

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
