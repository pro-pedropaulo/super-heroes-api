import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { UserService } from '../services/UserService';
import { CreateUserDTO } from '../dtos/CreateUserDTO';
import { UpdateUserDTO } from '../dtos/UpdateUserDTO';

export class UsersController {
  /**
   * @swagger
   * /users:
   *   post:
   *     summary: Create a new user
   *     tags: [Users]
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             $ref: '#/components/schemas/CreateUserDTO'
   *     responses:
   *       201:
   *         description: User created successfully
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 id:
   *                   type: string
   *                 name:
   *                   type: string
   *                 email:
   *                   type: string
   */
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

  /**
   * @swagger
   * /users/{id}:
   *   get:
   *     summary: Get a user by ID
   *     tags: [Users]
   *     parameters:
   *       - in: path
   *         name: id
   *         schema:
   *           type: string
   *         required: true
   *         description: ID of the user
   *     responses:
   *       200:
   *         description: User found
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 id:
   *                   type: string
   *                 name:
   *                   type: string
   *                 email:
   *                   type: string
   */
  async findById(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;

    const userService = container.resolve(UserService);
    const user = await userService.findByIdUser(id);

    return res.status(200).json(user);
  }

  /**
   * @swagger
   * /users:
   *   get:
   *     summary: Get all users
   *     tags: [Users]
   *     responses:
   *       200:
   *         description: A list of users
   *         content:
   *           application/json:
   *             schema:
   *               type: array
   *               items:
   *                 type: object
   *                 properties:
   *                   id:
   *                     type: string
   *                   name:
   *                     type: string
   *                   email:
   *                     type: string
   */
  async getAll(req: Request, res: Response): Promise<Response> {
    const userService = container.resolve(UserService);
    const users = await userService.getAllUsers();

    return res.status(200).json(users);
  }

  /**
   * @swagger
   * /users/{id}:
   *   put:
   *     summary: Update a user
   *     tags: [Users]
   *     parameters:
   *       - in: path
   *         name: id
   *         schema:
   *           type: string
   *         required: true
   *         description: ID of the user
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             $ref: '#/components/schemas/UpdateUserDTO'
   *     responses:
   *       200:
   *         description: User updated successfully
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 message:
   *                   type: string
   */
  async updateUser(req: Request, res: Response): Promise<Response> {
    const updateUserDto = new UpdateUserDTO(req.body);
    const profilePhoto = req.file;

    const userService = container.resolve(UserService);
    await userService.updateUser(updateUserDto.toObject(), profilePhoto);

    return res.status(200).json({ message: 'User updated successfully' });
  }

  /**
   * @swagger
   * /users/{id}:
   *   delete:
   *     summary: Delete a user
   *     tags: [Users]
   *     parameters:
   *       - in: path
   *         name: id
   *         schema:
   *           type: string
   *         required: true
   *         description: ID of the user
   *     responses:
   *       200:
   *         description: User deleted successfully
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 message:
   *                   type: string
   */
  async delete(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;

    const userService = container.resolve(UserService);
    await userService.deleteUser(id);

    return res.status(200).json({ message: 'User deleted successfully' });
  }
}
