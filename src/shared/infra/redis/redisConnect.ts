import { createClient } from 'redis';

export async function redisConnect() {
  return await createClient()
    .on('error', (err) => console.log('Redis Client Error', err))
    .connect();
}
