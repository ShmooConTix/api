import { db } from "../../db";
import { DBCheckout } from "../../types";

export function getCheckouts() {
  const checkouts = db.query(`SELECT * FROM checkouts`).all() as DBCheckout[];

  return checkouts.map((c: DBCheckout) => {
    const d = new Date(c.purchased_at);

    return {
      id: c.id,
      confirmation_id: c.confirmation_id,
      name: c.name,
      email: c.email,
      client: c.client,
      purchased_at: `${d.getFullYear()}-${d.getMonth()}-${d.getDate()}`,
      ticket_count: c.ticket_count,
    };
  });
}
