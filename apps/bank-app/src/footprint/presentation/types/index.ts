import {
  HEATER_TYPE,
  HEATER_USAGE,
  HOUSE_WORK_TYPE,
  VEHICLE_STATUS,
  VehicleVO,
} from '@clean-rn/footprint/domain';

export type IHeaterProps = {
  usage: HEATER_USAGE;
  heatType: HEATER_TYPE;
  installationYear?: number;
  previousHeatType?: HEATER_TYPE;
  hasBeenChanged?: boolean;
};

export type IWorksProps = {
  worksType: HOUSE_WORK_TYPE[];
  workDate: number;
};

export type IHouseholdProps = {
  adultNumber: number;
  childNumber: number;
};

export type IVehicleProps = {
  userId: number;
  licensePlate: string;
  oldLicensePlate?: string;
  hasBeenChanged: boolean;
  acquisitionYear: number;
  vehicleStatus: VEHICLE_STATUS;
  consent?: boolean;
};

export type IVehiclesProps = {
  userId: number;
  vehicles: VehicleVO[];
};
