import type { Coin } from '~~/models';
import { execQueryDocuments, sqlQuery } from '../../storage/client';

// Api to get available coins from storage.
export default defineEventHandler(async (event): Promise<Coin[]> => {
  const { mint } = getQuery(event);
  return execQueryDocuments(await sqlQuery('getCoinBars.sql', { mint: String(mint) }));
});
