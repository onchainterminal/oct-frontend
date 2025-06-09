import { env } from 'node:process';
import { template } from 'lodash-es';
import { createClient, type ResponseJSON, type ResultSet } from '@clickhouse/client';

// Defines ClickHouse client.
let client: ReturnType<typeof createClient>;

// Interpolate args to sql.
const argInterpolate: RegExp = /\${([\s\S]+?)}/g;

// Defines Query result formats.
enum ResultFormat {
  Documents = 'JSONEachRow',
  Document = 'JSON'
}

/** Connects to ClickHouse database. */
export function connect(): void {
  client = createClient({
    url: env.DB_URL
  });
}

/**
 * Executes query and returns documents.
 *
 * @param query Query to execute.
 * @returns Retrieved documents.
 */
export async function execQueryDocuments<T>(query: string): Promise<T[]> {
  const resultSet: ResultSet<ResultFormat.Documents> = await client.query({ query, format: ResultFormat.Documents });
  return await resultSet.json();
}

/**
 * Executes query and returns document.
 *
 * @param query Query to execute.
 * @returns Retrieved document.
 */
export async function execQueryDocument<T>(query: string): Promise<ResponseJSON<T>> {
  const resultSet: ResultSet<ResultFormat.Document> = await client.query({ query, format: ResultFormat.Document });
  return await resultSet.json();
}

/**
 * Create SQL query from name and args.
 *
 * @param name Name of the query.
 * @param args Args to interpolate.
 * @returns Created SQL query.
 */
export async function sqlQuery(name: string, args: Record<string, string> = {}): Promise<string> {
  const query: string = (await useStorage<string>('assets:sql').getItem(name))!;
  return template(query, { interpolate: argInterpolate })(args);
}
