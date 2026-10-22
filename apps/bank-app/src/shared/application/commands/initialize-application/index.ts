import { Email } from '@clean-rn/auth/domain';
import {
  IInitializationTypes,
  IInitializationActions,
  IInitialization,
  IInitializationSucceded,
  IStorageLoaded,
  ILoadStorage,
} from './types';
import { IRoutes } from '../../../../shared/presentation/types';

export const initializeApplication = (): IInitialization => ({
  type: IInitializationTypes.INITIALIZE_APPLICATION,
});

export const applicationInitialized = (payload: {
  email: Email | null;
  initRouteName: IRoutes;
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
}): IInitializationSucceded => ({
  type: IInitializationTypes.APPLICATION_INITIALIZED,
  payload,
});

export const loadStorage = (): ILoadStorage => ({
  type: IInitializationTypes.LOAD_STORAGE,
});

export const storageLoaded = (payload: { email: Email | null }): IStorageLoaded => ({
  type: IInitializationTypes.STORAGE_LOADED,
  payload,
});

export { IInitializationTypes, IInitializationActions };
