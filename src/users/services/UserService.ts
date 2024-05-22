import { inject, injectable } from 'tsyringe';

import { IUserRepository } from '../repositories/IUserRepository';
import { CreateUser } from '../dtos/CreateUserDTO';
import { UpdateUser } from '../dtos/UpdateUserDTO';
import { omit } from '../../shared/util/Omit';
import Conflict from '../../shared/errors/conflict';
import NotFound from '../../shared/errors/notFound';

@injectable()
export class UserService {
  constructor(
    @inject('UserRepository')
    private readonly userRepository: IUserRepository,
  ) {}

  async createUser(
    data: CreateUser,
    profilePhoto: Express.Multer.File | undefined,
  ) {
    const userAlreadyExists = await this.userRepository.findByEmail(data.email);

    if (userAlreadyExists) {
      throw new Conflict('User already exists');
    }

    const cpfAlreadyExists = await this.userRepository.findByCpf(data.cpf);

    if (cpfAlreadyExists) {
      throw new Conflict('CPF already exists');
    }

    const createdUser = await this.userRepository.create({
      ...data,
      profilePhoto: profilePhoto?.filename ?? '',
    });

    return omit(createdUser, ['password']);
  }

  async deleteUser(id: string) {
    const user = await this.findByIdUser(id);

    await this.userRepository.delete(user.id);
  }

  async findByIdUser(id: string) {
    const user = await this.userRepository.findById(id);

    if (!user) {
      throw new NotFound('Not found any User with this id!');
    }

    return omit(user, ['password']);
  }

  async getAllUsers() {
    return await this.userRepository.getAll();
  }

  async updateUser(
    data: UpdateUser,
    profilePhoto: Express.Multer.File | undefined,
  ) {
    const user = await this.findByIdUser(data.id);

    const checkEmailExists = await this.userRepository.findByEmailAndNotId(
      data.email,
      user.id,
    );

    if (checkEmailExists) {
      throw new Conflict('Email already exists');
    }

    const cpfAlreadyExists = await this.userRepository.findByCpf(data.cpf);

    if (cpfAlreadyExists) {
      throw new Conflict('CPF already exists');
    }

    await this.userRepository.update({
      id: user.id,
      name: data.name,
      password: data.password,
      cpf: data.cpf,
      email: data.email,
      biography: data.biography,
      profilePhoto: profilePhoto?.filename ?? '',
    });
  }
}
