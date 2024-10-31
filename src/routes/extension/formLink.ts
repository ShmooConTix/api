import { broadcastClientMessage } from "../ws/client/client";

export function formLink(body: { linkBody: string; }) {
    console.log(`🔗 Link Received: ${body.linkBody}`);

    broadcastClientMessage("formLink", body.linkBody);

    return {
        success: true
    };
}