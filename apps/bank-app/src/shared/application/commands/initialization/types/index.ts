import { Email } from '@clean-rn/auth/domain';

export enum IInitializationTypes {
  INITIALIZE_APPLICATION = 'INITIALIZE_APPLICATION',
  INITIALIZE_APPLICATION_SUCCEDED = 'INITIALIZE_APPLICATION_SUCCEDED',
}

export type IInitialization = {
  type: typeof IInitializationTypes.INITIALIZE_APPLICATION;
};

export type IInitializationSucceded = {
  type: typeof IInitializationTypes.INITIALIZE_APPLICATION_SUCCEDED;
  payload: Email | null;
};

export type IInitializationActions = IInitialization | IInitializationSucceded;
