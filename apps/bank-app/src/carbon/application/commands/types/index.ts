import { HouseT } from '@bank/carbon-weight/dist';

export enum ICarbonTypes {
  COMPUTE_HOUSE_EMISSIONS = 'COMPUTE_HOUSE_EMISSIONS',
  HOUSE_EMISSIONS_COMPUTED = 'HOUSE_EMISSIONS_COMPUTED',
  INITIALIZE_HOUSE_EMISSIONS = 'INITIALIZE_HOUSE_EMISSIONS',
}

export type IComputeHouseEmissions = {
  type: typeof ICarbonTypes.COMPUTE_HOUSE_EMISSIONS;
  payload: HouseT & { consumption: number };
};

export type IHouseEmissionsComputed = {
  type: typeof ICarbonTypes.HOUSE_EMISSIONS_COMPUTED;
  payload: {
    footprint: number;
    average: number;
  };
};

export type IInitializeHouseEmissions = {
  type: typeof ICarbonTypes.INITIALIZE_HOUSE_EMISSIONS;
};

export type ICarbonActions = IComputeHouseEmissions | IHouseEmissionsComputed | IInitializeHouseEmissions;
