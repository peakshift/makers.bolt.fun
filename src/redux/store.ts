import { configureStore } from "@reduxjs/toolkit";
import modalsSlice from "./features/modals.slice";

export const store = configureStore({
  reducer: {
    modals: modalsSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
