import { Entity } from '@clean-rn/ddd';
import { ICreateFootprintCommand } from '../commands';
import { FootprintVO } from '../value-objects/index';
import { FOOTPRINT_EVENTS } from '../events/index';

export interface IFootprintProperties {
  footprintId?: string;
  adultNumber: number;
  childNumber: number;
  startDate: Date;
  endDate: Date;
  userId: string;
  unit: string;
}
export class Footprint extends Entity<IFootprintProperties> {
  private constructor({ id, properties }: { id: string } & { properties: Partial<IFootprintProperties> }) {
    super({ id, properties });
  }

  static Create({
    footprint,
    startDate,
    endDate,
    userId,
    unit,
  }: {
    footprint: FootprintVO;
    startDate: Date;
    endDate: Date;
    userId: string;
    unit: string;
  }): Footprint {
    const footprintEntity = new Footprint({
      id: userId,
      properties: {
        ...footprint.value,
        startDate,
        endDate,
        userId,
        unit,
      },
    });
    Footprint.emitStaticDomainEvent(FOOTPRINT_EVENTS.FOOTPRINT_CREATED, footprintEntity);
    return footprintEntity;
  }
}
