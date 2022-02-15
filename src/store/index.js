import { configureStore } from "@reduxjs/toolkit";
import thunk from "redux-thunk";
import { INDEX_DB, isLoadedAction } from "../actions";
import { app } from "../reducers";
import { keys, get, set } from "idb-keyval";
import { setStoreFromDB } from "../utils";

function indexDBMiddleware({ dispatch, getState }) {
  return (next) => (action) => {
    if (action.type === INDEX_DB) {
      get("store").then(async () => {
        const { type, key, value } = action.payload;
        if (type === "set") {
          set(key, value);
        } else if (type === "get") {
          const storeKeys = await keys();
          for (const item of storeKeys) {
            const data = await get(item);
            await setStoreFromDB(item, data);
            dispatch(isLoadedAction(true));
          }
        }
      });
    }
    return next(action);
  };
}

const appStore = configureStore({
  devTools: process.env.NODE_ENV !== "production",
  middleware: [thunk, indexDBMiddleware],
  reducer: app
});

export default appStore;
