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
    setNameAndId: (state, action) => {
      state.id = action.payload.id;
      state.name = action.payload.name;
    },
  },
});

export const { setNameAndId } = playerSlice.actions;

export default playerSlice.reducer;
