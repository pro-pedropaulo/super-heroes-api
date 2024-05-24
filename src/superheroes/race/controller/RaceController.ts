import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { CreateRaceDTO } from '../dtos/CreateRaceDTO';
import { UpdateRaceDTO } from '../dtos/UpdateRaceDTO';
import { RaceService } from '../services/RaceService';

export class RaceController {
  async create(request: Request, response: Response) {
    const requestValidated = new CreateRaceDTO(request.body);

    const raceService = container.resolve(RaceService);

    const createdRace = await raceService.create(requestValidated.getAll());

    return response.status(201).json(createdRace);
  }

  async findById(request: Request, response: Response) {
    const { id } = request.params;

    const raceService = container.resolve(RaceService);

    const race = await raceService.findById(Number(id));

    return response.status(200).json(race);
  }

  async getAll(request: Request, response: Response) {
    const raceService = container.resolve(RaceService);

    const races = await raceService.getAll();

    return response.status(200).json(races);
  }

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

  async delete(request: Request, response: Response) {
    const { id } = request.params;

    const raceService = container.resolve(RaceService);

    await raceService.delete(Number(id));

    return response.status(200).json({ message: 'Race deleted successfully' });
  }
}
