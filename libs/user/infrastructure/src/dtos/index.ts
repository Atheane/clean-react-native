import { HEATER_TYPE, HEATER_USAGE, HOUSE_STATUS } from '@clean-rn/footprint/domain';

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
