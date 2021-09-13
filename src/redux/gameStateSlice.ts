import { createSlice } from "@reduxjs/toolkit";

import { Phase } from "../constants/Phases";
import { RootState } from "./store";

const initialState: GameState = {
  roomCode: null,
  phase: null,
};

export const gameStateSlice = createSlice({
  name: "gameState",
  initialState,
  reducers: {
    setRoomCode: (state, action) => {
      console.log("yo");
      state.roomCode = action.payload.roomCode;
    },
    setPhase: (state, action) => {
      state.phase = action.payload.phase;
    },
  },
});

export const { setRoomCode, setPhase } = gameStateSlice.actions;

export const selectPhase = (state: RootState): Phase | null =>
  state.gameState.phase;

export default gameStateSlice.reducer;
