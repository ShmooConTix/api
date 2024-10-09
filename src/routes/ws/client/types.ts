import { WSCheckout, Riddle } from "../../../types";

export type ClientMessage =
  | {
      type: "identify";
      data: {
        clientName: string;
        clientCodename: string;
      };
    }
  | {
      type: "status";
      data: {
        status: string;
      };
    }
  | {
      type: "riddle";
      data: Riddle;
    }
  | {
    type: "checkout",
    data: WSCheckout;
  };