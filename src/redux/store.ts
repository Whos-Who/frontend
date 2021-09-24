import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "redux";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import thunk from "redux-thunk";

import gameSetupSlice from "./gameSetupSlice";
import gameStateSlice from "./gameStateSlice";
import playerSlice from "./playerSlice";
import snackBarsSlice from "./snackBarsSlice";
import userSlice from "./userSlice";
import validitySlice from "./validitySlice";

const reducers = combineReducers({
  user: userSlice,
  player: playerSlice,
  gameState: gameStateSlice,
  gameSetup: gameSetupSlice,
  validity: validitySlice,
  snackBars: snackBarsSlice,
});

const persistConfig = {
  key: "root",
  storage,
  blacklist: ["snackBars"],
};

const persistedReducer = persistReducer(persistConfig, reducers);

const store = configureStore({
  reducer: persistedReducer,
  devTools: process.env.NODE_ENV !== "production",
  middleware: [thunk],
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;

export default store;
