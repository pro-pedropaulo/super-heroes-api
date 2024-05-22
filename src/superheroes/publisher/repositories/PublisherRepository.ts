import { injectable } from 'tsyringe';
import { In } from 'typeorm';

import { Publisher } from '../entities/Publisher';
import { CreatePublisher } from '../dtos/CreatePublisherDTO';
import { UpdatePublisher } from '../dtos/UpdatePublisherDTO';

import type { IPublisherRepository } from './IPublisherRepository';

import { AppDataSource } from '@/shared/infra/typeorm';
import { AbstractTransactionRepository } from '@/shared/container/providers/transaction-manager/AbstractTransactionRepository';
import { TransactionManager } from '@/shared/container/providers/transaction-manager/TransactionManager';

@injectable()
export class PublisherRepository
  extends AbstractTransactionRepository<Publisher>
  implements IPublisherRepository
{
  constructor(protected transaction: TransactionManager) {
    super(transaction, Publisher);
  }

  private readonly publisherRepository = AppDataSource.getRepository(Publisher);

  async create(data: CreatePublisher) {
    const publisher = this.publisherRepository.create(data);
    return await this.publisherRepository.save(publisher);
  }

  async findById(id: number) {
    return await this.publisherRepository.findOneBy({ id });
  }

  async getAll() {
    return await this.publisherRepository.find();
  }

  async update(data: UpdatePublisher) {
    await this.publisherRepository.update({ id: data.id }, data);
  }

  async delete(id: number) {
    await this.publisherRepository.delete(id);
  }

  async getPublisherByIds(ids: number[]): Promise<Publisher[]> {
    return await this.publisherRepository.find({
      where: {
        id: In(ids),
      },
      relations: {
        superheroes: {
          heroAttributes: {
            attribute: true,
          },
        },
      },
      order: {
        superheroes: {
          heroAttributes: {
            attribute: {
              attributeName: 'ASC',
            },
          },
        },
      },
    });
  }
}
