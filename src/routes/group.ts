import { Request, Response, Router } from 'express';

import getClient from '../postgres/get-client';

const router = Router();

router.get('/', (req: Request, res: Response) => {
  getClient(async client => {
    const result = await client.query('SELECT * FROM ottr_group');
    res.json(result.rows);
  });
});

router.get('/:id', (req: Request, res: Response) => {
  getClient(async client => {
    const result = await client.query('SELECT * FROM ottr WHERE id = $1', [
      req.params.id,
    ]);
    res.json(result.rows[0]);
  });
});

router.post('/', (req: Request, res: Response) => {
  const { id, startDate, endDate, pointsEarned } = req.body;
  getClient(async client => {
    const result = await client.query(
      'INSERT INTO ottr_group (id, start_date, end_date, points_earned) VALUES ($1, $2, $3, $4)',
      [id, startDate, endDate, pointsEarned],
    );

    res.json(result);
  });
});

router.put('/:id', (req: Request, res: Response) => {
  const id = req.params.id;
  const { startDate, endDate, pointsEarned } = req.body;
  getClient(async client => {
    const result = await client.query(
      'UPDATE ottr_group SET start_date = $1, end_date = $2, points_earned = $3 WHERE id = $4',
      [startDate, endDate, pointsEarned, id],
    );

    res.json(result);
  });
});

export default router;
