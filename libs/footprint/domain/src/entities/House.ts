import { Entity } from '@clean-rn/ddd';
import { Heater } from './Heater';
import { HOUSE_STATUS } from '../enums';
import { FOOTPRINT_EVENTS } from '../events';

export interface IHouseProperties {
  heaters?: Heater[];
  houseId?: string;
  userId?: string;
  houseStatus: HOUSE_STATUS;
  //   works: Work[];
}

export class House extends Entity<IHouseProperties> {
  private constructor({ id, properties }: { id?: string } & { properties: Partial<IHouseProperties> }) {
    super({ id, properties });
  }

  static Create({
    houseId,
    houseStatus,
    userId,
  }: {
    houseId?: string;
    houseStatus: HOUSE_STATUS;
    userId?: string;
  }): House {
    House.emitStaticDomainEvent(FOOTPRINT_EVENTS.HOUSE_CREATED, { houseId, houseStatus, userId });
    return new House({
      id: houseId,
      properties: {
        houseId,
        userId,
        houseStatus,
      },
    });
  }

  addHeater(heater: Heater): void {
    this.properties.heaters = this.properties.heaters ? [...this.properties.heaters, heater] : [heater];
    this.emitDomainEvent(FOOTPRINT_EVENTS.HEATER_ADDED, { heater });
  }
}
