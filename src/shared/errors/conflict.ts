import AppError from './appError';

export default class Conflict extends AppError {
  constructor(message: string) {
    super(message, 409, 'Conflict');
  }
}
