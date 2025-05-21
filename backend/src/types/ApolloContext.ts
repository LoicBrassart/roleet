import type { IncomingMessage, ServerResponse } from "node:http";
import type { UserToken } from "../lib/helpers/getUserFromReq";

type BaseContext = {
  req: IncomingMessage;
  res: ServerResponse<IncomingMessage>;
};

export type AnonContext = BaseContext & { user?: undefined };

export type AuthContext = BaseContext & {
  user: UserToken;
};
