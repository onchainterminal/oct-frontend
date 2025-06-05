import { env } from 'node:process';
import { createClient } from '@clickhouse/client';

// Defines Plugin which connects to database.
export default defineNitroPlugin(async (): Promise<void> => {
  const client = createClient({
    url: env.DB_URL
  });

  const resultSet = await client.query({
    query: 'SELECT * FROM pumpfun_trades LIMIT 4',
    format: 'JSONEachRow'
  });

  const dataset = await resultSet.json();
});
