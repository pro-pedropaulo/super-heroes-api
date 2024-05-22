import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { AuthenticationService } from '../services/authenticationService';
import { LoginDTO } from '../dtos/LoginDTO';

export class AuthenticationController {
  /**
   * @swagger
   * /auth:
   *   post:
   *     summary: Realiza o login de um usuário utilizando o e-mail OU cpf
   *     tags: [Authentication]
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             $ref: '#/components/schemas/LoginDTO'
   *     responses:
   *       200:
   *         description: Login realizado com sucesso
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 token:
   *                   type: string
   *                 user:
   *                   type: object
   *                   properties:
   *                     cpf:
   *                       type: string
   *                     userId:
   *                       type: string
   *                     name:
   *                       type: string
   *                     email:
   *                       type: string
   */
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
}
