import { apiState } from "../../../..";

export const setClientStatus = (client_id: string, status: string) => {
  console.log(`📡 Client ${client_id} status changed to "${status}"`);

  apiState.setState((state) => ({
    clients: state.clients.map((client) =>
      client.clientID === client_id ? { ...client, status } : client
    ),
  }));
};
