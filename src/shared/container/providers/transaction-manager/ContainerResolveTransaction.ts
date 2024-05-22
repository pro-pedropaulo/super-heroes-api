import {
  Lifecycle,
  inject,
  injectable,
  container as containerTsyringe,
  type InjectionToken,
} from 'tsyringe';

import { TransactionManager } from './TransactionManager';
import { AbstractService } from './AbstractUseCase';

import { Constructor } from '@/shared/util/types/ConstructorType';

@injectable()
class ContainerResolveTransaction<T extends AbstractService> {
  constructor(
    protected transactionManager: TransactionManager,

    @inject('InjectDynamicToken')
    private token: T,
  ) {}

  public execute(...data: Parameters<T['execute']>) {
    console.log('Executing transaction...');
    return this.transactionManager.runInsideATransaction(() =>
      this.token.execute(...data),
    );
  }
}

export const container = {
  resolveWithTransaction: <T extends AbstractService>(
    token: Constructor<T>,
  ) => {
    containerTsyringe.register('InjectDynamicToken', token, {
      lifecycle: Lifecycle.ResolutionScoped,
    });

    return containerTsyringe.resolve<ContainerResolveTransaction<T>>(
      ContainerResolveTransaction,
    );
  },
  resolve: <T>(token: InjectionToken<T>) => containerTsyringe.resolve<T>(token),
};
