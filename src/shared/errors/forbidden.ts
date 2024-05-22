import AppError from './appError';

export default class Forbidden extends AppError {
  constructor(message: string) {
    super(message, 403, 'Forbidden');
  }
}
