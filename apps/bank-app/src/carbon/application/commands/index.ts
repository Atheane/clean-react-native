import { HouseT } from '@bank/carbon-weight/dist';

import {
  ICarbonActions,
  ICarbonTypes,
  IComputeHouseEmissions,
  IHouseEmissionsComputed,
  IInitializeHouseEmissions,
} from './types';

// commands
export const computeHouseEmissions = (payload: HouseT & { consumption: number }): IComputeHouseEmissions => ({
  type: ICarbonTypes.COMPUTE_HOUSE_EMISSIONS,
  payload,
});

export const initializeHouseEmissions = (): IInitializeHouseEmissions => ({
  type: ICarbonTypes.INITIALIZE_HOUSE_EMISSIONS,
});

// domainEvents
export const houseEmissionsComputed = (payload: {
  footprint: number;
  average: number;
}): IHouseEmissionsComputed => ({
  type: ICarbonTypes.HOUSE_EMISSIONS_COMPUTED,
  payload,
});

export { ICarbonActions, ICarbonTypes };
