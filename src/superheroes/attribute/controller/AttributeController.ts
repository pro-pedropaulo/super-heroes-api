import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { CreateAttributeDTO } from '../dtos/CreateAttributeDTO';
import { UpdateAttributeDTO } from '../dtos/UpdateAttributeDTO';
import { AttributeService } from '../services/AttributeService';

export class AttributeController {
  /**
   * @swagger
   * /attributes:
   *   post:
   *     summary: Adiciona um novo Attribute ao sistema
   *     tags: [Attribute]
   *     security:
   *       - bearerAuth: []
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             $ref: '#/components/schemas/CreateAttributeDTO'
   *     responses:
   *       201:
   *         description: Attribute criado com sucesso
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/Attribute'
   */
  async create(request: Request, response: Response) {
    const requestValidated = new CreateAttributeDTO(request.body);

    const attributeService = container.resolve(AttributeService);

    const createdAttribute = await attributeService.create(
      requestValidated.getAll(),
    );

    return response.status(201).json(createdAttribute);
  }

  /**
   * @swagger
   * /attributes/{id}:
   *   get:
   *     summary: Busca um Attribute pelo ID
   *     tags: [Attribute]
   *     parameters:
   *       - in: path
   *         name: id
   *         schema:
   *           type: number
   *         required: true
   *         description: ID do Attribute
   *     responses:
   *       200:
   *         description: Attribute encontrado
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/Attribute'
   */
  async findById(request: Request, response: Response) {
    const { id } = request.params;

    const attributeService = container.resolve(AttributeService);

    const attribute = await attributeService.findById(Number(id));

    return response.status(200).json(attribute);
  }

  /**
   * @swagger
   * /attributes:
   *   get:
   *     summary: Busca todos os Attributes
   *     tags: [Attribute]
   *     responses:
   *       200:
   *         description: Lista de Attributes
   *         content:
   *           application/json:
   *             schema:
   *               type: array
   *               items:
   *                 $ref: '#/components/schemas/Attribute'
   */
  async getAll(request: Request, response: Response) {
    const attributeService = container.resolve(AttributeService);

    const attributes = await attributeService.getAll();

    return response.status(200).json(attributes);
  }

  /**
   * @swagger
   * /attributes/{id}:
   *   put:
   *     summary: Atualiza um Attribute existente
   *     tags: [Attribute]
   *     parameters:
   *       - in: path
   *         name: id
   *         schema:
   *           type: number
   *         required: true
   *         description: ID do Attribute
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             $ref: '#/components/schemas/UpdateAttributeDTO'
   *     responses:
   *       200:
   *         description: Attribute atualizado com sucesso
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 message:
   *                   type: string
   *                   example: Attribute updated successfully
   */
  async update(request: Request, response: Response) {
    const { id } = request.params;
    const requestValidated = new UpdateAttributeDTO({
      id: Number(id),
      ...request.body,
    });

    const attributeService = container.resolve(AttributeService);

    await attributeService.update(requestValidated.getAll());

    return response
      .status(200)
      .json({ message: 'Attribute updated successfully' });
  }

  /**
   * @swagger
   * /attributes/{id}:
   *   delete:
   *     summary: Deleta um Attribute pelo ID
   *     tags: [Attribute]
   *     parameters:
   *       - in: path
   *         name: id
   *         schema:
   *           type: number
   *         required: true
   *         description: ID do Attribute
   *     responses:
   *       200:
   *         description: Attribute deletado com sucesso
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 message:
   *                   type: string
   *                   example: Attribute deleted successfully
   */
  async delete(request: Request, response: Response) {
    const { id } = request.params;

    const attributeService = container.resolve(AttributeService);

    await attributeService.delete(Number(id));

    return response
      .status(200)
      .json({ message: 'Attribute deleted successfully' });
  }
}
