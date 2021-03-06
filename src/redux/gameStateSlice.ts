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
    setHost: (state, action) => {
      state.host = action.payload.host;
    },
    addPlayer: (state, action) => {
      state.players[action.payload.clientId] = action.payload.player;
      state.playerCount += 1;
    },
    removePlayer: (state, action) => {
      delete state.players[action.payload.clientId];
      state.playerCount -= 1;
    },
    resetGameState: () => {
      return {
        ...initialState,
      };
    },
  },
});

export const {
  setGameState,
  setRoomCode,
  setPhase,
  setHost,
  addPlayer,
  removePlayer,
  resetGameState,
} = gameStateSlice.actions;

export const selectPhase = (state: RootState): Phase | null =>
  state.gameState.phase;

export const selectQuestion = (state: RootState): string =>
  state.gameState.currQuestion;

export default gameStateSlice.reducer;
