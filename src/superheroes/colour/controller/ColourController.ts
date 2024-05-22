import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { CreateColourDTO } from '../dtos/CreateColourDTO';
import { UpdateColourDTO } from '../dtos/UpdateColourDTO';
import { ColourService } from '../services/ColourService';

export class ColourController {
  /**
   * @swagger
   * /colours:
   *   post:
   *     summary: Adiciona um novo Colour ao sistema
   *     tags: [Colour]
   *     security:
   *       - bearerAuth: []
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             $ref: '#/components/schemas/CreateColourDTO'
   *     responses:
   *       201:
   *         description: Colour criado com sucesso
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/Colour'
   */
  async create(request: Request, response: Response) {
    const requestValidated = new CreateColourDTO(request.body);

    const colourService = container.resolve(ColourService);

    const createdColour = await colourService.create(requestValidated.getAll());

    return response.status(201).json(createdColour);
  }

  /**
   * @swagger
   * /colours/{id}:
   *   get:
   *     summary: Busca um Colour pelo ID
   *     tags: [Colour]
   *     parameters:
   *       - in: path
   *         name: id
   *         schema:
   *           type: number
   *         required: true
   *         description: ID do Colour
   *     responses:
   *       200:
   *         description: Colour encontrado
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/Colour'
   */
  async findById(request: Request, response: Response) {
    const { id } = request.params;

    const colourService = container.resolve(ColourService);

    const colour = await colourService.findById(Number(id));

    return response.status(200).json(colour);
  }

  /**
   * @swagger
   * /colours:
   *   get:
   *     summary: Busca todos os Colours
   *     tags: [Colour]
   *     responses:
   *       200:
   *         description: Lista de Colours
   *         content:
   *           application/json:
   *             schema:
   *               type: array
   *               items:
   *                 $ref: '#/components/schemas/Colour'
   */
  async getAll(request: Request, response: Response) {
    const colourService = container.resolve(ColourService);

    const colours = await colourService.getAll();

    return response.status(200).json(colours);
  }

  /**
   * @swagger
   * /colours/{id}:
   *   put:
   *     summary: Atualiza um Colour existente
   *     tags: [Colour]
   *     parameters:
   *       - in: path
   *         name: id
   *         schema:
   *           type: number
   *         required: true
   *         description: ID do Colour
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             $ref: '#/components/schemas/UpdateColourDTO'
   *     responses:
   *       200:
   *         description: Colour atualizado com sucesso
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 message:
   *                   type: string
   *                   example: Colour updated successfully
   */
  async update(request: Request, response: Response) {
    const { id } = request.params;
    const requestValidated = new UpdateColourDTO({
      id: Number(id),
      ...request.body,
    });

    const colourService = container.resolve(ColourService);

    await colourService.update(requestValidated.getAll());

    return response
      .status(200)
      .json({ message: 'Colour updated successfully' });
  }

  /**
   * @swagger
   * /colours/{id}:
   *   delete:
   *     summary: Deleta um Colour pelo ID
   *     tags: [Colour]
   *     parameters:
   *       - in: path
   *         name: id
   *         schema:
   *           type: number
   *         required: true
   *         description: ID do Colour
   *     responses:
   *       200:
   *         description: Colour deletado com sucesso
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 message:
   *                   type: string
   *                   example: Colour deleted successfully
   */
  async delete(request: Request, response: Response) {
    const { id } = request.params;

    const colourService = container.resolve(ColourService);

    await colourService.delete(Number(id));

    return response
      .status(200)
      .json({ message: 'Colour deleted successfully' });
  }
}
