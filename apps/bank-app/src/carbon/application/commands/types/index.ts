import { IDomainError } from '@clean-rn/ddd';
import { HouseT, VehicleConsumptionT, FoodConsumptionT, FlightI } from '@bank/carbon-weight/dist';
import { House, ICarbonErrorCodes, ICarbonErrorMessage } from '@clean-rn/carbon/domain';
import { IHeaterProps } from '../../../presentation/types';

export enum ICarbonTypes {
  // Estimate footprint
  COMPUTE_HOUSE_EMISSIONS = 'COMPUTE_HOUSE_EMISSIONS',
  HOUSE_EMISSIONS_COMPUTED = 'HOUSE_EMISSIONS_COMPUTED',
  INITIALIZE_HOUSE_EMISSIONS = 'INITIALIZE_HOUSE_EMISSIONS',
  COMPUTE_TRANSPORT_EMISSIONS = 'COMPUTE_TRANSPORT_EMISSIONS',
  TRANSPORT_EMISSIONS_COMPUTED = 'TRANSPORT_EMISSIONS_COMPUTED',
  INITIALIZE_TRANSPORT_EMISSIONS = 'INITIALIZE_TRANSPORT_EMISSIONS',
  COMPUTE_FOOD_EMISSIONS = 'COMPUTE_FOOD_EMISSIONS',
  FOOD_EMISSIONS_COMPUTED = 'FOOD_EMISSIONS_COMPUTED',
  INITIALIZE_FOOD_EMISSIONS = 'INITIALIZE_FOOD_EMISSIONS',
  COMPUTE_FLY_EMISSIONS = 'COMPUTE_FLY_EMISSIONS',
  FLY_EMISSIONS_COMPUTED = 'FLY_EMISSIONS_COMPUTED',
  INITIALIZE_FLY_EMISSIONS = 'INITIALIZE_FLY_EMISSIONS',
  // Register heaters, works, transport, household for primeum
  GET_HOUSE = 'GET_HOUSE',
  HOUSE_CREATED = 'HOUSE_CREATED',
  ADD_HEATERS = 'ADD_HEATERS',
  HEATERS_ADDED = 'HEATERS_ADDED',
  HEATERS_NOT_ADDED = 'HEATERS_NOT_ADDED',
  INITIALIZE_CARBON = 'INITIALIZE_CARBON',
}

export type IComputeHouseEmissions = {
  type: typeof ICarbonTypes.COMPUTE_HOUSE_EMISSIONS;
  payload: HouseT & { consumption: number } & { builtYear: number };
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

export type IComputeTransportEmissions = {
  type: typeof ICarbonTypes.COMPUTE_TRANSPORT_EMISSIONS;
  payload: VehicleConsumptionT;
};

export type ITransportEmissionsComputed = {
  type: typeof ICarbonTypes.TRANSPORT_EMISSIONS_COMPUTED;
  payload: {
    footprint: number;
    average: number;
  };
};

export type IInitializeTransportEmissions = {
  type: typeof ICarbonTypes.INITIALIZE_TRANSPORT_EMISSIONS;
};

export type IComputeFoodEmissions = {
  type: typeof ICarbonTypes.COMPUTE_FOOD_EMISSIONS;
  payload: FoodConsumptionT;
};

export type IFoodEmissionsComputed = {
  type: typeof ICarbonTypes.FOOD_EMISSIONS_COMPUTED;
  payload: {
    footprint: number;
    average: number;
  };
};

export type IInitializeFoodEmissions = {
  type: typeof ICarbonTypes.INITIALIZE_FOOD_EMISSIONS;
};

export type IComputeFlyEmissions = {
  type: typeof ICarbonTypes.COMPUTE_FLY_EMISSIONS;
  payload: FlightI[];
};

export type IFlyEmissionsComputed = {
  type: typeof ICarbonTypes.FLY_EMISSIONS_COMPUTED;
  payload: {
    footprint: number;
    average: number;
  };
};

export type IInitializeFlyEmissions = {
  type: typeof ICarbonTypes.INITIALIZE_FLY_EMISSIONS;
};

export type IHouseCreated = {
  type: typeof ICarbonTypes.HOUSE_CREATED;
  payload: House;
};

export type IAddHeaters = {
  type: typeof ICarbonTypes.ADD_HEATERS;
  payload: IHeaterProps;
};

export type IHeatersAdded = {
  type: typeof ICarbonTypes.HEATERS_ADDED;
  payload: House;
};

export type IHeatersNotAdded = {
  type: typeof ICarbonTypes.HEATERS_NOT_ADDED;
  payload: IDomainError<ICarbonErrorCodes, ICarbonErrorMessage>;
};

export type IInitializeCarbon = {
  type: typeof ICarbonTypes.INITIALIZE_CARBON;
};

export type IGetHouse = {
  type: typeof ICarbonTypes.GET_HOUSE;
};

export type ICarbonActions =
  | IComputeHouseEmissions
  | IHouseEmissionsComputed
  | IInitializeHouseEmissions
  | IComputeTransportEmissions
  | ITransportEmissionsComputed
  | IInitializeTransportEmissions
  | IComputeFoodEmissions
  | IFoodEmissionsComputed
  | IInitializeFoodEmissions
  | IComputeFlyEmissions
  | IFlyEmissionsComputed
  | IInitializeFlyEmissions
  | IAddHeaters
  | IHeatersAdded
  | IHouseCreated
  | IHeatersNotAdded
  | IInitializeCarbon
  | IGetHouse;
