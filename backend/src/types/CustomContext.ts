import type { Request, Response } from 'express';
import type { User } from '../entities/User';

export default interface CustomContext {
  req: Request;
  res: Response;
  user?: User;
  resource?: { owner: { id: string | number } };
}
