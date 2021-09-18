import { createSlice } from "@reduxjs/toolkit";

import { RootState } from "./store";

interface UserState {
  id: string | null;
  username: string | null;
  email: string | null;
  token: string | null;
}

const initialState: UserState = {
  id: null,
  username: null,
  email: null,
  token: null,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUserCredentials: (state, action) => {
      state.id = action.payload.id;
      state.username = action.payload.username;
      state.email = action.payload.email;
      state.token = action.payload.token;
    },
    logoutUser: (state) => {
      state.id = null;
      state.username = null;
      state.email = null;
      state.token = null;
    },
  },
});

export const { setUserCredentials, logoutUser } = userSlice.actions;

export const getUserToken = (state: RootState): string | null =>
  state.user.token;

export const isUserLoggedIn = (state: RootState): boolean =>
  state.user.id !== null;

export const getUsername = (state: RootState): string | null =>
  state.user.username;

export default userSlice.reducer;
