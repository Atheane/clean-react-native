import { IDomainError } from '@clean-rn/ddd';
import { HouseT, VehicleConsumptionT, FoodConsumptionT, FlightI } from '@bank/carbon-weight/dist';
import {
  House,
  IFootprintErrorCodes,
  IFootprintErrorMessage,
  Footprint,
  Transport,
} from '@clean-rn/footprint/domain';
import { IHeaterProps, IWorksProps, IVehiclesProps, IHouseholdProps } from '../../../presentation/types';

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
  // Footprint
  GET_FOOTPRINT = 'GET_FOOTPRINT',
  FOOTPRINT_NOTFOUND = 'FOOTPRINT_NOTFOUND',
  CREATE_FOOTPRINT = 'CREATE_FOOTPRINT',
  FOOTPRINT_CREATED = 'FOOTPRINT_CREATED',
  FOOTPRINT_NOT_CREATED = 'FOOTPRINT_NOT_CREATED',
  INITIALIZE_FOOTPRINT = 'INITIALIZE_FOOTPRINT',
  // Register heaters, works, transport, household for primeum
  // House
  GET_HOUSE = 'GET_HOUSE',
  HOUSE_CREATED = 'HOUSE_CREATED',
  ADD_HEATERS = 'ADD_HEATERS',
  HEATERS_ADDED = 'HEATERS_ADDED',
  HEATERS_NOT_ADDED = 'HEATERS_NOT_ADDED',
  ADD_WORKS = 'ADD_WORKS',
  WORKS_ADDED = 'WORKS_ADDED',
  WORKS_NOT_ADDED = 'WORKS_NOT_ADDED',
  // Transport
  GET_TRANSPORT = 'GET_TRANSPORT',
  TRANSPORT_CREATED = 'TRANSPORT_CREATED',
  ADD_VEHICLES = 'ADD_VEHICLES',
  VEHICLES_ADDED = 'VEHICLES_ADDED',
  VEHICLES_NOT_ADDED = 'VEHICLES_NOT_ADDED',
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

export type IInitializeFootprint = {
  type: typeof IFootprintTypes.INITIALIZE_FOOTPRINT;
};

// Footprint
export type IGetFootprint = {
  type: typeof IFootprintTypes.GET_FOOTPRINT;
};

export type IFootprintNotFound = {
  type: typeof IFootprintTypes.FOOTPRINT_NOTFOUND;
};

export type ICreateFootprint = {
  type: typeof IFootprintTypes.CREATE_FOOTPRINT;
  payload: IHouseholdProps;
};

export type IFootprintCreated = {
  type: typeof IFootprintTypes.FOOTPRINT_CREATED;
  payload: Footprint;
};

export type IFootprintNotCreated = {
  type: typeof IFootprintTypes.FOOTPRINT_NOT_CREATED;
  payload: IDomainError<IFootprintErrorCodes, IFootprintErrorMessage>;
};

// House
export type IGetHouse = {
  type: typeof IFootprintTypes.GET_HOUSE;
};

export type IHouseCreated = {
  type: typeof IFootprintTypes.HOUSE_CREATED;
  payload: House;
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

export type IAddWorks = {
  type: typeof IFootprintTypes.ADD_WORKS;
  payload: IWorksProps;
};

export type IWorksAdded = {
  type: typeof IFootprintTypes.WORKS_ADDED;
  payload: House;
};

export type IWorksNotAdded = {
  type: typeof IFootprintTypes.WORKS_NOT_ADDED;
  payload: IDomainError<IFootprintErrorCodes, IFootprintErrorMessage>;
};

// Transport
export type IGetTransport = {
  type: typeof IFootprintTypes.GET_TRANSPORT;
};

export type ITransportCreated = {
  type: typeof IFootprintTypes.TRANSPORT_CREATED;
  payload: Transport;
};

export type IAddVehicles = {
  type: typeof IFootprintTypes.ADD_VEHICLES;
  payload: IVehiclesProps;
};

export type IVehiclesAdded = {
  type: typeof IFootprintTypes.VEHICLES_ADDED;
  payload: Transport;
};

export type IVehiclesNotAdded = {
  type: typeof IFootprintTypes.VEHICLES_NOT_ADDED;
  payload: IDomainError<IFootprintErrorCodes, IFootprintErrorMessage>;
};

export type IFootprintActions =
  // Estimates
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
  // FootPrint
  | IGetFootprint
  | IFootprintNotFound
  | ICreateFootprint
  | IFootprintCreated
  | IFootprintNotCreated
  | IInitializeFootprint
  // House
  | IGetHouse
  | IHouseCreated
  | IAddHeaters
  | IHeatersAdded
  | IHeatersNotAdded
  | IAddWorks
  | IWorksAdded
  | IWorksNotAdded
  // Transport
  | IGetTransport
  | ITransportCreated
  | IAddVehicles
  | IVehiclesAdded
  | IVehiclesNotAdded;
