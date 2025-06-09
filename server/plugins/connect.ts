import { connect } from '~~/server/storage/client';

// Defines Plugin which connects to database.
export default defineNitroPlugin(async (): Promise<void> => {
  await connect();
});
