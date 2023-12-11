import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { MeQuery } from "src/graphql";

interface StoreState {
  me:
    | (Pick<
        NonNullable<MeQuery["me"]>,
        | "id"
        | "name"
        | "bio"
        | "avatar"
        | "jobTitle"
        | "is_admin"
        | "last_seen_notification_time"
        | "primary_nostr_key"
        | "private_data"
      > & {
        is_tournament_org?: boolean;
      })
    | undefined
    | null;
}

const initialState = {
  me: undefined,
} as StoreState;

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setMeData(state, action: PayloadAction<StoreState["me"]>) {
      const isTournamentOrg =
        !!action.payload?.private_data?.tournaments_organizing &&
        action.payload?.private_data?.tournaments_organizing.length > 0;

      if (action.payload)
        state.me = { ...action.payload, is_tournament_org: isTournamentOrg };
      else state.me = action.payload;
    },
    updateMeData(state, action: PayloadAction<Partial<StoreState["me"]>>) {
      if (state.me && action.payload) {
        state.me = { ...state.me, ...action.payload };

        const isTournamentOrg =
          !!state.me?.private_data?.tournaments_organizing &&
          state.me?.private_data?.tournaments_organizing.length > 0;
        state.me.is_tournament_org = isTournamentOrg;
      }
    },
  },
});

export const { setMeData, updateMeData } = userSlice.actions;

export default userSlice.reducer;
