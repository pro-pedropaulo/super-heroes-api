import type { NextFunction, Request, Response } from 'express';
import { verify } from 'jsonwebtoken';
import { container } from 'tsyringe';

import Unauthorized from '../../../errors/unauthorized';
import { BlacklistService } from '../../../../authentication/services/blacklistService';
import { UserService } from '../../../../users/services/UserService';

const TOKEN_MISSING = 'Token missing';
const INVALID_TOKEN = 'Invalid token';

export async function isAuth(
  request: Request,
  response: Response,
  next: NextFunction,
): Promise<void> {
  const authHeader = request.headers.authorization;

  if (!authHeader) {
    throw new Unauthorized(TOKEN_MISSING);
  }

  const [, token] = authHeader.split(' ');

  try {
    const decoded = verify(token, process.env.APP_SECRET as string) as {
      sub: string;
    };

    const blacklistService = container.resolve(BlacklistService);
    const isTokenBlacklisted = await blacklistService.isTokenBlacklisted(token);

    if (isTokenBlacklisted) {
      throw new Unauthorized(INVALID_TOKEN);
    }

    const userService = container.resolve(UserService);
    await userService.findByIdUser(decoded.sub);

    response.locals.userId = decoded.sub;

    next();
  } catch (error) {
    console.error('Authentication error:', error);
    next(new Unauthorized(INVALID_TOKEN));
  }
}
