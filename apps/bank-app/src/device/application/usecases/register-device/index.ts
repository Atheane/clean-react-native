/* eslint-disable @typescript-eslint/no-explicit-any  */
/* eslint-disable no-fallthrough */
import { call, put, StrictEffect, takeEvery, cancel, select } from 'redux-saga/effects';

import { DeviceError, IRegisterDeviceCommand } from '@clean-rn/device/domain';
import { HttpConnection, ServerError } from '@clean-rn/shared/infrastructure';
import { DeviceApi } from '@clean-rn/device/infrastructure';

import { showUnknownError } from '../../../../shared/application/commands/manage-global-errors';

import {
  IDeviceTypes,
  deviceAlreadyRegistered,
  deviceRegistered,
  resetError,
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
    yield put(resetError());
    if (error instanceof ServerError && error.statusCode === 400) {
      yield put(deviceAlreadyRegistered({ error: new DeviceError.AlreadyRegistered(error) }));
      yield cancel();
    }
    yield put(showUnknownError(error as Error));
  }
}
