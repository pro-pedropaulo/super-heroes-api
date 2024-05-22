import { inject, injectable } from 'tsyringe';

import { IColourRepository } from '../repositories/IColourRepository';
import { CreateColour } from '../dtos/CreateColourDTO';
import { UpdateColour } from '../dtos/UpdateColourDTO';
import NotFound from '../../../shared/errors/notFound';

@injectable()
export class ColourService {
  constructor(
    @inject('ColourRepository')
    private readonly colourRepository: IColourRepository,
  ) {}

  async create(data: CreateColour) {
    return await this.colourRepository.create(data);
  }

  async delete(id: number) {
    const colour = await this.findById(id);
    return await this.colourRepository.delete(colour.id);
  }

  async findById(id: number) {
    const colour = await this.colourRepository.findById(id);

    if (!colour) {
      throw new NotFound('NotFound any Colour with this id!');
    }

    return colour;
  }

  async getAll() {
    return await this.colourRepository.getAll();
  }

  async update(data: UpdateColour) {
    await this.findById(data.id);
    return await this.colourRepository.update(data);
  }
}
