import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { AuthenticationService } from '../services/authenticationService';
import { LoginDTO } from '../dtos/LoginDTO';
import { LogoutService } from '../services/logoutService';

export class AuthenticationController {
  async login(request: Request, response: Response) {
    const { password, email, cpf } = new LoginDTO(request.body).getAll();

    const authService = container.resolve(AuthenticationService);

    const token = await authService.login({
      password,
      email,
      cpf,
    });

    return response.json(token);
  }

  async logout(request: Request, response: Response) {
    const authHeader = request.headers['authorization'];

    const logoutService = container.resolve(LogoutService);

    await logoutService.execute(authHeader);

    return response.json({ message: 'Logout successfully' });
  }
}
