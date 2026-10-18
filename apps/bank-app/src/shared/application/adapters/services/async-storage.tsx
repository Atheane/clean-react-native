import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Sentry from '@sentry/react-native';

import { IAuth, Email } from '@clean-rn/auth/domain';
import { Logger } from '@clean-rn/ui-mobile';
import { StorageError } from '../../../infrastructure/storage/errors';
import { IStorage } from '../../types';

//todo SENTRY
const JWT_ACCESS_TOKEN = '@accesstoken450';
const JWT_REFRESH_TOKEN = '@refreshtoken450';
const USER_EMAIL = '@useremail450';
const SIGNUP_STEP = '@signupstep450';
export const HOUSE_EMISSION = '@houseemissiont450';
export const AVERAGE_HOUSE_EMISSION = '@averagehouseemissiont450';
export const FOOD_EMISSION = '@foodemissiont450';
export const AVERAGE_FOOD_EMISSION = '@averagefoodemissiont450';
export const TRANSPORT_EMISSION = '@transportemissiont450';
export const AVERAGE_TRANSPORT_EMISSION = '@averagetransportemissiont450';
export const FLY_EMISSION = '@flyemissiont450';
export const AVERAGE_FLY_EMISSION = '@averageflyemissiont450';

class Storage {
  private static instance: Storage;

  private constructor() {
    return;
  }

  static getInstance(): Storage {
    if (!Storage.instance) {
      Storage.instance = new Storage();
    }

    return Storage.instance;
  }

  async storeAuth(auth: IAuth): Promise<void> {
    try {
      await AsyncStorage.setItem(JWT_ACCESS_TOKEN, auth.accessToken);
      await AsyncStorage.setItem(JWT_REFRESH_TOKEN, auth.refreshToken);
    } catch (e) {
      const storageError = new StorageError.SetError(e);
      Sentry.captureException(storageError);
      Logger.getInstance().error(storageError);
      throw storageError;
    }
  }

  async storeEmail(email: Email): Promise<void> {
    try {
      await AsyncStorage.setItem(USER_EMAIL, email.value);
    } catch (e) {
      const storageError = new StorageError.SetError(e);
      Sentry.captureException(storageError);
      Logger.getInstance().error(storageError);
      throw storageError;
    }
  }

  async storeSignupStep(step: number): Promise<void> {
    try {
      await AsyncStorage.setItem(SIGNUP_STEP, step.toString());
    } catch (e) {
      const storageError = new StorageError.SetError(e);
      Sentry.captureException(storageError);
      Logger.getInstance().error(storageError);
      throw storageError;
    }
  }

  async storeValue(key: string, value: string): Promise<void> {
    try {
      await AsyncStorage.setItem(key, value);
    } catch (e) {
      const storageError = new StorageError.SetError(e);
      Sentry.captureException(storageError);
      Logger.getInstance().error(storageError);
      throw storageError;
    }
  }

  async getStorage(): Promise<IStorage> {
    const token = await AsyncStorage.getItem(JWT_ACCESS_TOKEN);
    const emailString = await AsyncStorage.getItem(USER_EMAIL);
    const signupStep = await AsyncStorage.getItem(SIGNUP_STEP);
    const houseEmissions = await AsyncStorage.getItem(HOUSE_EMISSION);
    const averageHouseEmissions = await AsyncStorage.getItem(AVERAGE_HOUSE_EMISSION);
    const foodEmissions = await AsyncStorage.getItem(FOOD_EMISSION);
    const averageFoodEmissions = await AsyncStorage.getItem(AVERAGE_FOOD_EMISSION);
    const transportEmissions = await AsyncStorage.getItem(TRANSPORT_EMISSION);
    const averageTransportEmissions = await AsyncStorage.getItem(AVERAGE_TRANSPORT_EMISSION);
    const flyEmissions = await AsyncStorage.getItem(FLY_EMISSION);
    const averageFlyEmissions = await AsyncStorage.getItem(AVERAGE_FLY_EMISSION);

    return {
      token,
      email: emailString ? new Email(emailString) : null,
      signupStep,
      houseEmissions: houseEmissions ? parseInt(houseEmissions) : null,
      averageHouseEmissions: averageHouseEmissions ? parseInt(averageHouseEmissions) : null,
      foodEmissions: foodEmissions ? parseInt(foodEmissions) : null,
      averageFoodEmissions: averageFoodEmissions ? parseInt(averageFoodEmissions) : null,
      transportEmissions: transportEmissions ? parseInt(transportEmissions) : null,
      averageTransportEmissions: averageTransportEmissions ? parseInt(averageTransportEmissions) : null,
      flyEmissions: flyEmissions ? parseInt(flyEmissions) : null,
      averageFlyEmissions: averageFlyEmissions ? parseInt(averageFlyEmissions) : null,
    };
  }
}

export { Storage, StorageError, IStorage, JWT_ACCESS_TOKEN, JWT_REFRESH_TOKEN, USER_EMAIL, SIGNUP_STEP };
