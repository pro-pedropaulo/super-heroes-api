import { injectable } from 'tsyringe';

import { Race } from '../entities/Race';
import { CreateRace } from '../dtos/CreateRaceDTO';
import { UpdateRace } from '../dtos/UpdateRaceDTO';

import type { IRaceRepository } from './IRaceRepository';

import { AppDataSource } from '@/shared/infra/typeorm';
import { AbstractTransactionRepository } from '@/shared/container/providers/transaction-manager/AbstractTransactionRepository';
import { TransactionManager } from '@/shared/container/providers/transaction-manager/TransactionManager';

@injectable()
export class RaceRepository
  extends AbstractTransactionRepository<Race>
  implements IRaceRepository
{
  constructor(protected transaction: TransactionManager) {
    super(transaction, Race);
  }

  private readonly raceRepository = AppDataSource.getRepository(Race);

  async create(data: CreateRace) {
    const race = this.raceRepository.create(data);
    return await this.raceRepository.save(race);
  }

  async findById(id: number) {
    return await this.raceRepository.findOneBy({ id });
  }

  async getAll() {
    return await this.raceRepository.find();
  }

  async update(data: UpdateRace) {
    await this.raceRepository.update({ id: data.id }, data);
  }

  async delete(id: number) {
    await this.raceRepository.delete(id);
  }
}
