import { injectable } from 'tsyringe';

import { redisConnect } from '../../shared/infra/redis/redisConnect';
@injectable()
export class BlacklistService {
  async addToBlacklist(token: string) {
    const client = await redisConnect();
    await client.set(token, 'blacklisted');
  }

  async isTokenBlacklisted(token: string) {
    const client = await redisConnect();
    return await client.get(token);
  }
}
