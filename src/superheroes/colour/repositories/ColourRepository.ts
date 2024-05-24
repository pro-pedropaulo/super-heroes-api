import { injectable } from 'tsyringe';

import { Colour } from '../entities/Colour';
import { CreateColour } from '../dtos/CreateColourDTO';
import { UpdateColour } from '../dtos/UpdateColourDTO';

import type { IColourRepository } from './IColourRepository';

import { AppDataSource } from '@/shared/infra/typeorm';
import { AbstractTransactionRepository } from '@/shared/container/providers/transaction-manager/AbstractTransactionRepository';
import { TransactionManager } from '@/shared/container/providers/transaction-manager/TransactionManager';

@injectable()
export class ColourRepository
  extends AbstractTransactionRepository<Colour>
  implements IColourRepository
{
  constructor(protected transaction: TransactionManager) {
    super(transaction, Colour);
  }

  private readonly colourRepository = AppDataSource.getRepository(Colour);

  async create(data: CreateColour) {
    const colour = this.colourRepository.create(data);
    return await this.colourRepository.save(colour);
  }

  async findById(id: number) {
    return await this.colourRepository.findOneBy({ id });
  }

  async getAll() {
    return await this.colourRepository.find();
  }

  async update(data: UpdateColour) {
    await this.colourRepository.update({ id: data.id }, data);
  }

  async delete(id: number) {
    await this.colourRepository.delete(id);
  }
}
