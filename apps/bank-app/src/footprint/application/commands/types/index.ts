import { IDomainError } from '@clean-rn/ddd';
import { HouseT, VehicleConsumptionT, FoodConsumptionT, FlightI } from '@bank/carbon-weight/dist';
import { House, IFootprintErrorCodes, IFootprintErrorMessage, Footprint } from '@clean-rn/footprint/domain';
import { IFootprintProps, IHeaterProps } from '../../../presentation/types';

export enum IFootprintTypes {
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
  CREATE_FOOTPRINT = 'CREATE_FOOTPRINT',
  FOOTPRINT_CREATED = 'FOOTPRINT_CREATED',
  FOOTPRINT_NOT_CREATED = 'FOOTPRINT_NOT_CREATED',
  INITIALIZE_FOOTPRINT = 'INITIALIZE_FOOTPRINT',
}

export type IComputeHouseEmissions = {
  type: typeof IFootprintTypes.COMPUTE_HOUSE_EMISSIONS;
  payload: HouseT & { consumption: number } & { builtYear: number };
};

export type IHouseEmissionsComputed = {
  type: typeof IFootprintTypes.HOUSE_EMISSIONS_COMPUTED;
  payload: {
    footprint: number;
    average: number;
  };
};

export type IInitializeHouseEmissions = {
  type: typeof IFootprintTypes.INITIALIZE_HOUSE_EMISSIONS;
};

export type IComputeTransportEmissions = {
  type: typeof IFootprintTypes.COMPUTE_TRANSPORT_EMISSIONS;
  payload: VehicleConsumptionT;
};

export type ITransportEmissionsComputed = {
  type: typeof IFootprintTypes.TRANSPORT_EMISSIONS_COMPUTED;
  payload: {
    footprint: number;
    average: number;
  };
};

export type IInitializeTransportEmissions = {
  type: typeof IFootprintTypes.INITIALIZE_TRANSPORT_EMISSIONS;
};

export type IComputeFoodEmissions = {
  type: typeof IFootprintTypes.COMPUTE_FOOD_EMISSIONS;
  payload: FoodConsumptionT;
};

export type IFoodEmissionsComputed = {
  type: typeof IFootprintTypes.FOOD_EMISSIONS_COMPUTED;
  payload: {
    footprint: number;
    average: number;
  };
};

export type IInitializeFoodEmissions = {
  type: typeof IFootprintTypes.INITIALIZE_FOOD_EMISSIONS;
};

export type IComputeFlyEmissions = {
  type: typeof IFootprintTypes.COMPUTE_FLY_EMISSIONS;
  payload: FlightI[];
};

export type IFlyEmissionsComputed = {
  type: typeof IFootprintTypes.FLY_EMISSIONS_COMPUTED;
  payload: {
    footprint: number;
    average: number;
  };
};

export type IInitializeFlyEmissions = {
  type: typeof IFootprintTypes.INITIALIZE_FLY_EMISSIONS;
};

export type IAddHeaters = {
  type: typeof IFootprintTypes.ADD_HEATERS;
  payload: IHeaterProps;
};

export type IHeatersAdded = {
  type: typeof IFootprintTypes.HEATERS_ADDED;
  payload: House;
};

export type IHeatersNotAdded = {
  type: typeof IFootprintTypes.HEATERS_NOT_ADDED;
  payload: IDomainError<IFootprintErrorCodes, IFootprintErrorMessage>;
};

export type IInitializeFootprint = {
  type: typeof IFootprintTypes.INITIALIZE_FOOTPRINT;
};

export type IGetHouse = {
  type: typeof IFootprintTypes.GET_HOUSE;
};

export type IHouseCreated = {
  type: typeof IFootprintTypes.HOUSE_CREATED;
  payload: House;
};

export type ICreateFootprint = {
  type: typeof IFootprintTypes.CREATE_FOOTPRINT;
  payload: IFootprintProps;
};

export type IFootprintCreated = {
  type: typeof IFootprintTypes.FOOTPRINT_CREATED;
  payload: Footprint;
};

export type IFootprintNotCreated = {
  type: typeof IFootprintTypes.FOOTPRINT_NOT_CREATED;
  payload: IDomainError<IFootprintErrorCodes, IFootprintErrorMessage>;
};

export type IFootprintActions =
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
  | IInitializeFootprint
  | IGetHouse
  | ICreateFootprint
  | IFootprintCreated
  | IFootprintNotCreated;
