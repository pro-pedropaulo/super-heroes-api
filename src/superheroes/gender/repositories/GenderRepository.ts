import { injectable } from 'tsyringe';

import { Gender } from '../entities/Gender';
import { CreateGender } from '../dtos/CreateGenderDTO';
import { UpdateGender } from '../dtos/UpdateGenderDTO';

import type { IGenderRepository } from './IGenderRepository';

import { AppDataSource } from '@/shared/infra/typeorm';
import { AbstractTransactionRepository } from '@/shared/container/providers/transaction-manager/AbstractTransactionRepository';
import { TransactionManager } from '@/shared/container/providers/transaction-manager/TransactionManager';

@injectable()
export class GenderRepository
  extends AbstractTransactionRepository<Gender>
  implements IGenderRepository
{
  constructor(protected transaction: TransactionManager) {
    super(transaction, Gender);
  }

  private readonly genderRepository = AppDataSource.getRepository(Gender);

  async create(data: CreateGender) {
    const gender = this.genderRepository.create(data);
    return await this.genderRepository.save(gender);
  }

  async findById(id: number) {
    return await this.genderRepository.findOneBy({ id });
  }

  async getAll() {
    return await this.genderRepository.find();
  }

  async update(data: UpdateGender) {
    await this.genderRepository.update({ id: data.id }, data);
  }

  async delete(id: number) {
    await this.genderRepository.delete(id);
  }
}
