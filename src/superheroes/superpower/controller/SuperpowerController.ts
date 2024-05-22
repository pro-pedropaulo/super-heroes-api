import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { CreateSuperpowerDTO } from '../dtos//CreateSuperpowerDTO';
import { UpdateSuperpowerDTO } from '../dtos//UpdateSuperpowerDTO';
import { SuperpowerService } from '../services/SuperpowerService';

export class SuperpowerController {
  /**
   * @swagger
   * /superpowers:
   *   post:
   *     summary: Adiciona um novo Superpower ao sistema
   *     tags: [Superpower]
   *     security:
   *       - bearerAuth: []
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             $ref: '#/components/schemas/CreateSuperpowerDTO'
   *     responses:
   *       201:
   *         description: Superpower criado com sucesso
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/Superpower'
   */
  async create(request: Request, response: Response) {
    const requestValidated = new CreateSuperpowerDTO(request.body);

    const superpowerService = container.resolve(SuperpowerService);

    const createdSuperpower = await superpowerService.create(
      requestValidated.getAll(),
    );

    return response.status(201).json(createdSuperpower);
  }

  /**
   * @swagger
   * /superpowers/{id}:
   *   get:
   *     summary: Busca um Superpower pelo ID
   *     tags: [Superpower]
   *     parameters:
   *       - in: path
   *         name: id
   *         schema:
   *           type: number
   *         required: true
   *         description: ID do Superpower
   *     responses:
   *       200:
   *         description: Superpower encontrado
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/Superpower'
   */
  async findById(request: Request, response: Response) {
    const { id } = request.params;

    const superpowerService = container.resolve(SuperpowerService);

    const superpower = await superpowerService.findById(Number(id));

    return response.status(200).json(superpower);
  }

  /**
   * @swagger
   * /superpowers:
   *   get:
   *     summary: Busca todos os Superpowers
   *     tags: [Superpower]
   *     responses:
   *       200:
   *         description: Lista de Superpowers
   *         content:
   *           application/json:
   *             schema:
   *               type: array
   *               items:
   *                 $ref: '#/components/schemas/Superpower'
   */
  async getAll(request: Request, response: Response) {
    const superpowerService = container.resolve(SuperpowerService);

    const superpowers = await superpowerService.getAll();

    return response.status(200).json(superpowers);
  }

  /**
   * @swagger
   * /superpowers/{id}:
   *   put:
   *     summary: Atualiza um Superpower existente
   *     tags: [Superpower]
   *     parameters:
   *       - in: path
   *         name: id
   *         schema:
   *           type: number
   *         required: true
   *         description: ID do Superpower
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             $ref: '#/components/schemas/UpdateSuperpowerDTO'
   *     responses:
   *       200:
   *         description: Superpower atualizado com sucesso
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 message:
   *                   type: string
   *                   example: Superpower updated successfully
   */
  async update(request: Request, response: Response) {
    const { id } = request.params;
    const requestValidated = new UpdateSuperpowerDTO({
      id: Number(id),
      ...request.body,
    });

    const superpowerService = container.resolve(SuperpowerService);

    await superpowerService.update(requestValidated.getAll());

    return response
      .status(200)
      .json({ message: 'Superpower updated successfully' });
  }

  /**
   * @swagger
   * /superpowers/{id}:
   *   delete:
   *     summary: Deleta um Superpower pelo ID
   *     tags: [Superpower]
   *     parameters:
   *       - in: path
   *         name: id
   *         schema:
   *           type: number
   *         required: true
   *         description: ID do Superpower
   *     responses:
   *       200:
   *         description: Superpower deletado com sucesso
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 message:
   *                   type: string
   *                   example: Superpower deleted successfully
   */
  async delete(request: Request, response: Response) {
    const { id } = request.params;

    const superpowerService = container.resolve(SuperpowerService);

    await superpowerService.delete(Number(id));

    return response
      .status(200)
      .json({ message: 'Superpower deleted successfully' });
  }
}
