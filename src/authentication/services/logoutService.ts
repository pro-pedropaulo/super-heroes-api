import { inject, injectable } from 'tsyringe';

import Unauthorized from '../../shared/errors/unauthorized';
import { IUserRepository } from '../../users/repositories/IUserRepository';

import { BlacklistService } from './blacklistService';

@injectable()
export class LogoutService {
  constructor(
    @inject('UserRepository')
    private readonly userRepository: IUserRepository,
    private readonly blacklistService: BlacklistService,
  ) {}

  async execute(authHeader: string | undefined) {
    if (!authHeader) {
      throw new Unauthorized('Token missing');
    }

    const [, token] = authHeader.split(' ');

    await this.blacklistService.addToBlacklist(token);
  }
}
