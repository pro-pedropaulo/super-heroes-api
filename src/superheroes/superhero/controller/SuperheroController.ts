import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { CreateSuperheroDTO } from '../dtos/CreateSuperheroDTO';
import { UpdateSuperheroDTO } from '../dtos/UpdateSuperheroDTO';
import { IPageRequest } from '../../../shared/dtos/IPageRequest';
import { GetOrderSuperheroDTO } from '../dtos/GetOrderSuperheroDTO';
import { GetFilterSuperheroDTO } from '../dtos/GetFilterSuperheroDTO';
import { SuperheroService } from '../services/SuperheroService';
import { CreateSuperheroBattleDTO } from '../dtos/CreateSuperheroBattleDTO';

export class SuperheroController {
  /**
   * @swagger
   * /superheroes:
   *   post:
   *     summary: Adiciona um novo Superhero ao sistema
   *     tags: [Superhero]
   *     security:
   *       - bearerAuth: []
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             $ref: '#/components/schemas/CreateSuperheroDTO'
   *     responses:
   *       201:
   *         description: Superhero criado com sucesso
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/Superhero'
   */
  async create(request: Request, response: Response) {
    const requestValidated = new CreateSuperheroDTO(request.body);
    const createSuperheroService = container.resolve(SuperheroService);

    const createdSuperhero = await createSuperheroService.create(
      requestValidated.getAll(),
    );

    return response.status(201).json(createdSuperhero);
  }

  /**
   * @swagger
   * /superheroes/{id}:
   *   get:
   *     summary: Busca um Superhero pelo ID
   *     tags: [Superhero]
   *     parameters:
   *       - in: path
   *         name: id
   *         schema:
   *           type: number
   *         required: true
   *         description: ID do Superhero
   *     responses:
   *       200:
   *         description: Superhero encontrado
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/Superhero'
   */
  async findById(request: Request, response: Response) {
    const { id } = request.params;
    const findByIdSuperheroService = container.resolve(SuperheroService);

    const superhero = await findByIdSuperheroService.findById(Number(id));

    return response.status(200).json(superhero);
  }

  /**
   * @swagger
   * /superheroes:
   *   get:
   *     summary: Busca todos os Superheros
   *     tags: [Superhero]
   *     parameters:
   *       - in: query
   *         name: page
   *         schema:
   *           type: number
   *         description: Número da página que deseja acessar
   *       - in: query
   *         name: size
   *         schema:
   *           type: number
   *         description: Quantidade de dados que deseja trazer
   *       - in: query
   *         name: attributeValue
   *         schema:
   *           type: string
   *         description: Opção de order para attributeValue - DESC ou ASC
   *       - in: query
   *         name: powerId
   *         schema:
   *           type: string
   *         description: Opção de order para powerId - DESC ou ASC
   *       - in: query
   *         name: attributeName
   *         schema:
   *           type: string
   *         description: Opção de filtro para attributeName
   *       - in: query
   *         name: alignment
   *         schema:
   *           type: string
   *         description: Opção de filtro para alignment
   *       - in: query
   *         name: powerName
   *         schema:
   *           type: string
   *         description: Opção de filtro para powerName
   *       - in: query
   *         name: publisher
   *         schema:
   *           type: string
   *         description: Opção de filtro para publisher
   *     responses:
   *       200:
   *         description: Lista de Superheros
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/PageResponseSuperhero'
   */
  async getAll(request: Request, response: Response) {
    const { page = 1, size = 30 }: IPageRequest = request.query;
    const order = new GetOrderSuperheroDTO(request.query);
    const filter = new GetFilterSuperheroDTO(request.query);

    const getAllSuperheroService = container.resolve(SuperheroService);

    const superheros = await getAllSuperheroService.getAll(
      Number(page),
      Number(size),
      order.getAll(),
      filter.getAll(),
    );

    return response.status(200).json(superheros);
  }

  /**
   * @swagger
   * /superheroes/{id}:
   *   put:
   *     summary: Atualiza um Superhero existente
   *     tags: [Superhero]
   *     parameters:
   *       - in: path
   *         name: id
   *         schema:
   *           type: number
   *         required: true
   *         description: ID do Superhero
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             $ref: '#/components/schemas/UpdateSuperheroDTO'
   *     responses:
   *       200:
   *         description: Superhero atualizado com sucesso
   *         content:
   *           application/json:
   *             schema:
   *               type: string
   *               example: "Superhero updated successfully"
   */
  async update(request: Request, response: Response) {
    const { id } = request.params;
    const requestValidated = new UpdateSuperheroDTO({
      id: Number(id),
      ...request.body,
    });

    const updateSuperheroService = container.resolve(SuperheroService);

    await updateSuperheroService.update(requestValidated.getAll());

    return response.status(200).json('Superhero updated successfully');
  }

  /**
   * @swagger
   * /superheroes/{id}:
   *   delete:
   *     summary: Deleta um Superhero pelo ID
   *     tags: [Superhero]
   *     parameters:
   *       - in: path
   *         name: id
   *         schema:
   *           type: number
   *         required: true
   *         description: ID do Superhero
   *     responses:
   *       200:
   *         description: Superhero deletado com sucesso
   *         content:
   *           application/json:
   *             schema:
   *               type: string
   *               example: "Superhero deleted successfully"
   */
  async delete(request: Request, response: Response) {
    const { id } = request.params;
    const deleteSuperheroService = container.resolve(SuperheroService);

    await deleteSuperheroService.delete(Number(id));

    return response.status(200).json('Superhero deleted successfully');
  }

  /**
   * @swagger
   * /superheroes/battle:
   *   post:
   *     summary: Cria uma batalha entre Superhero de acordo com a Editora
   *     tags: [Superhero]
   *     security:
   *       - bearerAuth: []
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             $ref: '#/components/schemas/CreateSuperheroBattleDTO'
   *     responses:
   *       200:
   *         description: Batalha criada com sucesso
   *         content:
   *           application/json:
   *             schema:
   *               type: array
   *               items:
   *                 type: string
   *                 example: "Vencedor no atributo Combat foi Birdman com o valor de 70 | (Hanna-Barbera)"
   */
  async createBattle(request: Request, response: Response) {
    const requestValidated = new CreateSuperheroBattleDTO(request.body);

    const superheroService = container.resolve(SuperheroService);

    const createdBattle = await superheroService.createBattle(
      requestValidated.getAll(),
    );

    return response.status(200).json(createdBattle);
  }
}
