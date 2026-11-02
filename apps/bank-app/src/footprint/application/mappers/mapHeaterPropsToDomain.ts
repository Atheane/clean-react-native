import { FootprintError, HeaterVO, HEATER_USAGE } from '@clean-rn/footprint/domain';
import { IHeaterProps } from '../../presentation/types';

export const mapHeaterPropsToDomain = async (props: IHeaterProps): Promise<HeaterVO[]> => {
  if (!props.hasBeenChanged) {
    const heaters: HeaterVO[] = [
      await HeaterVO.create({
        installationDate: new Date(Date.UTC(2010, 0, 1)).toISOString(), // if heater has never been changed, we put 2010 as ref year
        heaterUsage: props.usage,
        heaterType: props.heatType,
        isActive: true,
      }),
    ];
    return heaters;
  }

  if (!props.installationYear) {
    throw new FootprintError.InvalidHeaterDate();
  }

  const heaters: HeaterVO[] = [
    await HeaterVO.create({
      installationDate: new Date(Date.UTC(props.installationYear, 0, 1)).toISOString(),
      heaterUsage: props.usage,
      heaterType: props.heatType,
      isActive: true,
    }),
  ];

  if ([HEATER_USAGE.MAIN, HEATER_USAGE.SANITARY].includes(props.usage) && props.installationYear >= 2011) {
    heaters.push(
      await HeaterVO.create({
        installationDate: new Date(Date.UTC(props.installationYear - 2, 0, 1)).toISOString(),
        heaterUsage: props.usage,
        heaterType: props.previousHeatType,
        isActive: false,
      }),
    );
  }

  return heaters;
};
