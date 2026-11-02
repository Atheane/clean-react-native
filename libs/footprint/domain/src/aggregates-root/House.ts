import { Entity } from '@clean-rn/ddd';
import { Heater } from '../entities';
import { HOUSE_STATUS } from '../enums';
import { FOOTPRINT_EVENTS } from '../events';
import { Work } from 'libs/footprint/domain/src/entities/Work';

export interface IHouseProperties {
  heaters?: Heater[];
  houseId?: string;
  userId?: string;
  houseStatus: HOUSE_STATUS;
  works: Work[];
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
    const house = new House({
      id: houseId,
      properties: {
        houseId,
        userId,
        houseStatus,
      },
    });
    House.emitStaticDomainEvent(FOOTPRINT_EVENTS.HOUSE_CREATED, house);
    return house;
  }

  addHeaters(heaters: Heater[]): void {
    this.properties.heaters = heaters;
    this.emitDomainEvent(FOOTPRINT_EVENTS.HEATERS_ADDED, heaters);
  }

  addWorks(works: Work[]): void {
    this.properties.works = works;
    this.emitDomainEvent(FOOTPRINT_EVENTS.WORKS_ADDED, works);
  }
}
