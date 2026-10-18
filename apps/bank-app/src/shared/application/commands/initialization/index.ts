import { Email } from '@clean-rn/auth/domain';
import {
  IInitializationTypes,
  IInitializationActions,
  IInitialization,
  IInitializationSucceded,
} from './types';
import { IAuthStackPages } from '../../../../shared/presentation/types';

export const initializeApplication = (): IInitialization => ({
  type: IInitializationTypes.INITIALIZE_APPLICATION,
});

export const initializeApplicationSuccess = (payload: {
  email?: Email;
  initRouteName?: IAuthStackPages;
}): IInitializationSucceded => ({
  type: IInitializationTypes.APPLICATION_INITIALIZED,
  payload,
});

export { IInitializationTypes, IInitializationActions };
