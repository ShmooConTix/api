import { ApiState, apiState } from "../../..";
import { broadcastClientMessage } from "../client/client";
import { createUser } from "./actions/createUser";

export type EventMessage =
  | {
      type: "answer";
      data: string;
    };

export const eventConnections = new Map<string, any>();

export const broadcastEventMessage = (messageType: string, state: ApiState) => {
  eventConnections.forEach((ws: any) => {
    ws.send({
      type: messageType,
      data: state,
    });
  });
};

export const eventFunctions = {
  open(ws: any) {
    ws.send({
      type: "init",
      data: apiState.getState(),
    });

    eventConnections.set(ws.id, ws);

    console.log(`📡 Event WebSocket connected (id: ${ws.id})`);
  },
  
  message(ws: any, message: any) {
    switch (message.type) {
      case "answer":
        return sendRiddleAnswers(message.data);
      case "createUser":
        return createUser(message.data);
      default:
        console.log(`😖 Unknown message type: ${message.type}`);
    }
    if (message.type === "answer") sendRiddleAnswers(message.data);
  },

  close(ws: any) {
    console.log(`📡 Event WebSocket disconnected (id: ${ws.id})`);

    eventConnections.delete(ws.id);
  },
};

export const sendRiddleAnswers = (riddleAnswer: string) => {
    console.log(`🤔 Riddle Answer Received: ${riddleAnswer}`);

    broadcastClientMessage("riddleAnswer", riddleAnswer);
    apiState.setState(() => ({
      riddle: {
        imageURL: undefined,
        question: "",
        backupHTML: null,
      },
    }));
}