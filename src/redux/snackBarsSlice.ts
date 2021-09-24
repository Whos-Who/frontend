import { createSlice } from "@reduxjs/toolkit";

type SnackBars = SnackBar[];

const initialState: SnackBars = [];

export const snackBarsSlice = createSlice({
  name: "snackBars",
  initialState,
  reducers: {
    addSnackBar: (state, action) => {
      state.push(action.payload);
    },
    removeSnackBar: (state, action) => {
      const filtered = state.filter(
        (snackBar) => snackBar.id != action.payload.id
      );
      return [...filtered];
    },
    clearAllSnackBars: () => {
      return [...initialState];
    },
  },
});

export const { addSnackBar, removeSnackBar, clearAllSnackBars } =
  snackBarsSlice.actions;

export default snackBarsSlice.reducer;
