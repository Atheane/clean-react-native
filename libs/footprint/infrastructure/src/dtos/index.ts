import { FOOTPRINT_UNIT, HEATER_TYPE, HEATER_USAGE, HOUSE_STATUS } from '@clean-rn/footprint/domain';

export type IAddHeaterDto = {
  date: string;
  heaterType: HEATER_TYPE;
  heaterUsage: HEATER_USAGE;
  isActive: boolean;
};

export type ICreateHouseDto = {
  userId: string;
  houseStatus: HOUSE_STATUS;
};

export type ICreateFootprintDto = {
  userId: string;
  adultNumber: number;
  childNumber: number;
};

export type IHouseDto = {
  houseId: number;
  houseStatus: HOUSE_STATUS;
  heaters: IHeaterDto[];
  // works: IWorkServer[];
};

export type IHeaterDto = {
  heaterId: number;
  date: string;
  heaterType: HEATER_TYPE;
  heaterUsage: HEATER_USAGE;
  isActive: boolean;
};

export type IFootprintDto = {
  adultNumber: number;
  childNumber: number;
  endDate: string;
  startDate: string;
  userId: number;
  unit: FOOTPRINT_UNIT;
};
