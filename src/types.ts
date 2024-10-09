export type Statistics = {
  ticketsPurchased: number;
  totalSpent: number;
  users: number;
};

export type Configuration = {
  baseURL: string;
  webhookURL: string;
}

export type WSCheckout = {
  client: "ts" | "go" | "rs";
  confirmation_id: string;
  name: string;
  email: string;
  ticket_count: number;
};

export type DBCheckout = {
  id: number;
  client: "ts" | "go" | "rs";
  confirmation_id: string;
  name: string;
  email: string;
  ticket_count: number;
  purchased_at: string;
};

export type Client = {
  clientName: string;
  clientID: string;
  client: string; // "ts" | "go" | "rs"
  accounts: number;
  status: string;
};

export type User = {
  id: number;
  name: string;
  email: string;
  proxy?: string;
  client: "ts" | "go" | "rs";
  created_at: string;
};

export type UserState = {
  id: number;
  name: string;
  email: string;
  client: "ts" | "go" | "rs";
  status: string;
  created_at: string;
};

export type Riddle =
  | {
      question: string;
      imageURL?: string; // on client, if it starts with /, it will change it to baseURL
      backupHTML: null;
    }
  | {
      question: null;
      imageURL: null;
      backupHTML: string;
    };
