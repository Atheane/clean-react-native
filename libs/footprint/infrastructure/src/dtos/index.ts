import {
  FOOTPRINT_UNIT,
  HEATER_TYPE,
  HEATER_USAGE,
  HOUSE_STATUS,
  HOUSE_WORK_TYPE,
  VEHICLE_STATUS,
} from '@clean-rn/footprint/domain';

export type ICreateFootprintDto = {
  userId: string;
  adultNumber: number;
  childNumber: number;
};

export type IFootprintDto = {
  adultNumber: number;
  childNumber: number;
  endDate: string;
  startDate: string;
  userId: number;
  unit: FOOTPRINT_UNIT;
};

export type ICreateHouseDto = {
  userId: string;
  houseStatus: HOUSE_STATUS;
};

export type IHouseDto = {
  houseId: number;
  houseStatus: HOUSE_STATUS;
  heaters: IHeaterDto[];
  works: IWorkDto[];
};

export type IAddHeaterDto = {
  installationDate: string;
  heaterType: HEATER_TYPE;
  heaterUsage: HEATER_USAGE;
  isActive: boolean;
};

export type IHeaterDto = {
  heaterId: number;
  date: string;
  heaterType: HEATER_TYPE;
  heaterUsage: HEATER_USAGE;
  isActive: boolean;
};

export type IAddWorkDto = {
  workDate: string;
  workType: HOUSE_WORK_TYPE;
};

export type IWorkDto = {
  workId: number;
  workDate: string;
  workType: HOUSE_WORK_TYPE;
};

export type IAddVehicleDto = {
  acquisitionDate: string;
  licensePlate: string;
  vehicleStatus: VEHICLE_STATUS;
};

export type IVehicleDto = {
  acquisitionDate: string;
  licensePlate: string;
  vehicleStatus: VEHICLE_STATUS;
};
