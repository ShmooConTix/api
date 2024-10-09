import { z } from "zod";
import { db } from "../../../../db";
import { apiState } from "../../../..";
import { getUsers } from "../../../dashboard/getUsers";

export const addUserFormSchema = z.object({
  name: z.string(),
  email: z.string().email(),
  proxy: z.string().optional(),
  client: z.literal("go").or(z.literal("rs")).or(z.literal("ts")),
  ticketCount: z.literal("1").or(z.literal("2")),
});

export function createUser(body: z.infer<typeof addUserFormSchema>) {
  db.query(
    "INSERT INTO users (name, email, proxy, client) VALUES (?, ?, ?, ?)"
  ).run(body.name, body.email, body.proxy ?? null, body.client);

  apiState.setState(() => ({
    users: getUsers(),
  }));

  console.log(`👤 User created: ${body.name} (${body.email})`);
}
