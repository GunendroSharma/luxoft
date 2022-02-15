import { createReducer } from "@reduxjs/toolkit";

export const initialState = {
  isLoaded: false,
  events: {},
  data: {}
};

export const app = createReducer(initialState, {
  IS_LOADED: (state, action) => {
    state.isLoaded = action.payload;
    return state;
  },
  DATA: (state, action) => {
    state.data = action.payload;
    return state;
  },
  EVENTS: (state, action) => {
    state.events = action.payload;
    return state;
  }
});
