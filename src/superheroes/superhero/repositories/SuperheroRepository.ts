import { injectable } from 'tsyringe';
import {
  FindOptionsOrder,
  FindOptionsOrderValue,
  FindOptionsWhere,
} from 'typeorm';

import { Superhero } from '../entities/Superhero';
import { GetOrderSuperhero } from '../dtos/GetOrderSuperheroDTO';
import { GetFilterSuperhero } from '../dtos/GetFilterSuperheroDTO';

import type {
  SuperheroSaveInput,
  SuperheroUpdateInput,
  ISuperheroRepository,
} from './ISuperheroRepository';

import { AppDataSource } from '@/shared/infra/typeorm';
import { AbstractTransactionRepository } from '@/shared/container/providers/transaction-manager/AbstractTransactionRepository';
import { TransactionManager } from '@/shared/container/providers/transaction-manager/TransactionManager';

@injectable()
export class SuperheroRepository
  extends AbstractTransactionRepository<Superhero>
  implements ISuperheroRepository
{
  constructor(protected transaction: TransactionManager) {
    super(transaction, Superhero);
  }

  private readonly superheroRepository = AppDataSource.getRepository(Superhero);

  async create(data: SuperheroSaveInput) {
    const superhero = this.superheroRepository.create(data);
    return await this.superheroRepository.save(superhero);
  }

  async findById(id: number) {
    return await this.superheroRepository.findOne({
      where: { id },
      relations: {
        gender: true,
        eyeColour: true,
        hairColour: true,
        skinColour: true,
        race: true,
        publisher: true,
        alignment: true,
        heroAttributes: true,
        superpowers: true,
      },
    });
  }

  async getAll(
    page: number,
    size: number,
    orderData: GetOrderSuperhero,
    filter: GetFilterSuperhero,
  ) {
    const order: FindOptionsOrder<Superhero> = {};
    const where: FindOptionsWhere<Superhero> = {};
    const offset = (Number(page) - 1) * size;

    if (filter.attributeName) {
      where.heroAttributes = {
        attribute: {
          attributeName: filter.attributeName,
        },
      };
    }

    if (filter.alignment) {
      where.alignment = {
        alignment: filter.alignment,
      };
    }

    if (filter.powerName) {
      where.superpowers = {
        powerName: filter.powerName,
      };
    }

    if (filter.publisher) {
      where.publisher = {
        publisher: filter.publisher,
      };
    }

    if (orderData.attributeValue) {
      order.heroAttributes = {
        attributeValue: orderData.attributeValue as FindOptionsOrderValue,
      };
    }

    if (orderData.powerId) {
      order.superpowers = {
        id: orderData.powerId as FindOptionsOrderValue,
      };
    }

    const [result, total] = await this.superheroRepository.findAndCount({
      where,
      relations: {
        gender: true,
        eyeColour: true,
        hairColour: true,
        skinColour: true,
        race: true,
        publisher: true,
        alignment: true,
        heroAttributes: {
          attribute: true,
        },
        superpowers: true,
      },
      order,
      take: size,
      skip: offset,
    });

    const totalPages = Math.ceil(total / size);

    return {
      currentPage: Number(page),
      totalItems: total,
      totalPages,
      content: result,
    };
  }

  async update(data: SuperheroUpdateInput) {
    await this.superheroRepository.save(data);
  }

  async delete(id: number) {
    await this.superheroRepository.delete(id);
  }
}
