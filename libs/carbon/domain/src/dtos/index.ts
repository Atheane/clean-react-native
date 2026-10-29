import { HEATER_TYPE, HEATER_USAGE } from '../enums';

export type IAddHeaterDto = {
  date: string;
  heaterType: HEATER_TYPE;
  heaterUsage: HEATER_USAGE;
  isActive: boolean;
};
