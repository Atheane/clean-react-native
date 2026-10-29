import { HEATER_TYPE, HEATER_USAGE } from '@clean-rn/carbon/domain';

export type IHeaterProps = {
  usage: HEATER_USAGE;
  heatType: HEATER_TYPE;
  installationYear: number;
  previousHeatType?: HEATER_TYPE;
};
