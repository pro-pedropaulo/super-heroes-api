import { inject, injectable } from 'tsyringe';

import { ISuperpowerRepository } from '../repositories/ISuperpowerRepository';
import { CreateSuperpower } from '../dtos/CreateSuperpowerDTO';
import { UpdateSuperpower } from '../dtos/UpdateSuperpowerDTO';
import NotFound from '../../../shared/errors/notFound';

@injectable()
export class SuperpowerService {
  constructor(
    @inject('SuperpowerRepository')
    private readonly superpowerRepository: ISuperpowerRepository,
  ) {}

  async create(data: CreateSuperpower) {
    return await this.superpowerRepository.create(data);
  }

  async delete(id: number) {
    const superpower = await this.findById(id);
    return await this.superpowerRepository.delete(superpower.id);
  }

  async findById(id: number) {
    const superpower = await this.superpowerRepository.findById(id);

    if (!superpower) {
      throw new NotFound('NotFound any Superpower with this id!');
    }

    return superpower;
  }

  async getAll() {
    return await this.superpowerRepository.getAll();
  }

  async update(data: UpdateSuperpower) {
    await this.findById(data.id);
    return await this.superpowerRepository.update(data);
  }
}
