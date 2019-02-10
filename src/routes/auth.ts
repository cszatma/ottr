import { NextFunction, Request, Response, Router } from 'express';
import passport from 'passport';
import uuid from 'uuid';
import bcrypt from 'bcrypt';

import getClient from '../postgres/get-client';
import { AuthRequest } from '../types/express-extensions';
import requireLogin from '../middlewares/require-login';

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

router.put('/update', requireLogin, async (req: AuthRequest, res: Response) => {
  const user = req.user!;
  const { name, email, password, latitude, longitude, points } = req.body;
  const hash = password && (await bcrypt.hash(password, 10));

  getClient(async client => {
    const result = await client.query(
      'UPDATE ottr_user SET name = $1, email = $2, password = $3, latitude = $4, longitude = $5, points = $6 WHERE id = $7',
      [name, email, hash, latitude, longitude, points],
    );

    res.json(result);
  });
});

export default router;
