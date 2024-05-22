import AppError from './appError';

export default class NotFound extends AppError {
  constructor(message: string) {
    super(message, 404, 'Not Found');
  }
}
