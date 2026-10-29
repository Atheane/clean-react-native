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

export const applicationInitialized = (payload: { email: Email | null }): IInitializationSucceded => ({
  type: IInitializationTypes.APPLICATION_INITIALIZED,
  payload,
});

export { IInitializationTypes, IInitializationActions };
