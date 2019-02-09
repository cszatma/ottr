import { Request, Response, NextFunction, RequestHandler } from 'express';

export const catchErrors = (fn: RequestHandler) => (
  req: Request,
  res: Response,
  next: NextFunction,
) => fn(req, res, next).catch(next);

export const handleErrors = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction,
) => res.status(500).json({ error: err });
