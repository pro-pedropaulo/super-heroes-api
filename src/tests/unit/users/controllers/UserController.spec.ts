import 'reflect-metadata';
import { container } from 'tsyringe';

import { CreateUser } from '../../../../users/dtos/CreateUserDTO';
import { IUserRepository } from '../../../../users/repositories/IUserRepository';
import { addAudit } from '../../../../shared/infra/mongo/addAudit';
import { addLog } from '../../../../shared/infra/mongo/addLog';
import { UserService } from '../../../../users/services/UserService';

jest.mock('../../../../shared/infra/mongo/addAudit', () => ({
  addAudit: jest.fn(),
}));

jest.mock('../../../../shared/infra/mongo/addLog', () => ({
  addLog: jest.fn(),
}));

describe('UserController', () => {
  afterEach(() => {
    container.clearInstances();
  });

  it('should create a new user when valid data is provided', async () => {
    const data: CreateUser = {
      name: 'UserName',
      cpf: '12280060033',
      email: 'email@email.com',
      biography: 'biography description',
      password: '123456@Ssr',
      confirmPassword: '123456@Ssr',
    };

    const profilePhoto: Express.Multer.File | undefined = undefined;

    const createdUser = {
      ...data,
      id: '1',
      profilePhoto: '',
      active: true,
      createdAt: new Date(),
      generateUuid: () => 'some-uuid',
    };

    const userRepositoryMock: jest.Mocked<Partial<IUserRepository>> = {
      create: jest.fn().mockResolvedValueOnce(createdUser),
      findByEmail: jest.fn().mockResolvedValueOnce(null),
      findByCpf: jest.fn().mockResolvedValueOnce(null),
    };

    container.registerInstance('UserRepository', userRepositoryMock);

    const userService = container.resolve(UserService);

    const result = await userService.createUser(data, profilePhoto);

    expect(result).toEqual(
      expect.objectContaining({
        id: '1',
        name: data.name,
        cpf: data.cpf,
        email: data.email,
        biography: data.biography,
        profilePhoto: '',
        active: true,
      }),
    );

    expect(userRepositoryMock.findByEmail).toHaveBeenCalledWith(data.email);
    expect(userRepositoryMock.findByCpf).toHaveBeenCalledWith(data.cpf);
    expect(userRepositoryMock.create).toHaveBeenCalledWith({
      ...data,
      profilePhoto: '',
      active: true,
    });

    expect(addAudit).toHaveBeenCalledWith({
      module: 'User',
      feature: 'Create',
      oldData: {},
      newData: expect.objectContaining({
        id: '1',
        name: data.name,
        cpf: data.cpf,
        email: data.email,
        biography: data.biography,
        profilePhoto: '',
        active: true,
      }),
    });
  });

  it('should return that the user already exists', async () => {
    const data: CreateUser = {
      name: 'UserName',
      cpf: '12280060033',
      email: 'email@email.com',
      biography: 'biography description',
      password: '123456@Ssr',
      confirmPassword: '123456@Ssr',
    };

    const profilePhoto: Express.Multer.File | undefined = undefined;

    const existingUser = {
      ...data,
      id: '1',
      profilePhoto: '',
      active: true,
      createdAt: new Date(),
      generateUuid: () => 'some-uuid',
    };

    const userRepositoryMock: jest.Mocked<Partial<IUserRepository>> = {
      findByEmail: jest.fn().mockResolvedValueOnce(existingUser),
    };

    container.registerInstance('UserRepository', userRepositoryMock);

    const userService = container.resolve(UserService);

    await expect(
      userService.createUser(data, profilePhoto),
    ).rejects.toMatchObject({
      message: 'User already exists',
    });

    expect(addLog).toHaveBeenCalledWith({
      log: 'Conflict',
      message: 'User already exists',
    });
  });

  it('should return that the cpf already exists', async () => {
    const data: CreateUser = {
      name: 'UserName',
      cpf: '12280060033',
      email: 'email@email.com',
      biography: 'biography description',
      password: '123456@Ssr',
      confirmPassword: '123456@Ssr',
    };

    const profilePhoto: Express.Multer.File | undefined = undefined;

    const existingUser = {
      ...data,
      id: '1',
      profilePhoto: '',
      active: true,
      createdAt: new Date(),
      generateUuid: () => 'some-uuid',
    };

    const userRepositoryMock: jest.Mocked<Partial<IUserRepository>> = {
      findByEmail: jest.fn().mockResolvedValueOnce(null),
      findByCpf: jest.fn().mockResolvedValueOnce(existingUser),
    };

    container.registerInstance('UserRepository', userRepositoryMock);

    const userService = container.resolve(UserService);

    await expect(
      userService.createUser(data, profilePhoto),
    ).rejects.toMatchObject({
      message: 'CPF already exists',
    });

    expect(addLog).toHaveBeenCalledWith({
      log: 'Conflict',
      message: 'CPF already exists',
    });
  });
});
