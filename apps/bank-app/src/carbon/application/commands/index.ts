import { FlightI, FoodConsumptionT, HouseT, VehicleConsumptionT } from '@bank/carbon-weight/dist';

import {
  ICarbonActions,
  ICarbonTypes,
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
  IInitializeCarbon,
  IGetHouse,
} from './types';
import { House, ICarbonErrorCodes, ICarbonErrorMessage } from '@clean-rn/carbon/domain';
import { IHeaterProps } from '../../presentation/types';
import { IDomainError } from '@clean-rn/ddd';

// commands
export const computeHouseEmissions = (
  payload: HouseT & { consumption: number } & { builtYear: number },
): IComputeHouseEmissions => ({
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

export const computeTransportEmissions = (payload: VehicleConsumptionT): IComputeTransportEmissions => ({
  type: ICarbonTypes.COMPUTE_TRANSPORT_EMISSIONS,
  payload,
});

export const initializeTransportEmissions = (): IInitializeTransportEmissions => ({
  type: ICarbonTypes.INITIALIZE_TRANSPORT_EMISSIONS,
});

// domainEvents
export const transportEmissionsComputed = (payload: {
  footprint: number;
  average: number;
}): ITransportEmissionsComputed => ({
  type: ICarbonTypes.TRANSPORT_EMISSIONS_COMPUTED,
  payload,
});

export const computeFoodEmissions = (payload: FoodConsumptionT): IComputeFoodEmissions => ({
  type: ICarbonTypes.COMPUTE_FOOD_EMISSIONS,
  payload,
});

export const initializeFoodEmissions = (): IInitializeFoodEmissions => ({
  type: ICarbonTypes.INITIALIZE_FOOD_EMISSIONS,
});

// domainEvents
export const foodEmissionsComputed = (payload: {
  footprint: number;
  average: number;
}): IFoodEmissionsComputed => ({
  type: ICarbonTypes.FOOD_EMISSIONS_COMPUTED,
  payload,
});

export const computeFlyEmissions = (payload: FlightI[]): IComputeFlyEmissions => ({
  type: ICarbonTypes.COMPUTE_FLY_EMISSIONS,
  payload,
});

export const initializeFlyEmissions = (): IInitializeFlyEmissions => ({
  type: ICarbonTypes.INITIALIZE_FLY_EMISSIONS,
});

// domainEvents
export const flyEmissionsComputed = (payload: {
  footprint: number;
  average: number;
}): IFlyEmissionsComputed => ({
  type: ICarbonTypes.FLY_EMISSIONS_COMPUTED,
  payload,
});

export const houseCreated = (payload: House): IHouseCreated => ({
  type: ICarbonTypes.HOUSE_CREATED,
  payload,
});

export const addHeaters = (payload: IHeaterProps): IAddHeaters => ({
  type: ICarbonTypes.ADD_HEATERS,
  payload,
});

export const heatersAdded = (payload: House): IHeatersAdded => ({
  type: ICarbonTypes.HEATERS_ADDED,
  payload,
});

export const heatersNotAdded = (
  payload: IDomainError<ICarbonErrorCodes, ICarbonErrorMessage>,
): IHeatersNotAdded => ({
  type: ICarbonTypes.HEATERS_NOT_ADDED,
  payload,
});

export const initializeCarbon = (): IInitializeCarbon => ({
  type: ICarbonTypes.INITIALIZE_CARBON,
});

export const getHouse = (): IGetHouse => ({
  type: ICarbonTypes.GET_HOUSE,
});

export { ICarbonActions, ICarbonTypes };
