import AppError from './appError';

export default class BadRequest extends AppError {
  constructor(message: string) {
    super(message, 400, 'Bad Request');
  }
}
