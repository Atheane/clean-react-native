/* eslint-disable @typescript-eslint/no-explicit-any  */
/* eslint-disable no-fallthrough */
import { call, put, StrictEffect, takeEvery, cancel, select } from 'redux-saga/effects';

import { DeviceError, IRegisterDeviceCommand } from '@clean-rn/device/domain';
import { HttpConnection, ServerError } from '@clean-rn/shared/infrastructure';
import { DeviceApi } from '@clean-rn/device/infrastructure';

import { navigate } from '../../../../shared/presentation/navigation/navigationRef';
import { IAuthStackPages } from '../../../../shared/presentation/types';
import { showUnknownError } from '../../../../shared/application/commands/manage-global-errors';

import {
  IDeviceTypes,
  deviceAlreadyRegistered,
  deviceRegistered,
  initializeDevice,
} from '../../../../device/application/commands';

import { selectUser } from '../../../../user/application/state-management/selectors';

export function* registerDeviceSaga(httpConnection: HttpConnection): Generator<StrictEffect, any, any> {
  yield takeEvery(IDeviceTypes.FETCH_REGISTER_DEVICE, registerDeviceGenerator, httpConnection);
}

export function* registerDeviceGenerator(
  httpConnection: HttpConnection,
  {
    payload,
  }: {
    type: string;
    payload: IRegisterDeviceCommand & { deviceId: string; firebaseId?: string; appVersion: string };
  },
): Generator<StrictEffect, any, any> {
  try {
    const user = yield select(selectUser);

    // call app/device POST endpoint
    const deviceApi = DeviceApi.getInstance(httpConnection);
    const device = yield call([deviceApi, deviceApi.createDevice], {
      ...payload,
      userId: parseInt(user.id),
    });

    yield put(deviceRegistered(device));
  } catch (error: unknown) {
    if (error instanceof ServerError && error.statusCode === 400) {
      yield put(deviceAlreadyRegistered({ error: new DeviceError.AlreadyRegistered(error) }));
      yield cancel();
    } else if (error instanceof ServerError && error.statusCode === 401) {
      yield call(navigate, { route: IAuthStackPages.LOGIN });
      yield cancel();
    }
    yield put(initializeDevice());
    yield put(showUnknownError(error as Error));
  }
}
