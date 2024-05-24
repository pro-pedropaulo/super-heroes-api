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
  async create(request: Request, response: Response) {
    const requestValidated = new CreateSuperheroDTO(request.body);
    const createSuperheroService = container.resolve(SuperheroService);

    const createdSuperhero = await createSuperheroService.create(
      requestValidated.getAll(),
    );

    return response.status(201).json(createdSuperhero);
  }

  async findById(request: Request, response: Response) {
    const { id } = request.params;
    const findByIdSuperheroService = container.resolve(SuperheroService);

    const superhero = await findByIdSuperheroService.findById(Number(id));

    return response.status(200).json(superhero);
  }

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

  async delete(request: Request, response: Response) {
    const { id } = request.params;
    const deleteSuperheroService = container.resolve(SuperheroService);

    await deleteSuperheroService.delete(Number(id));

    return response.status(200).json('Superhero deleted successfully');
  }

  async createBattle(request: Request, response: Response) {
    const requestValidated = new CreateSuperheroBattleDTO(request.body);

    const superheroService = container.resolve(SuperheroService);

    const createdBattle = await superheroService.createBattle(
      requestValidated.getAll(),
    );

    return response.status(200).json(createdBattle);
  }
}
