import { Entity } from '@clean-rn/ddd';
import { VehicleVO } from '../value-objects';

export class Vehicle extends Entity<VehicleVO> {
  private constructor({ id, properties }: { id: string } & { properties: Partial<VehicleVO> }) {
    super({ id, properties });
  }

  static Create({ vehicleId, vehicle }: { vehicleId: string; vehicle: VehicleVO }): Vehicle {
    return new Vehicle({
      id: vehicleId.toString(),
      properties: {
        ...vehicle.value,
      },
    });
  }
}
