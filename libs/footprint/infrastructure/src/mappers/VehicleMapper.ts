import { VehicleVO, Vehicle } from '@clean-rn/footprint/domain';
import { IVehicleDto, IAddVehicleDto } from '../dtos';

export class VehicleMapper {
  static async toDomain({ ...vehicleProps }: IVehicleDto): Promise<Vehicle> {
    const vehicleVO = await VehicleVO.create({
      ...vehicleProps,
    });
    return Vehicle.Create({
      vehicleId: vehicleProps.licensePlate.toString(),
      vehicle: vehicleVO,
    });
  }

  static toDto(vehicleVO: VehicleVO): IAddVehicleDto {
    return {
      ...vehicleVO.value,
    };
  }
}
