import { createSlice } from "@reduxjs/toolkit";

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
    setNameAndId: (state, action) => {
      state.id = action.payload.id;
      state.name = action.payload.name;
    },
  },
});

export const { setPlayerId, setPlayerName, setNameAndId } = playerSlice.actions;

export default playerSlice.reducer;
