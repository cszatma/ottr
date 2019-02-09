import { Pool } from 'pg';

if (!process.env.PGUSER) {
  throw new Error('PGUSER is not defined');
} else if (!process.env.PGHOST) {
  throw new Error('PGHOST is not defined');
} else if (!process.env.PGDATABASE) {
  throw new Error('PGDATABASE is not defined');
} else if (!process.env.PGPORT) {
  throw new Error('PGPORT is not defined');
}

export default new Pool({
  user: process.env.PGUSER,
  host: process.env.PGHOST,
  database: process.env.PGDATABASE,
  password: process.env.PGPASSWORD || '',
  port: parseInt(process.env.PGPORT, 10),
});
