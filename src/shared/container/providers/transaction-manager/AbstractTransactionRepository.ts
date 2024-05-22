import type { ObjectLiteral } from 'typeorm';

import { TransactionManager } from './TransactionManager';

import { Constructor } from '@/shared/util/types/ConstructorType';

export abstract class AbstractTransactionRepository<T extends ObjectLiteral> {
  constructor(
    protected transaction: TransactionManager,
    private entity: Constructor<T>,
  ) {}

  public getRepository() {
    return this.transaction.getRepository(this.entity);
  }
}
