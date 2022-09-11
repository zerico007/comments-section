import { configureStore } from "@reduxjs/toolkit";
import { stateReducer } from "./state";

export const store = configureStore({
  reducer: {
    state: stateReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

store.subscribe(() => {
  sessionStorage.clear();
  sessionStorage.setItem(
    "commentState",
    JSON.stringify(store.getState().state)
  );
});
