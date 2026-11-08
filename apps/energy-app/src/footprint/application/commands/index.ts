import { FlightI, FoodConsumptionT, HouseT, VehicleConsumptionT } from '@bank/carbon-weight/dist';

import { IDomainError } from '@clean-rn/ddd';
import {
  House,
  IFootprintErrorCodes,
  IFootprintErrorMessage,
  Footprint,
  Transport,
} from '@clean-rn/footprint/domain';
import { IHouseholdProps, IHeaterProps, IVehiclesProps, IWorksProps } from '../../presentation/types';
import {
  IFootprintActions,
  IFootprintTypes,
  // Estimates
  IComputeHouseEmissions,
  IHouseEmissionsComputed,
  IInitializeHouseEmissions,
  IComputeTransportEmissions,
  ITransportEmissionsComputed,
  IInitializeTransportEmissions,
  IComputeFoodEmissions,
  IFoodEmissionsComputed,
  IInitializeFoodEmissions,
  IComputeFlyEmissions,
  IInitializeFlyEmissions,
  IFlyEmissionsComputed,
  // Footprint
  IGetFootprint,
  IFootprintNotFound,
  ICreateFootprint,
  IFootprintCreated,
  IFootprintNotCreated,
  IInitializeFootprint,
  // House
  IGetHouse,
  IHouseCreated,
  IAddHeaters,
  IHeatersAdded,
  IHeatersNotAdded,
  IAddWorks,
  IWorksAdded,
  IWorksNotAdded,
  // Transport
  IGetTransport,
  ITransportCreated,
  IVehiclesAdded,
  IVehiclesNotAdded,
  IAddVehicles,
} from './types';

// -------------------- Estimates
// commands
export const computeHouseEmissions = (
  payload: HouseT & { consumption: number } & { builtYear: number },
): IComputeHouseEmissions => ({
  type: IFootprintTypes.COMPUTE_HOUSE_EMISSIONS,
  payload,
});

export const initializeHouseEmissions = (): IInitializeHouseEmissions => ({
  type: IFootprintTypes.INITIALIZE_HOUSE_EMISSIONS,
});

// domainEvents
export const houseEmissionsComputed = (payload: {
  footprint: number;
  average: number;
}): IHouseEmissionsComputed => ({
  type: IFootprintTypes.HOUSE_EMISSIONS_COMPUTED,
  payload,
});

export const computeTransportEmissions = (payload: VehicleConsumptionT): IComputeTransportEmissions => ({
  type: IFootprintTypes.COMPUTE_TRANSPORT_EMISSIONS,
  payload,
});

export const initializeTransportEmissions = (): IInitializeTransportEmissions => ({
  type: IFootprintTypes.INITIALIZE_TRANSPORT_EMISSIONS,
});

// domainEvents
export const transportEmissionsComputed = (payload: {
  footprint: number;
  average: number;
}): ITransportEmissionsComputed => ({
  type: IFootprintTypes.TRANSPORT_EMISSIONS_COMPUTED,
  payload,
});

export const computeFoodEmissions = (payload: FoodConsumptionT): IComputeFoodEmissions => ({
  type: IFootprintTypes.COMPUTE_FOOD_EMISSIONS,
  payload,
});

export const initializeFoodEmissions = (): IInitializeFoodEmissions => ({
  type: IFootprintTypes.INITIALIZE_FOOD_EMISSIONS,
});

// domainEvents
export const foodEmissionsComputed = (payload: {
  footprint: number;
  average: number;
}): IFoodEmissionsComputed => ({
  type: IFootprintTypes.FOOD_EMISSIONS_COMPUTED,
  payload,
});

export const computeFlyEmissions = (payload: FlightI[]): IComputeFlyEmissions => ({
  type: IFootprintTypes.COMPUTE_FLY_EMISSIONS,
  payload,
});

export const initializeFlyEmissions = (): IInitializeFlyEmissions => ({
  type: IFootprintTypes.INITIALIZE_FLY_EMISSIONS,
});

// domainEvents
export const flyEmissionsComputed = (payload: {
  footprint: number;
  average: number;
}): IFlyEmissionsComputed => ({
  type: IFootprintTypes.FLY_EMISSIONS_COMPUTED,
  payload,
});

// -------------------- Footprint
export const getFootprint = (): IGetFootprint => ({
  type: IFootprintTypes.GET_FOOTPRINT,
});

export const footprintNotFound = (): IFootprintNotFound => ({
  type: IFootprintTypes.FOOTPRINT_NOTFOUND,
});

export const createFootprint = (payload: IHouseholdProps): ICreateFootprint => ({
  type: IFootprintTypes.CREATE_FOOTPRINT,
  payload,
});

export const footprintCreated = (payload: Footprint): IFootprintCreated => ({
  type: IFootprintTypes.FOOTPRINT_CREATED,
  payload,
});

export const footprintNotCreated = (
  payload: IDomainError<IFootprintErrorCodes, IFootprintErrorMessage>,
): IFootprintNotCreated => ({
  type: IFootprintTypes.FOOTPRINT_NOT_CREATED,
  payload,
});
export const initializeFootprint = (): IInitializeFootprint => ({
  type: IFootprintTypes.INITIALIZE_FOOTPRINT,
});

// -------------------- House
export const getHouse = (): IGetHouse => ({
  type: IFootprintTypes.GET_HOUSE,
});

export const houseCreated = (payload: House): IHouseCreated => ({
  type: IFootprintTypes.HOUSE_CREATED,
  payload,
});

export const addHeaters = (payload: IHeaterProps): IAddHeaters => ({
  type: IFootprintTypes.ADD_HEATERS,
  payload,
});

export const heatersAdded = (payload: House): IHeatersAdded => ({
  type: IFootprintTypes.HEATERS_ADDED,
  payload,
});

export const heatersNotAdded = (
  payload: IDomainError<IFootprintErrorCodes, IFootprintErrorMessage>,
): IHeatersNotAdded => ({
  type: IFootprintTypes.HEATERS_NOT_ADDED,
  payload,
});

export const addWorks = (payload: IWorksProps): IAddWorks => ({
  type: IFootprintTypes.ADD_WORKS,
  payload,
});

export const worksAdded = (payload: House): IWorksAdded => ({
  type: IFootprintTypes.WORKS_ADDED,
  payload,
});

export const worksNotAdded = (
  payload: IDomainError<IFootprintErrorCodes, IFootprintErrorMessage>,
): IWorksNotAdded => ({
  type: IFootprintTypes.WORKS_NOT_ADDED,
  payload,
});

// -------------------- Transport
export const getTransport = (): IGetTransport => ({
  type: IFootprintTypes.GET_TRANSPORT,
});

export const transportCreated = (payload: Transport): ITransportCreated => ({
  type: IFootprintTypes.TRANSPORT_CREATED,
  payload,
});

export const addVehicles = (payload: IVehiclesProps): IAddVehicles => ({
  type: IFootprintTypes.ADD_VEHICLES,
  payload,
});

export const vehiclesAdded = (payload: Transport): IVehiclesAdded => ({
  type: IFootprintTypes.VEHICLES_ADDED,
  payload,
});

export const vehiclesNotAdded = (
  payload: IDomainError<IFootprintErrorCodes, IFootprintErrorMessage>,
): IVehiclesNotAdded => ({
  type: IFootprintTypes.VEHICLES_NOT_ADDED,
  payload,
});

export { IFootprintActions, IFootprintTypes };
