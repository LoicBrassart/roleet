import type { Request, Response } from "express";
import type { User } from "../entities/User";

export default interface AuthContext {
  req: Request;
  res: Response;
  user?: User;
}
