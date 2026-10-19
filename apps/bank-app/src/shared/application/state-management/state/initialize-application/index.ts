import { Email } from '@clean-rn/auth/domain';
import { IAuthStackPages } from '../../../../presentation/types';

export interface IInitializationState {
  pending: boolean | null;
  email: Email | null;
  initRouteName: IAuthStackPages | undefined;
  houseEmissions: number | undefined;
  averageHouseEmissions: number | undefined;
  transportEmissions: number | undefined;
  averageTransportEmissions: number | undefined;
  foodEmissions: number | undefined;
  averageFoodEmissions: number | undefined;
  flyEmissions: number | undefined;
  averageFlyEmissions: number | undefined;
}
