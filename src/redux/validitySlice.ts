import { createSlice } from "@reduxjs/toolkit";

interface Validity {
  alreadyGuessed: boolean;
}

const initialState: Validity = {
  alreadyGuessed: false,
};

export const validitySlice = createSlice({
  name: "validitySlice",
  initialState,
  reducers: {
    setAlreadyGuessed: (state, action) => {
      state.alreadyGuessed = action.payload.alreadyGuessed;
    },
  },
});

export const { setAlreadyGuessed } = validitySlice.actions;

export default validitySlice.reducer;
