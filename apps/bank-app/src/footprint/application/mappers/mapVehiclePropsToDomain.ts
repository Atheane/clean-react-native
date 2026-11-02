import { FootprintError, VEHICLE_STATUS, VehicleVO } from '@clean-rn/footprint/domain';
import { IVehicleProps } from '../../presentation/types';

export const mapVehiclePropsToDomain = async (props: IVehicleProps): Promise<VehicleVO[]> => {
  if (props === undefined) {
    return [];
  }

  if (!props.licensePlate) {
    throw new FootprintError.InvalidLicensePlate();
  }

  await VehicleVO.validateLicensePlate(props.licensePlate);

  if (!props.acquisitionYear) {
    throw new FootprintError.InvalidVehicleDate();
  }

  if (props.hasBeenChanged && !props.oldLicensePlate) {
    throw new FootprintError.InvalidLicensePlate();
  }

  const vehicleVO = await VehicleVO.create({
    userId: props.userId,
    licensePlate: props.licensePlate,
    acquisitionDate: new Date(Date.UTC(props.acquisitionYear, 0, 1)).toISOString(),
    vehicleStatus: props.vehicleStatus,
  });

  if (!props.hasBeenChanged) {
    return [vehicleVO];
  } else {
    const oldVehicleVO = await VehicleVO.create({
      userId: props.userId,
      licensePlate: props.oldLicensePlate,
      acquisitionDate: new Date(Date.UTC(props.acquisitionYear, 0, 1)).toISOString(),
      vehicleStatus: VEHICLE_STATUS.SOLD,
    });
    return [vehicleVO, oldVehicleVO];
  }
};
