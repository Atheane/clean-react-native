import { HouseT, VehicleConsumptionT, FoodConsumptionT, FlightI } from '@bank/carbon-weight/dist';
import { IDomainError } from '@clean-rn/ddd';
import {
  Footprint,
  House,
  IFootprintErrorCodes,
  IFootprintErrorMessage,
  Transport,
} from '@clean-rn/footprint/domain';

export interface IFootprintState {
  pending: boolean;
  estimate: {
    house: {
      data: (HouseT & { consumption: number } & { builtYear: number }) | null;
      footprint: number | null;
      average: number | null;
    };
    transport: {
      data: VehicleConsumptionT | null;
      footprint: number | null;
      average: number | null;
    };
    food: {
      data: FoodConsumptionT | null;
      footprint: number | null;
      average: number | null;
    };
    fly: {
      data: FlightI[] | null;
      footprint: number | null;
      average: number | null;
    };
  };
  footprint: Footprint | null;
  house: House | null;
  transport: Transport | null;
  error: IDomainError<IFootprintErrorCodes, IFootprintErrorMessage> | null;
}
