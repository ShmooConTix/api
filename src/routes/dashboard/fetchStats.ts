import { db } from "../../db";
import { clientConnections } from "../ws/client/client";

export function fetchStats() {
  const { tickets_purchased } = db
    .query(`SELECT SUM(ticket_count) as tickets_purchased FROM checkouts`)
    .get() as { tickets_purchased: number | null };
  const { user_count } = db
    .query(`SELECT count(*) as user_count FROM users`)
    .get() as { user_count: number | null };

    return {
        ticketsPurchased: tickets_purchased || 0,
        totalSpent: tickets_purchased ? tickets_purchased * 175 : 0,
        connectedClients: clientConnections.size,
        users: user_count || 0,
    };
}
