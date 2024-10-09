import { apiState } from "../../../..";
import type { Riddle } from "../../../../types";

export const setRiddle = (wsID: string, riddle: Riddle) => {
    const identifiedClient = apiState
      .getState()
      .clients.find((client) => client.clientID === wsID);
    if (!identifiedClient) return;
  
    const r = apiState.getState().riddle;
  
    if (r.question || r.backupHTML !== null) {
      console.log(
        `📡 Client ${identifiedClient.clientName} [${identifiedClient.client}] attempted to set riddle (already set):` +
          `\n   Question: ${riddle.question}\n   Image URL: ${riddle.imageURL}\n   Backup HTML: ${riddle.backupHTML}`
      );
      return;
    }
  
    apiState.setState({
      riddle,
    });
  
    console.log(
      `📡 Client ${identifiedClient.clientName} [${identifiedClient.client}] set riddle:` +
        `\n   Question: ${riddle.question}\n   Image URL: ${riddle.imageURL}\n   Backup HTML: ${riddle.backupHTML}`
    );
  };