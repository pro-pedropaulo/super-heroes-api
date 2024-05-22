import { inject, injectable } from 'tsyringe';

import { IAlignmentRepository } from '../repositories/IAlignmentRepository';
import { CreateAlignment } from '../dtos/CreateAlignmentDTO';
import NotFound from '../../../shared/errors/notFound';
import { UpdateAlignment } from '../dtos/UpdateAlignmentDTO';

@injectable()
export class AlignmentService {
  constructor(
    @inject('AlignmentRepository')
    private readonly alignmentRepository: IAlignmentRepository,
  ) {}

  async create(data: CreateAlignment) {
    return await this.alignmentRepository.create(data);
  }

  async delete(id: number) {
    const alignment = await this.findById(id);
    return await this.alignmentRepository.delete(alignment.id);
  }

  async findById(id: number) {
    const alignment = await this.alignmentRepository.findById(id);

    if (!alignment) {
      throw new NotFound('NotFound any Alignment with this id!');
    }

    return alignment;
  }

  async getAll() {
    return await this.alignmentRepository.getAll();
  }

  async update(data: UpdateAlignment) {
    await this.findById(data.id);
    return await this.alignmentRepository.update(data);
  }
}
