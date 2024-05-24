import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { CreateHeroAttributeDTO } from '../dtos/CreateHeroAttributeDTO';
import { UpdateHeroAttributeDTO } from '../dtos/UpdateHeroAttributeDTO';
import { HeroAttributeService } from '../services/HeroAttributeService';

export class HeroAttributeController {
  async create(request: Request, response: Response) {
    const requestValidated = new CreateHeroAttributeDTO(request.body);

    const heroAttributeService = container.resolve(HeroAttributeService);

    const createdHeroAttribute = await heroAttributeService.create(
      requestValidated.getAll(),
    );

    return response.status(201).json(createdHeroAttribute);
  }

  async findById(request: Request, response: Response) {
    const { id } = request.params;

    const heroAttributeService = container.resolve(HeroAttributeService);

    const heroAttribute = await heroAttributeService.findById(Number(id));

    return response.status(200).json(heroAttribute);
  }

  async getAll(request: Request, response: Response) {
    const heroAttributeService = container.resolve(HeroAttributeService);

    const heroAttributes = await heroAttributeService.getAll();

    return response.status(200).json(heroAttributes);
  }

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

  async delete(request: Request, response: Response) {
    const { id } = request.params;

    const heroAttributeService = container.resolve(HeroAttributeService);

    await heroAttributeService.delete(Number(id));

    return response
      .status(200)
      .json({ message: 'HeroAttribute deleted successfully' });
  }
}
