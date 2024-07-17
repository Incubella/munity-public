import { configureStore, createSelector } from "@reduxjs/toolkit";
import { setLocalItem } from "../base";
import { appReducer } from "./reducers";

export const store = configureStore({
  reducer: { app: appReducer },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }),
});

store.subscribe(() => {
  setLocalItem("app-state", store.getState().app, true);
});

const accountInfo = (state) => state.account;

export const getAccountState = createSelector(
  accountInfo,
  (account) => account
);
