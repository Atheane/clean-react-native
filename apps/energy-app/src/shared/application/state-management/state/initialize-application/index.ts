import { Email } from '@clean-rn/auth/domain';
import { IRoutes } from '../../../../presentation/types';

export interface IInitializationState {
  pending: boolean | null;
  email: Email | null;
  initRouteName: IRoutes | undefined;
  carbon: {
    house: {
      footprint: number | null;
      average: number | null;
    };
    transport: {
      footprint: number | null;
      average: number | null;
    };
    food: {
      footprint: number | null;
      average: number | null;
    };
    fly: {
      footprint: number | null;
      average: number | null;
    };
  };
}
