import { Elysia, t } from "elysia";
import { initDB } from "./db";
import { getCheckouts } from "./routes/dashboard/getCheckouts";
import { fetchStats } from "./routes/dashboard/fetchStats";
import { createStore } from "zustand/vanilla";
import {
  broadcastEventMessage,
  eventFunctions,
} from "./routes/ws/events/events";
import { clientWSfunctions } from "./routes/ws/client/client";
import {
  DBCheckout,
  Client,
  Riddle,
  Statistics,
  Configuration,
  UserState,
} from "./types";
import { getAllConfig, setConfig } from "./routes/dashboard/setConfig";
import cors from "@elysiajs/cors";
import { getUsers } from "./routes/dashboard/getUsers";
import { answerRoute } from "./routes/extension/answer";
import { formLink } from "./routes/extension/formLink";
import { solveRiddle } from "./routes/ai/solveRiddle";

export const DEV_MODE = true;

export interface ApiState {
  stats: Statistics;
  checkouts: DBCheckout[];
  clients: Client[];
  riddle: Riddle;
  config: Configuration;
  users: UserState[];
}

// called BEFORE store is created
initDB();

export const apiState = createStore<ApiState>(() => ({
  stats: fetchStats(),
  checkouts: getCheckouts(),
  clients: [],
  riddle: {
    imageURL: undefined,
    question: "",
    backupHTML: null,
  },
  config: getAllConfig(),
  users: getUsers(),
}));

apiState.subscribe((state) => broadcastEventMessage("stateChanged", state));

const app = new Elysia()
  .use(cors())
  .post(
    "/config",
    ({ body }) => {
      setConfig(body.key, body.value);

      return {
        success: true,
      };
    },
    {
      body: t.Object({
        key: t.String(),
        value: t.String(),
      }),
    }
  )
  .post("/acceptExtensionAnswer", ({ body }) => answerRoute(body), {
    body: t.Object({
      answer: t.String(),
    }),
  })
  .post("/extensionLinkBody", ({ body }) => formLink(body), {
    body: t.Object({
      linkBody: t.String(),
    }),
  })
  .ws("/events", eventFunctions)
  .ws("/client", clientWSfunctions)
  .post("/ai/solve", solveRiddle, {
    body: t.Object({
      riddle: t.String(),
    }),
    response: t.Object({
      answer: t.String(),
    }),
  })
  .listen(80);

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
);
