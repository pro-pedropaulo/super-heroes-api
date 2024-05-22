import { scoped, Lifecycle } from 'tsyringe';
import type { ObjectLiteral, QueryRunner } from 'typeorm';

import { randomUUID } from 'node:crypto';

import { logger } from '../logger';

import { Constructor } from '@/shared/util/types/ConstructorType';
import { AppDataSource } from '@/shared/infra/typeorm';
import AppError from '@/shared/errors/appError';

@scoped(Lifecycle.ResolutionScoped)
export class TransactionManager {
  public queryRunner: QueryRunner;
  private transactionId: string;

  public async startNewTransaction() {
    if (this.isTransactionActive()) {
      return;
    }

    this.transactionId = randomUUID();
    logger.info(`Transaction [${this.transactionId}]: Starting transaction`);
    await this.setupQueryRunner();
    await this.queryRunner.startTransaction();
  }

  private async setupQueryRunner() {
    if (!this.queryRunner) {
      this.queryRunner = AppDataSource.createQueryRunner();
      await this.queryRunner.connect();
    }
  }

  private async commit() {
    if (!this.isTransactionActive()) {
      throw new AppError('Transaction not found');
    }
    await this.queryRunner.commitTransaction();
  }

  public async rollback() {
    if (!this.isTransactionActive()) {
      throw new AppError('Transaction not found');
    }
    await this.queryRunner.rollbackTransaction();
  }

  public getRepository<T extends ObjectLiteral>(entity: Constructor<T>) {
    if (this.isTransactionActive()) {
      logger.info(
        `Transaction [${this.transactionId}]: Getting repository ${entity.name}`,
      );
      return this.queryRunner.manager.getRepository(entity);
    }

    return AppDataSource.getRepository(entity);
  }

  private isTransactionActive() {
    if (!this.queryRunner) {
      return false;
    }

    return this.queryRunner.isTransactionActive;
  }

  public async runInsideATransaction(callback: CallableFunction) {
    try {
      await this.startNewTransaction();

      const response = await callback();

      await this.commit();
      logger.info(`Transaction [${this.transactionId}]: Committed`);

      return response;
    } catch (error) {
      await this.rollback();
      logger.info(`Transaction [${this.transactionId}]: Rollback`);
      throw error;
    } finally {
      await this.queryRunner.release();
      logger.info(`Transaction [${this.transactionId}]: Released`);
    }
  }
}
