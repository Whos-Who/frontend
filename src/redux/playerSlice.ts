import { createSlice } from "@reduxjs/toolkit";

import { RootState } from "./store";

interface PlayerState {
  id: string | null;
  name: string | null;
}

const initialState: PlayerState = {
  id: null,
  name: null,
};

export const playerSlice = createSlice({
  name: "player",
  initialState,
  reducers: {
    setPlayerId: (state, action) => {
      state.id = action.payload.id;
    },
    setPlayerName: (state, action) => {
      state.name = action.payload.name;
    },
    resetPlayerState: () => {
      return {
        ...initialState,
      };
    },
  },
});

export const { setPlayerId, setPlayerName, resetPlayerState } =
  playerSlice.actions;

export const selectPlayerId = (state: RootState): string | null =>
  state.player.id;

export default playerSlice.reducer;
