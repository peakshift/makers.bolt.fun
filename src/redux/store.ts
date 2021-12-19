import { configureStore } from "@reduxjs/toolkit";
import modalsSlice from "./features/modals.slice";
import projectSlice from "./features/project.slice";
import walletSlice from "./features/wallet.slice";
import themeSlice from "./features/theme.slice";

export const store = configureStore({
  reducer: {
    modals: modalsSlice,
    project: projectSlice,
    wallet: walletSlice,
    theme: themeSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
