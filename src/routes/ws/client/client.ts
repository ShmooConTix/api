import { apiState } from "../../..";
import { WSCheckout } from "../../../types";
import { registerCheckout } from "./actions/checkouts";
import { identifyClient } from "./actions/identify";
import { setRiddle } from "./actions/riddle";
import { setClientStatus } from "./actions/status";
import { ClientMessage } from "./types";

export const clientConnections = new Map<string, any>();

export const broadcastClientMessage = (type: string, data: any) => {
  clientConnections.forEach((ws: any) => {
    ws.send({
      type,
      data,
    });
  });
};

export const clientWSfunctions = {
  open(ws: any) {
    console.log(`📡 Client WebSocket connected (id: ${ws.id})`);
  },

  close(ws: any) {
    clientConnections.delete(ws.id);

    apiState.setState((state) => ({
      clients: state.clients.filter((client) => client.client !== ws.id),
    }));

    console.log(`📡 Client WebSocket disconnected (id: ${ws.id})`);
  },

  message(ws: any, message: any) {
    if (!clientConnections.has(ws.id) && message.type !== "identify") return;

    switch (message.type) {
      case "identify":
        return identifyClient(ws, message as ClientMessage);
      case "status":
        return setClientStatus(ws.id, message.data.status);
      case "riddle":
        return setRiddle(ws.id, message.data);
      case "checkout":
        return registerCheckout(ws.id, message.data as WSCheckout);
      default:
        return;
    }
  },
};