import { HouseT, VehicleConsumptionT, FoodConsumptionT, FlightI } from '@bank/carbon-weight/dist';

export interface ICarbonState {
  pending: boolean;
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
}
