import { Entity } from '@clean-rn/ddd';
import { Vehicle } from '../entities/Vehicle';
import { FOOTPRINT_EVENTS } from '../events';

export interface ITransportProperties {
  vehicles?: Vehicle[];
}

export class Transport extends Entity<ITransportProperties> {
  private constructor({ id, properties }: { id?: string } & { properties: Partial<ITransportProperties> }) {
    super({ id, properties });
  }

  static Create({ transportId }: { transportId?: string }): Transport {
    const transport = transportId
      ? new Transport({ id: transportId, properties: {} })
      : new Transport({ properties: {} });
    Transport.emitStaticDomainEvent(FOOTPRINT_EVENTS.TRANSPORT_CREATED, transport);
    return transport;
  }

  addVehicles(vehicles: Vehicle[]): void {
    this.properties.vehicles = vehicles;
    this.emitDomainEvent(FOOTPRINT_EVENTS.VEHICLES_ADDED, vehicles);
  }
}
