import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { CreateGenderDTO } from '../dtos/CreateGenderDTO';
import { UpdateGenderDTO } from '../dtos/UpdateGenderDTO';
import { GenderService } from '../services/GenderService';

export class GenderController {
  /**
   * @swagger
   * /genders:
   *   post:
   *     summary: Adiciona um novo Gender ao sistema
   *     tags: [Gender]
   *     security:
   *       - bearerAuth: []
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             $ref: '#/components/schemas/CreateGenderDTO'
   *     responses:
   *       201:
   *         description: Gender criado com sucesso
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/Gender'
   */
  async create(request: Request, response: Response) {
    const requestValidated = new CreateGenderDTO(request.body);

    const genderService = container.resolve(GenderService);

    const createdGender = await genderService.create(requestValidated.getAll());

    return response.status(201).json(createdGender);
  }

  /**
   * @swagger
   * /genders/{id}:
   *   get:
   *     summary: Busca um Gender pelo ID
   *     tags: [Gender]
   *     parameters:
   *       - in: path
   *         name: id
   *         schema:
   *           type: number
   *         required: true
   *         description: ID do Gender
   *     responses:
   *       200:
   *         description: Gender encontrado
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/Gender'
   */
  async findById(request: Request, response: Response) {
    const { id } = request.params;

    const genderService = container.resolve(GenderService);

    const gender = await genderService.findById(Number(id));

    return response.status(200).json(gender);
  }

  /**
   * @swagger
   * /genders:
   *   get:
   *     summary: Busca todos os Genders
   *     tags: [Gender]
   *     responses:
   *       200:
   *         description: Lista de Genders
   *         content:
   *           application/json:
   *             schema:
   *               type: array
   *               items:
   *                 $ref: '#/components/schemas/Gender'
   */
  async getAll(request: Request, response: Response) {
    const genderService = container.resolve(GenderService);

    const genders = await genderService.getAll();

    return response.status(200).json(genders);
  }

  /**
   * @swagger
   * /genders/{id}:
   *   put:
   *     summary: Atualiza um Gender existente
   *     tags: [Gender]
   *     parameters:
   *       - in: path
   *         name: id
   *         schema:
   *           type: number
   *         required: true
   *         description: ID do Gender
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             $ref: '#/components/schemas/UpdateGenderDTO'
   *     responses:
   *       200:
   *         description: Gender atualizado com sucesso
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 message:
   *                   type: string
   *                   example: Gender updated successfully
   */
  async update(request: Request, response: Response) {
    const { id } = request.params;
    const requestValidated = new UpdateGenderDTO({
      id: Number(id),
      ...request.body,
    });

    const genderService = container.resolve(GenderService);

    await genderService.update(requestValidated.getAll());

    return response
      .status(200)
      .json({ message: 'Gender updated successfully' });
  }

  /**
   * @swagger
   * /genders/{id}:
   *   delete:
   *     summary: Deleta um Gender pelo ID
   *     tags: [Gender]
   *     parameters:
   *       - in: path
   *         name: id
   *         schema:
   *           type: number
   *         required: true
   *         description: ID do Gender
   *     responses:
   *       200:
   *         description: Gender deletado com sucesso
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 message:
   *                   type: string
   *                   example: Gender deleted successfully
   */
  async delete(request: Request, response: Response) {
    const { id } = request.params;

    const genderService = container.resolve(GenderService);

    await genderService.delete(Number(id));

    return response
      .status(200)
      .json({ message: 'Gender deleted successfully' });
  }
}
