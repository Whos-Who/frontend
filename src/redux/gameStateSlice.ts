import { createSlice } from "@reduxjs/toolkit";

import { Phase } from "../constants/Phases";
import { RootState } from "./store";

const initialState: GameState = {
  roomCode: null,
  phase: null,
  host: "",
  currQuestion: "",
  currAnswerer: "",
  playerCount: 0,
  questionsLeft: 0,
  selectedPlayerId: "",
  selectedAnswer: "",
  players: {},
};

export const gameStateSlice = createSlice({
  name: "gameState",
  initialState,
  reducers: {
    setGameState: (state, action) => {
      return {
        ...state,
        ...action.payload,
      };
    },
    setRoomCode: (state, action) => {
      state.roomCode = action.payload.roomCode;
    },
    setPhase: (state, action) => {
      state.phase = action.payload.phase;
    },
  },
});

export const { setGameState, setRoomCode, setPhase } = gameStateSlice.actions;

export const selectPhase = (state: RootState): Phase | null =>
  state.gameState.phase;

export const selectPlayers = (state: RootState): Record<string, PlayerState> =>
  state.gameState.players;

export const selectPlayerCount = (state: RootState): number =>
  state.gameState.playerCount;

export const selectHostId = (state: RootState): string => state.gameState.host;

export default gameStateSlice.reducer;
