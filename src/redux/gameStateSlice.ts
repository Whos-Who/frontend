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
    addPlayer: (state, action) => {
      state.players[action.payload.clientId] = action.payload.player;
    },
    removePlayer: (state, action) => {
      delete state.players[action.payload.clientId];
    },
  },
});

export const { setGameState, setRoomCode, setPhase, addPlayer, removePlayer } =
  gameStateSlice.actions;

export const selectPhase = (state: RootState): Phase | null =>
  state.gameState.phase;

export default gameStateSlice.reducer;
