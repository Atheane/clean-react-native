import { HEATER_TYPE, HEATER_USAGE } from '@clean-rn/footprint/domain';

export type IHeaterProps = {
  usage: HEATER_USAGE;
  heatType: HEATER_TYPE;
  installationYear: number;
  previousHeatType?: HEATER_TYPE;
};

export type IFootprintProps = {
  adultNumber: number;
  childNumber: number;
};
