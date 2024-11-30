import { apiState } from "../../../..";
import { aiMode } from "../../../../config";
import type { Riddle } from "../../../../types";
import { solveRiddle } from "../../../ai/solveRiddle";
import { sendRiddleAnswers } from "../../events/events";

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

    if (aiMode) {
      console.log(`🧠 AI solving riddle: ${riddle.question ?? riddle.backupHTML}`);

      solveRiddle({ body: { riddle: riddle.question ?? riddle.backupHTML } }).then((response) => {
        console.log(
          `🧠 AI solved riddle: ${riddle.question} -> ${response.answer}`
        );
  
        sendRiddleAnswers(response.answer);
      });
    }
  };