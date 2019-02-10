import { Request, Response, Router } from 'express';

import getClient from '../postgres/get-client';
import requireLogin from '../middlewares/require-login';
import { AuthRequest } from '../types/express-extensions';
import Location from '../utils/Location';

const router = Router();

router.get('/', (req: Request, res: Response) => {
  getClient(async client => {
    const result = await client.query('SELECT * FROM contact');
    res.json(result.rows);
  });
});

router.get('/:id', (req: Request, res: Response) => {
  getClient(async client => {
    const result = await client.query('SELECT * FROM contact WHERE id = $1', [
      req.params.id,
    ]);
    res.json(result.rows[0]);
  });
});

router.post('/', (req: Request, res: Response) => {
  const { id1, id2 } = req.body;
  getClient(async client => {
    const result = await client.query(
      'INSERT INTO contact (user1_id, user2_id) VALUES ($1, $2)',
      [id1, id2],
    );

    res.json(result);
  });
});

router.get('/nearby', requireLogin, (req: AuthRequest, res: Response) => {
  const userLocation = Location.ofUser(req.user!);
});

export default router;
