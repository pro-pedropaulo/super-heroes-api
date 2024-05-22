import { injectable } from 'tsyringe';

import { Alignment } from '../entities/Alignment';
import type { IAlignmentRepository } from '../repositories/IAlignmentRepository';
import { CreateAlignment } from '../dtos/CreateAlignmentDTO';
import { UpdateAlignment } from '../dtos/UpdateAlignmentDTO';

import { AppDataSource } from '@/shared/infra/typeorm';
import { AbstractTransactionRepository } from '@/shared/container/providers/transaction-manager/AbstractTransactionRepository';
import { TransactionManager } from '@/shared/container/providers/transaction-manager/TransactionManager';

@injectable()
export class AlignmentRepository
  extends AbstractTransactionRepository<Alignment>
  implements IAlignmentRepository
{
  constructor(protected transaction: TransactionManager) {
    super(transaction, Alignment);
  }

  private readonly alignmentRepository = AppDataSource.getRepository(Alignment);

  async create(data: CreateAlignment) {
    const alignment = this.alignmentRepository.create(data);
    return await this.alignmentRepository.save(alignment);
  }

  async findById(id: number) {
    return await this.alignmentRepository.findOneBy({ id });
  }

  async getAll() {
    return await this.alignmentRepository.find();
  }

  async update(data: UpdateAlignment) {
    await this.alignmentRepository.update({ id: data.id }, data);
  }

  async delete(id: number) {
    await this.alignmentRepository.delete(id);
  }
}
