import { Pool } from 'pg';
import { DATABASE_URL } from '../env';

const poolPG = new Pool({
  connectionString: DATABASE_URL,
});

export { poolPG };
