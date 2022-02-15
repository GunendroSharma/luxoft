import { createAction } from "@reduxjs/toolkit";
import { DATA, EVENTS, INDEX_DB, IS_LOADED } from ".";
import store from "../store";

const updateIsLoaded = createAction(IS_LOADED);
const updateIndexDB = createAction(INDEX_DB);
const updateEvents = createAction(EVENTS);
const updateData = createAction(DATA);

export const indexDBActionAction = (data) => async (dispatch) => {
  dispatch(updateIndexDB(data));
};

export const isLoadedAction = (data) => async (dispatch) => {
  dispatch(updateIsLoaded(data));
};

export const eventAction =
  (data, updateDb = true) =>
  async (dispatch) => {
    const updatedData = JSON.parse(JSON.stringify(store.getState().events));
    updatedData[data.event] = data;
    if (updateDb) {
      dispatch(
        indexDBActionAction({ type: "set", key: EVENTS, value: updatedData })
      );
    }
    dispatch(updateEvents(updatedData));
  };

export const dataAction =
  (data, updateDb = true) =>
  async (dispatch) => {
    if (!updateDb) return dispatch(updateData(data));
    const updatedData = JSON.parse(JSON.stringify(store.getState().data));
    const [price] = data.value;
    if (typeof price === "number") {
      updatedData[price] = data.value;
    } else {
      data.value.forEach((element) => {
        const [indPrice] = element;
        updatedData[indPrice] = element;
      });
    }
    dispatch(updateData(updatedData));
    dispatch(
      indexDBActionAction({ type: "set", key: DATA, value: updatedData })
    );
  };
