import { Email } from '@clean-rn/auth/domain';
import { IAuthStackPages } from '../../../../../shared/presentation/types';

export enum IInitializationTypes {
  INITIALIZE_APPLICATION = 'INITIALIZE_APPLICATION',
  APPLICATION_INITIALIZED = 'APPLICATION_INITIALIZED',
}

export type IInitialization = {
  type: typeof IInitializationTypes.INITIALIZE_APPLICATION;
  payload?: boolean;
};

export type IInitializationSucceded = {
  type: typeof IInitializationTypes.APPLICATION_INITIALIZED;
  payload: {
    email?: Email;
    initRouteName?: IAuthStackPages;
  };
};

export type IInitializationActions = IInitialization | IInitializationSucceded;
