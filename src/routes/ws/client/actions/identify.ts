import { apiState, DEV_MODE } from "../../../..";
import { db } from "../../../../db";
import { User } from "../../../../types";
import { clientConnections } from "../client";
import { ClientMessage } from "../types";

export const identifyClient = (ws: any, message: ClientMessage) => {
  const { clientName, clientCodename } = message.data as {
    clientName: string;
    clientCodename: string;
  };

  if (
    apiState
      .getState()
      .clients.some((client) => client.client === clientCodename) &&
    !DEV_MODE
  ) {
    console.log(
      `📡 Client ${clientName} (${clientCodename}) already identified (id: ${ws.id}), closing connection`
    );
    ws.close();
    return;
  }

  // ws.id is client_id
  clientConnections.set(ws.id, ws);

  apiState.setState((state) => ({
    clients: [
      ...state.clients,
      {
        clientName,
        clientID: ws.id,
        client: clientCodename,
        accounts: 0,
        status: "Setting up...",
      },
    ],
  }));

  const users = db.query(`SELECT * FROM users WHERE client = $client`).all({
    $client: clientCodename,
  }) as User[];

  const baseURL = db
    .query(`SELECT * FROM config WHERE key = 'baseURL'`)
    .get() as { id: number; key: string; value: string };

  const landingURL = db
    .query(`SELECT * FROM config WHERE key = 'landingURL'`)
    .get() as { id: number; key: string; value: string };

  ws.send({
    type: "initalize",
    data: {
      baseURL: baseURL.value,
      landingURL: landingURL.value,
      users: users,
    },
  });

  console.log(
    `📡 Client WebSocket successfully identified as ${clientName} (id: ${ws.id})`
  );

  return;
};
