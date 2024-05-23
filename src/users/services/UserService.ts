import { inject, injectable } from 'tsyringe';

import { IUserRepository } from '../repositories/IUserRepository';
import { CreateUser } from '../dtos/CreateUserDTO';
import { UpdateUser } from '../dtos/UpdateUserDTO';
import { ActiveUser } from '../dtos/ActiveUserDTO';
import { omit } from '../../shared/util/Omit';
import Conflict from '../../shared/errors/conflict';
import NotFound from '../../shared/errors/notFound';
import { addAudit } from '../../shared/infra/mongo/addAudit';
import { addLog } from '../../shared/infra/mongo/addLog';

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
      await addLog({
        log: 'Conflict',
        message: 'User already exists',
      });
      throw new Conflict('User already exists');
    }

    const cpfAlreadyExists = await this.userRepository.findByCpf(data.cpf);

    if (cpfAlreadyExists) {
      await addLog({
        log: 'Conflict',
        message: 'CPF already exists',
      });
      throw new Conflict('CPF already exists');
    }

    const createdUser = await this.userRepository.create({
      ...data,
      profilePhoto: profilePhoto?.filename ?? '',
      active: true,
    });

    await addAudit({
      module: 'User',
      feature: 'Create',
      oldData: {},
      newData: createdUser,
    });

    return omit(createdUser, ['password']);
  }

  async deleteUser(id: string, userId: string) {
    const user = await this.findByIdUser(id);
    await this.userRepository.delete(user.id);

    await addAudit({
      userId,
      module: 'User',
      feature: 'Delete',
      oldData: { user },
      newData: {},
    });
  }

  async findByIdUser(id: string) {
    const user = await this.userRepository.findById(id);
    if (!user) {
      await addLog({
        log: 'NotFound',
        message: 'Not found any User with this id!',
      });
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
    userId: string,
  ) {
    const user = await this.findByIdUser(data.id);

    const checkEmailExists = await this.userRepository.findByEmailAndNotId(
      data.email,
      user.id,
    );

    if (checkEmailExists) {
      await addLog({
        log: 'Conflict',
        message: 'Email already exists',
      });
      throw new Conflict('Email already exists');
    }

    const cpfAlreadyExists = await this.userRepository.findByCpf(data.cpf);

    if (cpfAlreadyExists) {
      await addLog({
        log: 'Conflict',
        message: 'CPF already exists',
      });
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
      active: user.active,
    });

    await addAudit({
      userId,
      module: 'User',
      feature: 'Update',
      oldData: { user },
      newData: { ...user, ...data },
    });
  }

  async activeUser(data: ActiveUser, userId: string) {
    const user = await this.findByIdUser(data.id);
    await this.userRepository.active(data);

    await addAudit({
      userId,
      module: 'User',
      feature: 'Update',
      oldData: { user },
      newData: { ...user, active: data.active },
    });
  }
}
