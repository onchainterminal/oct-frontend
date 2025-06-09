import type { Coin } from '~~/models';
import { execQueryDocuments, sqlQuery } from '../storage/client';

// Api to get available coins from storage.
export default defineEventHandler(async (): Promise<Coin[]> => {
  return execQueryDocuments(await sqlQuery('getCoins.sql'));
});
