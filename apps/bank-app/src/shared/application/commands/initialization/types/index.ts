import { Email } from '@clean-rn/auth/domain';

export enum IInitializationTypes {
  INITIALIZE_APPLICATION = 'INITIALIZE_APPLICATION',
  INITIALIZE_APPLICATION_SUCCEDED = 'INITIALIZE_APPLICATION_SUCCEDED',
  INITIALIZE_APPLICATION_FAILED = 'INITIALIZE_APPLICATION_FAILED',
}

export type IInitialization = {
  type: typeof IInitializationTypes.INITIALIZE_APPLICATION;
};

export type IInitializationSucceded = {
  type: typeof IInitializationTypes.INITIALIZE_APPLICATION_SUCCEDED;
  payload: {
    email: Email;
  };
};

export type IInitializationFailed = {
  type: typeof IInitializationTypes.INITIALIZE_APPLICATION_FAILED;
  payload: {
    error: Error | unknown;
  };
};

export type IInitializationActions = IInitialization | IInitializationSucceded | IInitializationFailed;
