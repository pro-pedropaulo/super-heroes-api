import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { CreateSuperpowerDTO } from '../dtos/CreateSuperpowerDTO';
import { UpdateSuperpowerDTO } from '../dtos/UpdateSuperpowerDTO';
import { SuperpowerService } from '../services/SuperpowerService';

export class SuperpowerController {
  async create(request: Request, response: Response) {
    const requestValidated = new CreateSuperpowerDTO(request.body);

    const superpowerService = container.resolve(SuperpowerService);

    const createdSuperpower = await superpowerService.create(
      requestValidated.getAll(),
    );

    return response.status(201).json(createdSuperpower);
  }

  async findById(request: Request, response: Response) {
    const { id } = request.params;

    const superpowerService = container.resolve(SuperpowerService);

    const superpower = await superpowerService.findById(Number(id));

    return response.status(200).json(superpower);
  }

  async getAll(request: Request, response: Response) {
    const superpowerService = container.resolve(SuperpowerService);

    const superpowers = await superpowerService.getAll();

    return response.status(200).json(superpowers);
  }

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

  async delete(request: Request, response: Response) {
    const { id } = request.params;

    const superpowerService = container.resolve(SuperpowerService);

    await superpowerService.delete(Number(id));

    return response
      .status(200)
      .json({ message: 'Superpower deleted successfully' });
  }
}
