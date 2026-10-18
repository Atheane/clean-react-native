import { Email } from '@clean-rn/auth/domain';

export enum IInitializationTypes {
  INITIALIZE_APPLICATION = 'INITIALIZE_APPLICATION',
  APPLICATION_INITIALIZED = 'APPLICATION_INITIALIZED',
}

export type IInitialization = {
  type: typeof IInitializationTypes.INITIALIZE_APPLICATION;
};

export type IInitializationSucceded = {
  type: typeof IInitializationTypes.APPLICATION_INITIALIZED;
  payload: Email | null;
};

export type IInitializationActions = IInitialization | IInitializationSucceded;
