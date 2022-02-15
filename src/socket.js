import { dataAction, eventAction } from "./actions";
import { SOCKET_URL, SUBSCRIBE_CHANNEL } from "./constant";
import store from "./store";

const wss = new WebSocket(SOCKET_URL);

export const initializeSocket = () => {
  wss.onmessage = (msg) => {
    const data = JSON.parse(msg.data);
    if (data.event) {
      store.dispatch(eventAction(data));
      return console.log(data);
    }
    const [key, value] = data;
    store.dispatch(dataAction({ key, value }));
  };

  wss.onopen = () => {
    console.log("===== WebSocket connected =====");
    wss.send(JSON.stringify(SUBSCRIBE_CHANNEL));
  };
};
