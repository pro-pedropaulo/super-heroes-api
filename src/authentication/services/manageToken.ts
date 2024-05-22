import { sign } from 'jsonwebtoken';

interface CreateTokenParams {
  email: string;
  name: string;
  sub: string;
}

export function createToken(parameters: CreateTokenParams) {
  return sign(parameters, process.env.APP_SECRET || '', {
    expiresIn: '50m',
  });
}
