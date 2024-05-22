import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { CreateHeroAttributeDTO } from '../dtos/CreateHeroAttributeDTO';
import { UpdateHeroAttributeDTO } from '../dtos/UpdateHeroAttributeDTO';
import { HeroAttributeService } from '../services/HeroAttributeService';

export class HeroAttributeController {
  /**
   * @swagger
   * /hero-attributes:
   *   post:
   *     summary: Adiciona um novo HeroAttribute ao sistema
   *     tags: [HeroAttribute]
   *     security:
   *       - bearerAuth: []
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             $ref: '#/components/schemas/CreateHeroAttributeDTO'
   *     responses:
   *       201:
   *         description: HeroAttribute criado com sucesso
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/HeroAttribute'
   */
  async create(request: Request, response: Response) {
    const requestValidated = new CreateHeroAttributeDTO(request.body);

    const heroAttributeService = container.resolve(HeroAttributeService);

    const createdHeroAttribute = await heroAttributeService.create(
      requestValidated.getAll(),
    );

    return response.status(201).json(createdHeroAttribute);
  }

  /**
   * @swagger
   * /hero-attributes/{id}:
   *   get:
   *     summary: Busca um HeroAttribute pelo ID
   *     tags: [HeroAttribute]
   *     parameters:
   *       - in: path
   *         name: id
   *         schema:
   *           type: number
   *         required: true
   *         description: ID do HeroAttribute
   *     responses:
   *       200:
   *         description: HeroAttribute encontrado
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/HeroAttribute'
   */
  async findById(request: Request, response: Response) {
    const { id } = request.params;

    const heroAttributeService = container.resolve(HeroAttributeService);

    const heroAttribute = await heroAttributeService.findById(Number(id));

    return response.status(200).json(heroAttribute);
  }

  /**
   * @swagger
   * /hero-attributes:
   *   get:
   *     summary: Busca todos os HeroAttributes
   *     tags: [HeroAttribute]
   *     responses:
   *       200:
   *         description: Lista de HeroAttributes
   *         content:
   *           application/json:
   *             schema:
   *               type: array
   *               items:
   *                 $ref: '#/components/schemas/HeroAttribute'
   */
  async getAll(request: Request, response: Response) {
    const heroAttributeService = container.resolve(HeroAttributeService);

    const heroAttributes = await heroAttributeService.getAll();

    return response.status(200).json(heroAttributes);
  }

  /**
   * @swagger
   * /hero-attributes/{id}:
   *   put:
   *     summary: Atualiza um HeroAttribute existente
   *     tags: [HeroAttribute]
   *     parameters:
   *       - in: path
   *         name: id
   *         schema:
   *           type: number
   *         required: true
   *         description: ID do HeroAttribute
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             $ref: '#/components/schemas/UpdateHeroAttributeDTO'
   *     responses:
   *       200:
   *         description: HeroAttribute atualizado com sucesso
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 message:
   *                   type: string
   *                   example: HeroAttribute updated successfully
   */
  async update(request: Request, response: Response) {
    const { id } = request.params;
    const requestValidated = new UpdateHeroAttributeDTO({
      id: Number(id),
      ...request.body,
    });

    const heroAttributeService = container.resolve(HeroAttributeService);

    await heroAttributeService.update(requestValidated.getAll());

    return response
      .status(200)
      .json({ message: 'HeroAttribute updated successfully' });
  }

  /**
   * @swagger
   * /hero-attributes/{id}:
   *   delete:
   *     summary: Deleta um HeroAttribute pelo ID
   *     tags: [HeroAttribute]
   *     parameters:
   *       - in: path
   *         name: id
   *         schema:
   *           type: number
   *         required: true
   *         description: ID do HeroAttribute
   *     responses:
   *       200:
   *         description: HeroAttribute deletado com sucesso
   *         content:
   *           application/json:
   *               type: object
   *               properties:
   *                 message:
   *                   type: string
   *                   example: HeroAttribute deleted successfully
   */
  async delete(request: Request, response: Response) {
    const { id } = request.params;

    const heroAttributeService = container.resolve(HeroAttributeService);

    await heroAttributeService.delete(Number(id));

    return response
      .status(200)
      .json({ message: 'HeroAttribute deleted successfully' });
  }
}
