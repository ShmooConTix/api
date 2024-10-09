import { Database } from "bun:sqlite";
import { faker } from "@faker-js/faker";

export const db = new Database("./data/shmoocon.sqlite", {
  create: true,
});

const insertUserQuery = db.query(
  `INSERT INTO users (name, email, client) VALUES ($name, $email, $client_id)`
);
const insertCheckoutQuery = db.query(
  `
  INSERT INTO checkouts
    (client, confirmation_id, name, email, ticket_count) 
  VALUES 
    ($client, $cid, $name, $email, $tc)`
);

for (let i = 0; i < 5; i++) {
  const name = faker.person.fullName();
  const email = faker.internet.email({
    firstName: name.split(" ")[0],
    lastName: name.split(" ")[1],
  });
  const client = ["go", "rs", "ts"][Math.floor(Math.random() * 3)];

  insertUserQuery.run({ $name: name, $email: email, $client_id: client });
  insertCheckoutQuery.run({
    $client: client,
    $cid: faker.string.uuid(),
    $name: name,
    $email: email,
    $tc: Math.floor(Math.random() * 2) + 1,
  })
}
