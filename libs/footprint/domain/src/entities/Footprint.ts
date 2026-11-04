import { Entity } from '@clean-rn/ddd';
import { HouseholdVO } from '../value-objects';
import { FOOTPRINT_EVENTS } from '../events';

export interface IFootprintProperties {
  adultNumber: number;
  childNumber: number;
  startDate: Date;
  endDate: Date;
  userId: string;
  unit: string;
  history?: Footprint[];
}
export class Footprint extends Entity<IFootprintProperties> {
  private constructor({ id, properties }: { id: string } & { properties: Partial<IFootprintProperties> }) {
    super({ id, properties });
  }

  static Create({
    household,
    startDate,
    endDate,
    userId,
    unit,
  }: {
    household: HouseholdVO;
    startDate: Date;
    endDate: Date;
    userId: string;
    unit: string;
  }): Footprint {
    const footprintEntity = new Footprint({
      id: userId,
      properties: {
        ...household.value,
        startDate,
        endDate,
        userId,
        unit,
      },
    });
    Footprint.emitStaticDomainEvent(FOOTPRINT_EVENTS.FOOTPRINT_CREATED, footprintEntity);
    return footprintEntity;
  }

  addHistory(history: Footprint[]): void {
    this.properties.history = history;
    this.emitDomainEvent(FOOTPRINT_EVENTS.PAST_FOOTPRINTS_ADDED, history);
  }
}
