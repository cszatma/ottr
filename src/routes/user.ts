import { Request, Response, Router } from 'express';

import getClient from '../postgres/get-client';

const router = Router();

router.get('/', (req: Request, res: Response) => {
  getClient(async client => {
    const result = await client.query(
      'SELECT id, name, email, latitude, longitude, points FROM ottr_user',
    );
    res.json(result.rows);
  });
});

router.get('/:id', (req: Request, res: Response) => {
  getClient(async client => {
    const result = await client.query(
      'SELECT id, name, email, latitude, longitude, points FROM ottr_user WHERE id = $1',
      [req.params.id],
    );
    res.json(result.rows[0]);
  });
});

export default router;
