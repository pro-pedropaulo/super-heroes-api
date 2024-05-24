import 'reflect-metadata';
import { container } from 'tsyringe';

import { UserService } from '../../users/services/UserService';
import { IUserRepository } from '../../users/repositories/IUserRepository';
jest.mock('../../shared/infra/mongo/addAudit');
jest.mock('../../shared/infra/mongo/addLog');

describe('UserService', () => {
  let userService: UserService;
  let userRepository: IUserRepository;

  beforeEach(() => {
    userRepository = {
      create: jest.fn(),
      findById: jest.fn(),
      findByEmail: jest.fn(),
      findByCpf: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
      getAll: jest.fn(),
      findByEmailAndNotId: jest.fn(),
      active: jest.fn(),
    } as unknown as IUserRepository;

    container.registerInstance('UserRepository', userRepository);
    userService = container.resolve(UserService);
  });

  it('should create a user successfully', async () => {
    (userRepository.findByEmail as jest.Mock).mockResolvedValue(null);
    (userRepository.findByCpf as jest.Mock).mockResolvedValue(null);
    (userRepository.create as jest.Mock).mockResolvedValue({
      id: '1',
      name: 'John Doe',
      email: 'johndoe@example.com',
      cpf: '12345678900',
      biography: 'A short bio',
      active: true,
      profilePhoto: 'profile.jpg',
    });

    const user = await userService.createUser(
      {
        name: 'John Doe',
        email: 'johndoe@example.com',
        cpf: '12345678900',
        biography: 'A short bio',
        password: 'password',
        confirmPassword: 'password',
      },
      { filename: 'profile.jpg' } as Express.Multer.File,
    );

    expect(user).toEqual({
      id: '1',
      name: 'John Doe',
      email: 'johndoe@example.com',
      cpf: '12345678900',
      biography: 'A short bio',
      active: true,
      profilePhoto: 'profile.jpg',
    });
  });

  it('should throw a conflict error if email already exists', async () => {
    (userRepository.findByEmail as jest.Mock).mockResolvedValue({
      id: '1',
      email: 'johndoe@example.com',
    });

    await expect(
      userService.createUser(
        {
          name: 'John Doe',
          email: 'johndoe@example.com',
          cpf: '12345678900',
          biography: 'A short bio',
          password: 'password',
          confirmPassword: 'password',
        },
        { filename: 'profile.jpg' } as Express.Multer.File,
      ),
    ).rejects.toMatchObject({
      message: 'User already exists',
      statusCode: 409,
      status: 'Conflict',
    });
  });

  it('should throw a conflict error if CPF already exists', async () => {
    (userRepository.findByCpf as jest.Mock).mockResolvedValue({
      id: '1',
      cpf: '12345678900',
    });

    await expect(
      userService.createUser(
        {
          name: 'John Doe',
          email: 'johndoe@example.com',
          cpf: '12345678900',
          biography: 'A short bio',
          password: 'password',
          confirmPassword: 'password',
        },
        { filename: 'profile.jpg' } as Express.Multer.File,
      ),
    ).rejects.toMatchObject({
      message: 'CPF already exists',
      statusCode: 409,
      status: 'Conflict',
    });
  });

  it('should delete a user successfully', async () => {
    (userRepository.findById as jest.Mock).mockResolvedValue({
      id: '1',
      name: 'John Doe',
    });
    (userRepository.delete as jest.Mock).mockResolvedValue({});

    await userService.deleteUser('1', '2');

    expect(userRepository.findById).toHaveBeenCalledWith('1');
    expect(userRepository.delete).toHaveBeenCalledWith('1');
  });

  it('should throw a not found error when deleting a non-existent user', async () => {
    (userRepository.findById as jest.Mock).mockResolvedValue(null);

    await expect(userService.deleteUser('1', '2')).rejects.toMatchObject({
      message: 'Not found any User with this id!',
      statusCode: 404,
      status: 'Not Found',
    });
  });

  it('should update a user successfully', async () => {
    (userRepository.findById as jest.Mock).mockResolvedValue({
      id: '1',
      email: 'johndoe@example.com',
      cpf: '12345678900',
    });
    (userRepository.findByEmailAndNotId as jest.Mock).mockResolvedValue(null);
    (userRepository.findByCpf as jest.Mock).mockResolvedValue(null);
    (userRepository.update as jest.Mock).mockResolvedValue({});

    await userService.updateUser(
      {
        id: '1',
        name: 'John Doe',
        email: 'john.doe@example.com',
        cpf: '12345678901',
        biography: 'Updated bio',
        password: 'password',
        confirmPassword: 'password',
      },
      { filename: 'profile.jpg' } as Express.Multer.File,
      '2',
    );

    expect(userRepository.findById).toHaveBeenCalledWith('1');
    expect(userRepository.findByEmailAndNotId).toHaveBeenCalledWith(
      'john.doe@example.com',
      '1',
    );
    expect(userRepository.findByCpf).toHaveBeenCalledWith('12345678901');
    expect(userRepository.update).toHaveBeenCalledWith({
      id: '1',
      name: 'John Doe',
      email: 'john.doe@example.com',
      cpf: '12345678901',
      biography: 'Updated bio',
      password: 'password',
      profilePhoto: 'profile.jpg',
      active: undefined,
    });
  });

  it('should throw a conflict error if email already exists when updating a user', async () => {
    (userRepository.findById as jest.Mock).mockResolvedValue({
      id: '1',
      email: 'johndoe@example.com',
      cpf: '12345678900',
    });
    (userRepository.findByEmailAndNotId as jest.Mock).mockResolvedValue({
      id: '2',
      email: 'john.doe@example.com',
    });

    await expect(
      userService.updateUser(
        {
          id: '1',
          name: 'John Doe',
          email: 'john.doe@example.com',
          cpf: '12345678901',
          biography: 'Updated bio',
          password: 'password',
          confirmPassword: 'password',
        },
        { filename: 'profile.jpg' } as Express.Multer.File,
        '2',
      ),
    ).rejects.toMatchObject({
      message: 'Email already exists',
      statusCode: 409,
      status: 'Conflict',
    });
  });

  it('should throw a conflict error if CPF already exists when updating a user', async () => {
    (userRepository.findById as jest.Mock).mockResolvedValue({
      id: '1',
      email: 'johndoe@example.com',
      cpf: '12345678900',
    });
    (userRepository.findByEmailAndNotId as jest.Mock).mockResolvedValue(null);
    (userRepository.findByCpf as jest.Mock).mockResolvedValue({
      id: '2',
      cpf: '12345678901',
    });

    await expect(
      userService.updateUser(
        {
          id: '1',
          name: 'John Doe',
          email: 'john.doe@example.com',
          cpf: '12345678901',
          biography: 'Updated bio',
          password: 'password',
          confirmPassword: 'password',
        },
        { filename: 'profile.jpg' } as Express.Multer.File,
        '2',
      ),
    ).rejects.toMatchObject({
      message: 'CPF already exists',
      statusCode: 409,
      status: 'Conflict',
    });
  });

  it('should activate a user successfully', async () => {
    (userRepository.findById as jest.Mock).mockResolvedValue({
      id: '1',
      active: false,
    });

    await userService.activeUser({ id: '1', active: true }, '2');

    expect(userRepository.findById).toHaveBeenCalledWith('1');
    expect(userRepository.active).toHaveBeenCalledWith({
      id: '1',
      active: true,
    });
  });

  it('should throw a not found error when activating a non-existent user', async () => {
    (userRepository.findById as jest.Mock).mockResolvedValue(null);

    await expect(
      userService.activeUser({ id: '1', active: true }, '2'),
    ).rejects.toMatchObject({
      message: 'Not found any User with this id!',
      statusCode: 404,
      status: 'Not Found',
    });
  });

  it('should find a user by ID successfully', async () => {
    (userRepository.findById as jest.Mock).mockResolvedValue({
      id: '1',
      name: 'John Doe',
      email: 'johndoe@example.com',
      cpf: '12345678900',
    });

    const user = await userService.findByIdUser('1');

    expect(userRepository.findById).toHaveBeenCalledWith('1');
    expect(user).toEqual({
      id: '1',
      name: 'John Doe',
      email: 'johndoe@example.com',
      cpf: '12345678900',
    });
  });

  it('should throw a not found error when finding a non-existent user by ID', async () => {
    (userRepository.findById as jest.Mock).mockResolvedValue(null);

    await expect(userService.findByIdUser('1')).rejects.toMatchObject({
      message: 'Not found any User with this id!',
      statusCode: 404,
      status: 'Not Found',
    });
  });

  it('should get all users successfully', async () => {
    (userRepository.getAll as jest.Mock).mockResolvedValue([
      {
        id: '1',
        name: 'John Doe',
        email: 'johndoe@example.com',
        cpf: '12345678900',
      },
      {
        id: '2',
        name: 'Jane Doe',
        email: 'janedoe@example.com',
        cpf: '12345678901',
      },
    ]);

    const users = await userService.getAllUsers();

    expect(userRepository.getAll).toHaveBeenCalled();
    expect(users).toEqual([
      {
        id: '1',
        name: 'John Doe',
        email: 'johndoe@example.com',
        cpf: '12345678900',
      },
      {
        id: '2',
        name: 'Jane Doe',
        email: 'janedoe@example.com',
        cpf: '12345678901',
      },
    ]);
  });
});
