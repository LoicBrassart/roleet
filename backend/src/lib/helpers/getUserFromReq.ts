import type { IncomingMessage } from "node:http";
import { verify } from "jsonwebtoken";
import type { Role } from "../../entities/User";

export type UserToken = {
  id: string;
  mail: string;
  name: string;
  roles: Role[];
};
export default function getUserFromReq(req: IncomingMessage) {
  if (!process.env.JWT_SECRET) return undefined;
  if (!req.headers.cookie) return undefined;

  const match = req.headers.cookie.match(/roleetAuthToken=([^;]+)/);
  if (!match) return undefined;

  const token = match[1];
  const user = verify(token, process.env.JWT_SECRET);
  if (typeof user === "string") return undefined;

  return user as UserToken;
}
