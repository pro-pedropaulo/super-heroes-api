import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { CreateAlignmentDTO } from '../dtos/CreateAlignmentDTO';
import { UpdateAlignmentDTO } from '../dtos/UpdateAlignmentDTO';
import { AlignmentService } from '../services/alignmentService';

export class AlignmentController {
  /**
   * @swagger
   * /alignments:
   *   post:
   *     summary: Adiciona um novo Alignment ao sistema
   *     tags: [Alignment]
   *     security:
   *       - bearerAuth: []
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             $ref: '#/components/schemas/CreateAlignmentDTO'
   *     responses:
   *       201:
   *         description: Alignment criado com sucesso
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/Alignment'
   */
  async create(request: Request, response: Response) {
    const requestValidated = new CreateAlignmentDTO(request.body);

    const alignmentService = container.resolve(AlignmentService);

    const createdAlignment = await alignmentService.create(
      requestValidated.getAll(),
    );

    return response.status(201).json(createdAlignment);
  }

  /**
   * @swagger
   * /alignments/{id}:
   *   get:
   *     summary: Busca um Alignment pelo ID
   *     tags: [Alignment]
   *     parameters:
   *       - in: path
   *         name: id
   *         schema:
   *           type: number
   *         required: true
   *         description: ID do Alignment
   *     responses:
   *       200:
   *         description: Alignment encontrado
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/Alignment'
   */
  async findById(request: Request, response: Response) {
    const { id } = request.params;

    const alignmentService = container.resolve(AlignmentService);

    const alignment = await alignmentService.findById(Number(id));

    return response.status(200).json(alignment);
  }

  /**
   * @swagger
   * /alignments:
   *   get:
   *     summary: Busca todos os Alignments
   *     tags: [Alignment]
   *     responses:
   *       200:
   *         description: Lista de Alignments
   *         content:
   *           application/json:
   *             schema:
   *               type: array
   *               items:
   *                 $ref: '#/components/schemas/Alignment'
   */
  async getAll(request: Request, response: Response) {
    const alignmentService = container.resolve(AlignmentService);

    const alignments = await alignmentService.getAll();

    return response.status(200).json(alignments);
  }

  /**
   * @swagger
   * /alignments/{id}:
   *   put:
   *     summary: Atualiza um Alignment existente
   *     tags: [Alignment]
   *     parameters:
   *       - in: path
   *         name: id
   *         schema:
   *           type: number
   *         required: true
   *         description: ID do Alignment
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             $ref: '#/components/schemas/UpdateAlignmentDTO'
   *     responses:
   *       200:
   *         description: Alignment atualizado com sucesso
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 message:
   *                   type: string
   *                   example: Alignment updated successfully
   */
  async update(request: Request, response: Response) {
    const { id } = request.params;
    const requestValidated = new UpdateAlignmentDTO({
      id: Number(id),
      ...request.body,
    });

    const alignmentService = container.resolve(AlignmentService);

    await alignmentService.update(requestValidated.getAll());

    return response
      .status(200)
      .json({ message: 'Alignment updated successfully' });
  }

  /**
   * @swagger
   * /alignments/{id}:
   *   delete:
   *     summary: Deleta um Alignment pelo ID
   *     tags: [Alignment]
   *     parameters:
   *       - in: path
   *         name: id
   *         schema:
   *           type: number
   *         required: true
   *         description: ID do Alignment
   *     responses:
   *       200:
   *         description: Alignment deletado com sucesso
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 message:
   *                   type: string
   *                   example: Alignment deleted successfully
   */
  async delete(request: Request, response: Response) {
    const { id } = request.params;

    const alignmentService = container.resolve(AlignmentService);

    await alignmentService.delete(Number(id));

    return response
      .status(200)
      .json({ message: 'Alignment deleted successfully' });
  }
}
