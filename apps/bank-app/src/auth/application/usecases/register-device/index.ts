/* eslint-disable @typescript-eslint/no-explicit-any  */
/* eslint-disable no-fallthrough */
import { call, put, StrictEffect, takeEvery, cancel, select } from 'redux-saga/effects';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Constants from 'expo-constants';

import { Logger } from '@clean-rn/logger';
import { Device, IRegisterDeviceCommand } from '@clean-rn/auth/domain';
import { HttpConnection, ServerError } from '@clean-rn/shared/infrastructure';

import { navigate } from '../../../../shared/presentation/navigation/navigationRef';
import { IAuthStackPages } from '../../../../shared/presentation/types';
import { showUnknownError } from '../../../../shared/application/commands/manage-global-errors';
import { IStoreKey } from '../../../../shared/application/types';

import { ISignupTypes, deviceRegistered } from '../../../../auth/application/commands/signup';

import { resetError } from '../../commands/login';
import { selectUserFromLogin } from '../../../../kyc/application/state-management/selectors';

export function* registerDeviceSaga(httpConnection: HttpConnection): Generator<StrictEffect, any, any> {
  yield takeEvery(ISignupTypes.FETCH_REGISTER_DEVICE, registerDeviceGenerator, httpConnection);
}

export function* registerDeviceGenerator(
  httpConnection: HttpConnection,
  {
    payload,
  }: {
    type: string;
    payload: IRegisterDeviceCommand & { deviceId: string } & { firebaseToken?: string };
  },
): Generator<StrictEffect, any, any> {
  try {
    Logger.getInstance().info(ISignupTypes.FETCH_REGISTER_DEVICE);
    const user = yield select(selectUserFromLogin);
    const device = Device.Create({ deviceId: payload.deviceId, userId: user.id });
    device.registerDeviceProperties({
      brand: payload.brand,
      model: payload.model,
      os: payload.os,
      osVersion: payload.osVersion,
    });
    if (payload.firebaseToken) {
      device.connectToNotifications(payload.firebaseToken);
    }
    device.addAppVersion(Constants.expoConfig?.extra?.APP_VERSION);
    const deviceId = yield call(AsyncStorage.getItem, IStoreKey.DEVICE_ID);

    if (!deviceId) {
      const deviceApi = DeviceApi.getInstance(httpConnection);
      yield call([deviceApi, deviceApi.registerDevice], device);
      yield call(AsyncStorage.setItem, IStoreKey.DEVICE_ID, device.id);
    }
    yield put(deviceRegistered(device));
  } catch (error: unknown) {
    yield put(resetError());
    if (error instanceof ServerError && error.statusCode === 401) {
      yield call(navigate, { route: IAuthStackPages.LOGIN });
      yield cancel();
    }
    yield put(showUnknownError(error as Error));
  }
}
