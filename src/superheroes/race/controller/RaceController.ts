import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { CreateRaceDTO } from '../dtos/CreateRaceDTO';
import { UpdateRaceDTO } from '../dtos/UpdateRaceDTO';
import { RaceService } from '../services/RaceService';

export class RaceController {
  /**
   * @swagger
   * /races:
   *   post:
   *     summary: Adiciona um novo Race ao sistema
   *     tags: [Race]
   *     security:
   *       - bearerAuth: []
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             $ref: '#/components/schemas/CreateRaceDTO'
   *     responses:
   *       201:
   *         description: Race criado com sucesso
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/Race'
   */
  async create(request: Request, response: Response) {
    const requestValidated = new CreateRaceDTO(request.body);

    const raceService = container.resolve(RaceService);

    const createdRace = await raceService.create(requestValidated.getAll());

    return response.status(201).json(createdRace);
  }

  /**
   * @swagger
   * /races/{id}:
   *   get:
   *     summary: Busca um Race pelo ID
   *     tags: [Race]
   *     parameters:
   *       - in: path
   *         name: id
   *         schema:
   *           type: number
   *         required: true
   *         description: ID do Race
   *     responses:
   *       200:
   *         description: Race encontrado
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/Race'
   */
  async findById(request: Request, response: Response) {
    const { id } = request.params;

    const raceService = container.resolve(RaceService);

    const race = await raceService.findById(Number(id));

    return response.status(200).json(race);
  }

  /**
   * @swagger
   * /races:
   *   get:
   *     summary: Busca todos os Races
   *     tags: [Race]
   *     responses:
   *       200:
   *         description: Lista de Races
   *         content:
   *           application/json:
   *             schema:
   *               type: array
   *               items:
   *                 $ref: '#/components/schemas/Race'
   */
  async getAll(request: Request, response: Response) {
    const raceService = container.resolve(RaceService);

    const races = await raceService.getAll();

    return response.status(200).json(races);
  }

  /**
   * @swagger
   * /races/{id}:
   *   put:
   *     summary: Atualiza um Race existente
   *     tags: [Race]
   *     parameters:
   *       - in: path
   *         name: id
   *         schema:
   *           type: number
   *         required: true
   *         description: ID do Race
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             $ref: '#/components/schemas/UpdateRaceDTO'
   *     responses:
   *       200:
   *         description: Race atualizado com sucesso
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 message:
   *                   type: string
   *                   example: Race updated successfully
   */
  async update(request: Request, response: Response) {
    const { id } = request.params;
    const requestValidated = new UpdateRaceDTO({
      id: Number(id),
      ...request.body,
    });

    const raceService = container.resolve(RaceService);

    await raceService.update(requestValidated.getAll());

    return response.status(200).json({ message: 'Race updated successfully' });
  }

  /**
   * @swagger
   * /races/{id}:
   *   delete:
   *     summary: Deleta um Race pelo ID
   *     tags: [Race]
   *     parameters:
   *       - in: path
   *         name: id
   *         schema:
   *           type: number
   *         required: true
   *         description: ID do Race
   *     responses:
   *       200:
   *         description: Race deletado com sucesso
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 message:
   *                   type: string
   *                   example: Race deleted successfully
   */
  async delete(request: Request, response: Response) {
    const { id } = request.params;

    const raceService = container.resolve(RaceService);

    await raceService.delete(Number(id));

    return response.status(200).json({ message: 'Race deleted successfully' });
  }
}
