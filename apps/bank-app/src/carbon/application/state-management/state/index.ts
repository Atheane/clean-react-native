import { HouseT } from '@bank/carbon-weight/dist';

export interface ICarbonState {
  pending: boolean;
  house: {
    data: (HouseT & { consumption: number }) | null;
    footprint: number | null;
    average: number | null;
  };
  transport: {
    data: null;
    footprint: number | null;
    average: number | null;
  };
  food: {
    data: null;
    footprint: number | null;
    average: number | null;
  };
  fly: {
    data: null;
    footprint: number | null;
    average: number | null;
  };
}
