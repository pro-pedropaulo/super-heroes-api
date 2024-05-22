import { inject, injectable } from 'tsyringe';

import { IGenderRepository } from '../repositories/IGenderRepository';
import { CreateGender } from '../dtos/CreateGenderDTO';
import { UpdateGender } from '../dtos/UpdateGenderDTO';
import NotFound from '../../../shared/errors/notFound';

@injectable()
export class GenderService {
  constructor(
    @inject('GenderRepository')
    private readonly genderRepository: IGenderRepository,
  ) {}

  async create(data: CreateGender) {
    return await this.genderRepository.create(data);
  }

  async delete(id: number) {
    const gender = await this.findById(id);
    return await this.genderRepository.delete(gender.id);
  }

  async findById(id: number) {
    const gender = await this.genderRepository.findById(id);

    if (!gender) {
      throw new NotFound('NotFound any Gender with this id!');
    }

    return gender;
  }

  async getAll() {
    return await this.genderRepository.getAll();
  }

  async update(data: UpdateGender) {
    await this.findById(data.id);
    return await this.genderRepository.update(data);
  }
}
