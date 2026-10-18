import { Email } from '@clean-rn/auth/domain';
import {
  IInitializationTypes,
  IInitializationActions,
  IInitialization,
  IInitializationSucceded,
} from './types';

export const initializeApplication = (): IInitialization => ({
  type: IInitializationTypes.INITIALIZE_APPLICATION,
});

export const initializeApplicationSuccess = (payload: Email | null): IInitializationSucceded => ({
  type: IInitializationTypes.INITIALIZE_APPLICATION_SUCCEDED,
  payload,
});

export { IInitializationTypes, IInitializationActions };
