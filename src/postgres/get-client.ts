import { PoolClient } from 'pg';

import pool from './pool';

export default async (fn: (client: PoolClient) => void) => {
  let client;
  try {
    client = await pool.connect();
    fn(client);
  } catch (e) {
    console.error(e.message);
  } finally {
    if (client) {
      client.release();
    }
  }
};
