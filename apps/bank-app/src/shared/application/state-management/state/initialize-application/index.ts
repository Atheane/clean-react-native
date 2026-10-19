import { Email } from '@clean-rn/auth/domain';
import { IAuthStackPages } from '../../../../presentation/types';

export interface IInitializationState {
  pending: boolean | null;
  email: Email | null;
  initRouteName: IAuthStackPages | undefined;
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
