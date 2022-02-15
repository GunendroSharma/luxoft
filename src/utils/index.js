import store from "../store";
import { dataAction, DATA, EVENTS, eventAction } from "../actions";

export const setStoreFromDB = async (key, value) => {
  switch (key) {
    case DATA:
      store.dispatch(dataAction(value, false));
      break;
    case EVENTS:
      store.dispatch(eventAction(value, false));
      break;
    default:
      break;
  }
};

export const sortArray = (arr, isAscend) => {
  if (isAscend) {
    return arr.sort((a, b) => a.price - b.price);
  } else {
    return arr.sort((a, b) => b.price - a.price);
  }
};

export const getRoundFigure = (num, round) => {
  if (num < 1) round++;
  return num.toFixed(round);
};
