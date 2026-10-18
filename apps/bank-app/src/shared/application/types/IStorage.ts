import { Email } from '@clean-rn/auth/domain';

export type IStorage = {
  token: string | null;
  email: Email | null;
  signupStep: string | null;
  houseEmissions: number | null;
  averageHouseEmissions: number | null;
  foodEmissions: number | null;
  averageFoodEmissions: number | null;
  transportEmissions: number | null;
  averageTransportEmissions: number | null;
  flyEmissions: number | null;
  averageFlyEmissions: number | null;
};
