import { inject, injectable } from 'tsyringe';

import { IAttributeRepository } from '../repositories/IAttributeRepository';
import { CreateAttribute } from '../dtos/CreateAttributeDTO';
import { UpdateAttribute } from '../dtos/UpdateAttributeDTO';
import NotFound from '../../../shared/errors/notFound';

@injectable()
export class AttributeService {
  constructor(
    @inject('AttributeRepository')
    private readonly attributeRepository: IAttributeRepository,
  ) {}

  async create(data: CreateAttribute) {
    return await this.attributeRepository.create(data);
  }

  async delete(id: number) {
    const attribute = await this.findById(id);
    return await this.attributeRepository.delete(attribute.id);
  }

  async findById(id: number) {
    const attribute = await this.attributeRepository.findById(id);

    if (!attribute) {
      throw new NotFound('NotFound any Attribute with this id!');
    }

    return attribute;
  }

  async getAll() {
    return await this.attributeRepository.getAll();
  }

  async update(data: UpdateAttribute) {
    await this.findById(data.id);
    return await this.attributeRepository.update(data);
  }
}
