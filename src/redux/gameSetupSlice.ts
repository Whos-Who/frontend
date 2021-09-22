import { createSlice } from "@reduxjs/toolkit";

interface GameSetup {
  roomCode: string | null;
  deckId: string | null;
}

const initialState: GameSetup = {
  roomCode: null,
  deckId: null,
};

export const gameSetupSlice = createSlice({
  name: "gameSetup",
  initialState,
  reducers: {
    setupRoomCode: (state, action) => {
      state.roomCode = action.payload.roomCode;
    },
    setDeckId: (state, action) => {
      state.deckId = action.payload.deckId;
    },
    resetGameSetup: () => {
      return {
        ...initialState,
      };
    },
  },
});

export const { setupRoomCode, setDeckId, resetGameSetup } =
  gameSetupSlice.actions;

export default gameSetupSlice.reducer;
