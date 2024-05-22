import { injectable } from 'tsyringe';

import { HeroAttribute } from '../entities/HeroAttribute';

import type {
  HeroAttributeSaveInput,
  HeroAttributeUpdateInput,
  IHeroAttributeRepository,
} from './IHeroAttributeRepository';

import { AppDataSource } from '@/shared/infra/typeorm';
import { AbstractTransactionRepository } from '@/shared/container/providers/transaction-manager/AbstractTransactionRepository';
import { TransactionManager } from '@/shared/container/providers/transaction-manager/TransactionManager';

@injectable()
export class HeroAttributeRepository
  extends AbstractTransactionRepository<HeroAttribute>
  implements IHeroAttributeRepository
{
  constructor(protected transaction: TransactionManager) {
    super(transaction, HeroAttribute);
  }

  private readonly heroAttributeRepository =
    AppDataSource.getRepository(HeroAttribute);

  async create(data: HeroAttributeSaveInput) {
    const heroAttribute = this.heroAttributeRepository.create(data);
    return await this.heroAttributeRepository.save(heroAttribute);
  }

  async findById(id: number) {
    return await this.heroAttributeRepository.findOne({
      where: { id },
      relations: {
        superhero: true,
        attribute: true,
      },
    });
  }

  async getAll() {
    return await this.heroAttributeRepository.find({
      relations: {
        superhero: true,
        attribute: true,
      },
    });
  }

  async update(data: HeroAttributeUpdateInput) {
    await this.heroAttributeRepository.update({ id: data.id }, data);
  }

  async delete(id: number) {
    await this.heroAttributeRepository.delete(id);
  }
}
