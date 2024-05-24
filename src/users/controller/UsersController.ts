import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { UserService } from '../services/UserService';
import { CreateUserDTO } from '../dtos/CreateUserDTO';
import { UpdateUserDTO } from '../dtos/UpdateUserDTO';
import { ActiveUserDTO } from '../dtos/ActiveUserDTO';

export class UsersController {
  async createUser(req: Request, res: Response): Promise<Response> {
    const createUserDto = new CreateUserDTO(req.body);
    const profilePhoto = req.file;

    const userService = container.resolve(UserService);
    const user = await userService.createUser(
      createUserDto.toObject(),
      profilePhoto,
    );

    return res.status(201).json(user);
  }

  async findById(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;

    const userService = container.resolve(UserService);
    const user = await userService.findByIdUser(id);

    return res.status(200).json(user);
  }

  async getAll(req: Request, res: Response): Promise<Response> {
    const userService = container.resolve(UserService);
    const users = await userService.getAllUsers();

    return res.status(200).json(users);
  }

  async updateUser(req: Request, res: Response): Promise<Response> {
    const updateUserDto = new UpdateUserDTO(req.body);
    const profilePhoto = req.file;
    const userId = res.locals.userId;

    const userService = container.resolve(UserService);
    await userService.updateUser(
      updateUserDto.toObject(),
      profilePhoto,
      userId,
    );

    return res.status(200).json({ message: 'User updated successfully' });
  }

  async delete(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;
    const userId = res.locals.userId;

    const userService = container.resolve(UserService);
    await userService.deleteUser(id, userId);

    return res.status(200).json({ message: 'User deleted successfully' });
  }

  async activeUser(req: Request, res: Response): Promise<Response> {
    const requestValidated = new ActiveUserDTO({
      ...req.params,
      ...req.body,
    });

    const userId = res.locals.userId;

    const userService = container.resolve(UserService);
    await userService.activeUser(requestValidated.toObject(), userId);

    return res
      .status(200)
      .json({ message: 'Active status updated successfully' });
  }
}
