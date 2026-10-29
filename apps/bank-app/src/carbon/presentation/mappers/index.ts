import { CarbonError, Heater, HEATER_USAGE } from '@clean-rn/carbon/domain';
import { IHeaterProps } from '../types';

export const mapHeaterPropsToDomain = async (props: IHeaterProps): Promise<Heater[]> => {
  if (!props.installationYear) {
    throw new CarbonError.InvalidHeaterDate();
  }

  const heaters: Heater[] = [
    await Heater.create({
      date: new Date(Date.UTC(props.installationYear, 0, 1)).toISOString(),
      heaterUsage: props.usage,
      heaterType: props.heatType,
      isActive: true,
    }),
  ];

  if ([HEATER_USAGE.MAIN, HEATER_USAGE.SANITARY].includes(props.usage) && props.installationYear >= 2012) {
    heaters.push(
      await Heater.create({
        date: new Date(Date.UTC(props.installationYear - 2, 0, 1)).toISOString(),
        heaterUsage: props.usage,
        heaterType: props.previousHeatType,
        isActive: false,
      }),
    );
  }

  return heaters;
};
