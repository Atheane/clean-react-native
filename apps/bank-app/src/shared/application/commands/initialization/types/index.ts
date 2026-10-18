import { Email } from '@clean-rn/auth/domain';
import { IAuthStackPages } from '../../../../../shared/presentation/types';

export enum IInitializationTypes {
  INITIALIZE_APPLICATION = 'INITIALIZE_APPLICATION',
  APPLICATION_INITIALIZED = 'APPLICATION_INITIALIZED',
  LOAD_STORAGE = 'LOAD_STORAGE',
  STORAGE_LOADED = 'STORAGE_LOADED',
}

export type IInitialization = {
  type: typeof IInitializationTypes.INITIALIZE_APPLICATION;
};

export type IInitializationSucceded = {
  type: typeof IInitializationTypes.APPLICATION_INITIALIZED;
  payload: {
    email: Email | null;
    initRouteName: IAuthStackPages;
  };
};

export type ILoadStorage = {
  type: typeof IInitializationTypes.LOAD_STORAGE;
};

export type IStorageLoaded = {
  type: typeof IInitializationTypes.STORAGE_LOADED;
  payload: {
    email: Email | null;
  };
};

export type IInitializationActions =
  | IInitialization
  | IInitializationSucceded
  | ILoadStorage
  | IStorageLoaded;
