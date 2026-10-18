import { Email } from '@clean-rn/auth/domain';

export interface IStorageState {
  token: string | null;
  email: Email | null;
  signupStep: number | null;
  houseEmissions: number | null;
  averageHouseEmissions: number | null;
  foodEmissions: number | null;
  averageFoodEmissions: number | null;
  transportEmissions: number | null;
  averageTransportEmissions: number | null;
  flyEmissions: number | null;
  averageFlyEmissions: number | null;
  loaded: boolean | null;
}
