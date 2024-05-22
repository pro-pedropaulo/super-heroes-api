import { inject, injectable } from 'tsyringe';

import { IRaceRepository } from '../repositories/IRaceRepository';
import { CreateRace } from '../dtos/CreateRaceDTO';
import { UpdateRace } from '../dtos/UpdateRaceDTO';
import NotFound from '../../../shared/errors/notFound';

@injectable()
export class RaceService {
  constructor(
    @inject('RaceRepository')
    private readonly raceRepository: IRaceRepository,
  ) {}

  async create(data: CreateRace) {
    return await this.raceRepository.create(data);
  }

  async delete(id: number) {
    const race = await this.findById(id);
    return await this.raceRepository.delete(race.id);
  }

  async findById(id: number) {
    const race = await this.raceRepository.findById(id);

    if (!race) {
      throw new NotFound('NotFound any Race with this id!');
    }

    return race;
  }

  async getAll() {
    return await this.raceRepository.getAll();
  }

  async update(data: UpdateRace) {
    await this.findById(data.id);
    return await this.raceRepository.update(data);
  }
}
