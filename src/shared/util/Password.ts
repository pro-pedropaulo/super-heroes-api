import bcrypt from 'bcryptjs';

export function hashPassword(password: string) {
  return bcrypt.hashSync(password);
}

export function comparePassword(password: string, hash: string) {
  return bcrypt.compare(password, hash);
}
