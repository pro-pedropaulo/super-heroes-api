import { injectable } from 'tsyringe';
import { In } from 'typeorm';

import { Superpower } from '../entities/Superpower';
import { CreateSuperpower } from '../dtos/CreateSuperpowerDTO';
import { UpdateSuperpower } from '../dtos/UpdateSuperpowerDTO';

import type { ISuperpowerRepository } from './ISuperpowerRepository';

import { AppDataSource } from '@/shared/infra/typeorm';
import { AbstractTransactionRepository } from '@/shared/container/providers/transaction-manager/AbstractTransactionRepository';
import { TransactionManager } from '@/shared/container/providers/transaction-manager/TransactionManager';

@injectable()
export class SuperpowerRepository
  extends AbstractTransactionRepository<Superpower>
  implements ISuperpowerRepository
{
  constructor(protected transaction: TransactionManager) {
    super(transaction, Superpower);
  }

  private readonly superpowerRepository =
    AppDataSource.getRepository(Superpower);

  async create(data: CreateSuperpower) {
    const superpower = this.superpowerRepository.create(data);
    return await this.superpowerRepository.save(superpower);
  }

  async findById(id: number) {
    return await this.superpowerRepository.findOneBy({ id });
  }

  async findByIds(ids: number[]) {
    return await this.superpowerRepository.find({
      where: {
        id: In(ids),
      },
    });
  }

  async getAll() {
    return await this.superpowerRepository.find();
  }

  async update(data: UpdateSuperpower) {
    await this.superpowerRepository.update({ id: data.id }, data);
  }

  async delete(id: number) {
    await this.superpowerRepository.delete(id);
  }
}
