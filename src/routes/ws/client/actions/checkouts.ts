import { apiState } from "../../../..";
import { db } from "../../../../db";
import { WSCheckout } from "../../../../types";
import { getCheckouts } from "../../../dashboard/getCheckouts";

export const registerCheckout = (ws_id: string, c: WSCheckout) => {
    // insert the checkout into the database, the partial just doesnt have id
    db.query("INSERT INTO checkouts (client, confirmation_id, name, email, ticket_count) VALUES ($client, $confirmation_id, $name, $email, $ticket_count)").run({
        $client: c.client,
        $confirmation_id: c.confirmation_id,
        $name: c.name,
        $email: c.email,
        $ticket_count: c.ticket_count,
    });

    apiState.setState(() => ({
        checkouts: getCheckouts(), // refresh it 
    }));

    console.log(`📡 ${c.name} (${c.email}) checked out! (client ${c.client}, id: ${ws_id})`);
}