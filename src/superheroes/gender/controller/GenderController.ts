import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { CreateGenderDTO } from '../dtos/CreateGenderDTO';
import { UpdateGenderDTO } from '../dtos/UpdateGenderDTO';
import { GenderService } from '../services/GenderService';

export class GenderController {
  async create(request: Request, response: Response) {
    const requestValidated = new CreateGenderDTO(request.body);

    const genderService = container.resolve(GenderService);

    const createdGender = await genderService.create(requestValidated.getAll());

    return response.status(201).json(createdGender);
  }

  async findById(request: Request, response: Response) {
    const { id } = request.params;

    const genderService = container.resolve(GenderService);

    const gender = await genderService.findById(Number(id));

    return response.status(200).json(gender);
  }

  async getAll(request: Request, response: Response) {
    const genderService = container.resolve(GenderService);

    const genders = await genderService.getAll();

    return response.status(200).json(genders);
  }

  async update(request: Request, response: Response) {
    const { id } = request.params;
    const requestValidated = new UpdateGenderDTO({
      id: Number(id),
      ...request.body,
    });

    const genderService = container.resolve(GenderService);

    await genderService.update(requestValidated.getAll());

    return response
      .status(200)
      .json({ message: 'Gender updated successfully' });
  }

  async delete(request: Request, response: Response) {
    const { id } = request.params;

    const genderService = container.resolve(GenderService);

    await genderService.delete(Number(id));

    return response
      .status(200)
      .json({ message: 'Gender deleted successfully' });
  }
}
