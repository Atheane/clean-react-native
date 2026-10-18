import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Sentry from '@sentry/react-native';

import { Logger } from '@clean-rn/logger';
import { StorageError } from './errors';

export async function getItemFromStore(key: string): Promise<string> {
  try {
    const value = await AsyncStorage.getItem(key);
    if (value) {
      return value;
    }
    throw new StorageError.GetError('No value found');
  } catch (e) {
    const storageError = new StorageError.GetError(e);
    Sentry.captureException(storageError);
    Logger.getInstance().error(storageError);
    throw storageError;
  }
}

export async function storeItem(key: string, item: string): Promise<void> {
  try {
    await AsyncStorage.setItem(key, item);
  } catch (e) {
    const storageError = new StorageError.SetError(e);
    Sentry.captureException(storageError);
    Logger.getInstance().error(storageError);
    throw storageError;
  }
}
