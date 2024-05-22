import { injectable } from 'tsyringe';

import { Attribute } from '../entities/Attribute';
import type { IAttributeRepository } from '../repositories/IAttributeRepository';
import { CreateAttribute } from '../dtos/CreateAttributeDTO';
import { UpdateAttribute } from '../dtos/UpdateAttributeDTO';

import { AppDataSource } from '@/shared/infra/typeorm';
import { AbstractTransactionRepository } from '@/shared/container/providers/transaction-manager/AbstractTransactionRepository';
import { TransactionManager } from '@/shared/container/providers/transaction-manager/TransactionManager';

@injectable()
export class AttributeRepository
  extends AbstractTransactionRepository<Attribute>
  implements IAttributeRepository
{
  constructor(protected transaction: TransactionManager) {
    super(transaction, Attribute);
  }

  private readonly attributeRepository = AppDataSource.getRepository(Attribute);

  async create(data: CreateAttribute) {
    const attribute = this.attributeRepository.create(data);
    return await this.attributeRepository.save(attribute);
  }

  async findById(id: number) {
    return await this.attributeRepository.findOneBy({ id });
  }

  async getAll() {
    return await this.attributeRepository.find();
  }

  async update(data: UpdateAttribute) {
    await this.attributeRepository.update({ id: data.id }, data);
  }

  async delete(id: number) {
    await this.attributeRepository.delete(id);
  }
}
