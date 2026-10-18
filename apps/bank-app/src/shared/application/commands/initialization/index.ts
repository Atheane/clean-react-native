import { Email } from '@clean-rn/auth/domain';
import {
  IInitializationTypes,
  IInitializationActions,
  IInitialization,
  IInitializationSucceded,
  IInitializationFailed,
} from './types';

export const initializeApplication = (): IInitialization => ({
  type: IInitializationTypes.INITIALIZE_APPLICATION,
});

export const initializeApplicationSucceded = (payload: { email: Email }): IInitializationSucceded => ({
  type: IInitializationTypes.INITIALIZE_APPLICATION_SUCCEDED,
  payload,
});

export const initializeApplicationFailed = (payload: { error: Error | unknown }): IInitializationFailed => ({
  type: IInitializationTypes.INITIALIZE_APPLICATION_FAILED,
  payload,
});

export { IInitializationTypes, IInitializationActions };
