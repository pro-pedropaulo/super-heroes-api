import AppError from './appError';

export default class Unauthorized extends AppError {
  constructor(message: string) {
    super(message, 401, 'Unauthorized');
  }
}
