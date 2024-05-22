import { inject, injectable } from 'tsyringe';

import { LoginData } from '../dtos/LoginDTO';
import { IUserRepository } from '../../users/repositories/IUserRepository';
import BadRequest from '../../shared/errors/badRequest';
import { comparePassword } from '../../shared/util/Password';

import { createToken } from './manageToken';

@injectable()
export class AuthenticationService {
  constructor(
    @inject('UserRepository')
    private readonly userRepository: IUserRepository,
  ) {}

  async login({ email, cpf, password }: LoginData) {
    let user;

    if (email) {
      user = await this.userRepository.userLoginByEmail(email);
    }

    if (cpf) {
      user = await this.userRepository.userLoginByCpf(cpf);
    }

    if (!user) {
      throw new BadRequest('Email or password incorrect');
    }

    const passwordMatch = await comparePassword(password, user.password);

    if (!passwordMatch) {
      throw new BadRequest('Email or password incorrect');
    }

    const token = createToken({
      email: user.email,
      name: user.name,
      sub: user.id,
    });

    return {
      token,
      user: {
        cpf: user.cpf,
        email: user.email,
        name: user.name,
        userId: user.id,
      },
    };
  }
}
