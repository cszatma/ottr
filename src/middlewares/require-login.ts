import { NextFunction, Response } from 'express';
import { AuthRequest } from '../types/express-extensions';

export default (req: AuthRequest, res: Response, next: NextFunction) => {
  if (!req.user) {
    return res.status(401).send({ error: 'You must be logged in!' });
  }

  next();
};
