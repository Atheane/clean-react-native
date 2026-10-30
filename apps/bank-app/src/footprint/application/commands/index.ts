import { FlightI, FoodConsumptionT, HouseT, VehicleConsumptionT } from '@bank/carbon-weight/dist';

import {
  IFootprintActions,
  IFootprintTypes,
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
  IHouseCreated,
  IHeatersAdded,
  IAddHeaters,
  IHeatersNotAdded,
  IInitializeFootprint,
  IGetHouse,
} from './types';
import { House, IFootprintErrorCodes, IFootprintErrorMessage } from '@clean-rn/footprint/domain';
import { IHeaterProps } from '../../presentation/types';
import { IDomainError } from '@clean-rn/ddd';

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

export const initializeFootprint = (): IInitializeFootprint => ({
  type: IFootprintTypes.INITIALIZE_FOOTPRINT,
});

export const getHouse = (): IGetHouse => ({
  type: IFootprintTypes.GET_HOUSE,
});

export { IFootprintActions, IFootprintTypes };
