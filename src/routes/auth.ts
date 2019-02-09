import { NextFunction, Request, Response, Router } from 'express';
import passport from 'passport';
import uuid from 'uuid';
import bcrypt from 'bcrypt';

import getClient from '../postgres/get-client';
import { AuthRequest } from '../types/express-extensions';

const router = Router();

router.get('/current_user', (req: AuthRequest, res: Response) => {
  res.json(req.user);
});

router.post(
  '/register',
  async (req: Request, res: Response, next: NextFunction) => {
    const { name, email, password, latitude, longitude } = req.body;

    const hash = await bcrypt.hash(password, 10);

    getClient(async client => {
      const result = await client.query(
        'INSERT INTO ottr_user (id, name, email, password, latitude, longitude) VALUES ($1, $2, $3, $4, $5, $6)',
        [uuid.v4(), name, email, hash, latitude, longitude],
      );

      res.json(result);
    });
  },
);

router.post(
  '/login',
  passport.authenticate('local'),
  (req: AuthRequest, res: Response) => {
    res.json(req.user);
  },
);

router.post('/logout', (req: Request, res: Response) => {
  req.logout();
  res.json({ loggedOut: true });
});

export default router;
