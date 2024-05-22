import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { CreatePublisherDTO } from '../dtos/CreatePublisherDTO';
import { UpdatePublisherDTO } from '../dtos/UpdatePublisherDTO';
import { PublisherService } from '../services/PublisherService';

export class PublisherController {
  /**
   * @swagger
   * /publishers:
   *   post:
   *     summary: Adiciona um novo Publisher ao sistema
   *     tags: [Publisher]
   *     security:
   *       - bearerAuth: []
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             $ref: '#/components/schemas/CreatePublisherDTO'
   *     responses:
   *       201:
   *         description: Publisher criado com sucesso
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/Publisher'
   */
  async create(request: Request, response: Response) {
    const requestValidated = new CreatePublisherDTO(request.body);

    const publisherService = container.resolve(PublisherService);

    const createdPublisher = await publisherService.create(
      requestValidated.getAll(),
    );

    return response.status(201).json(createdPublisher);
  }

  /**
   * @swagger
   * /publishers/{id}:
   *   get:
   *     summary: Busca um Publisher pelo ID
   *     tags: [Publisher]
   *     parameters:
   *       - in: path
   *         name: id
   *         schema:
   *           type: number
   *         required: true
   *         description: ID do Publisher
   *     responses:
   *       200:
   *         description: Publisher encontrado
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/Publisher'
   */
  async findById(request: Request, response: Response) {
    const { id } = request.params;

    const publisherService = container.resolve(PublisherService);

    const publisher = await publisherService.findById(Number(id));

    return response.status(200).json(publisher);
  }

  /**
   * @swagger
   * /publishers:
   *   get:
   *     summary: Busca todos os Publishers
   *     tags: [Publisher]
   *     responses:
   *       200:
   *         description: Lista de Publishers
   *         content:
   *           application/json:
   *             schema:
   *               type: array
   *               items:
   *                 $ref: '#/components/schemas/Publisher'
   */
  async getAll(request: Request, response: Response) {
    const publisherService = container.resolve(PublisherService);

    const publishers = await publisherService.getAll();

    return response.status(200).json(publishers);
  }

  /**
   * @swagger
   * /publishers/{id}:
   *   put:
   *     summary: Atualiza um Publisher existente
   *     tags: [Publisher]
   *     parameters:
   *       - in: path
   *         name: id
   *         schema:
   *           type: number
   *         required: true
   *         description: ID do Publisher
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             $ref: '#/components/schemas/UpdatePublisherDTO'
   *     responses:
   *       200:
   *         description: Publisher atualizado com sucesso
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 message:
   *                   type: string
   *                   example: Publisher updated successfully
   */
  async update(request: Request, response: Response) {
    const { id } = request.params;
    const requestValidated = new UpdatePublisherDTO({
      id: Number(id),
      ...request.body,
    });

    const publisherService = container.resolve(PublisherService);

    await publisherService.update(requestValidated.getAll());

    return response
      .status(200)
      .json({ message: 'Publisher updated successfully' });
  }

  /**
   * @swagger
   * /publishers/{id}:
   *   delete:
   *     summary: Deleta um Publisher pelo ID
   *     tags: [Publisher]
   *     parameters:
   *       - in: path
   *         name: id
   *         schema:
   *           type: number
   *         required: true
   *         description: ID do Publisher
   *     responses:
   *       200:
   *         description: Publisher deletado com sucesso
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 message:
   *                   type: string
   *                   example: Publisher deleted successfully
   */
  async delete(request: Request, response: Response) {
    const { id } = request.params;

    const publisherService = container.resolve(PublisherService);

    await publisherService.delete(Number(id));

    return response
      .status(200)
      .json({ message: 'Publisher deleted successfully' });
  }
}
