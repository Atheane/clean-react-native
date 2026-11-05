import { HttpConnection } from '@clean-rn/shared/infrastructure';
import { IEnergyRepository } from '@clean-rn/energy/domain';
import { EnergyApi } from './network/index';
import { EnergyRepositoryInMemory } from './in-memory';

export class EnergyRepositoryFactory {
  private static useInMemory: boolean = true;

  static setUseInMemory(value: boolean): void {
    this.useInMemory = value;
  }

  static getRepository(httpConnection: HttpConnection): IEnergyRepository {
    if (this.useInMemory) {
      return EnergyRepositoryInMemory.getInstance();
    } else {
      return EnergyApi.getInstance(httpConnection);
    }
  }
}
