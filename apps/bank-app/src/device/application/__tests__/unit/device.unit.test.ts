/* eslint-disable  @typescript-eslint/no-explicit-any */
import { takeEvery } from 'redux-saga/effects';
import { testSaga } from 'redux-saga-test-plan';

import AsyncStorage from '@react-native-async-storage/async-storage';
import { HttpConnection, ServerError } from '@clean-rn/shared/infrastructure';
import { Email } from '@clean-rn/auth/domain';
import { User } from '@clean-rn/user/domain';
import { DeviceApi } from '@clean-rn/device/infrastructure';
import { Device, DeviceError } from '@clean-rn/device/domain';

import { showUnknownError } from '../../../../shared/application/commands/manage-global-errors';

import { selectUser } from '../../../../user/application/state-management/selectors';

import { registerDeviceGenerator, registerDeviceSaga } from '../../usecases/register-device';
import { IDeviceTypes, deviceRegistered, deviceAlreadyRegistered, resetError } from '../../commands';
import { IStoreKey } from '../../../../shared/application/types';

describe('Device - usecase', () => {
  const httpConnection = HttpConnection.getInstance(process.env.EXPO_PUBLIC_BASE_URL_API || '');
  const deviceApi = DeviceApi.getInstance(httpConnection);

  const genObject = registerDeviceSaga(httpConnection);

  const mockData = {
    deviceId: '0e909aa1933d3fed',
    appVersion: '1.7.0',
    brand: 'OPPO',
    firebaseId: 'fake-firebase-id',
    model: 'lahaina',
    os: 'android',
    osVersion: '1',
    userId: 100000352,
  };

  const mockError500 = {
    message: 'Core::AuthService::Auth - Server Error',
    statusCode: 500,
    response: 'Core::AuthService::Auth - Server Error',
    timestamp: '2023-04-07T15:28:04.657Z',
    path: '/auth/login',
  };

  it('should wait for FETCH_REGISTER_DEVICE action and call resetPasswordApiSaga, should be done on next iteration', () => {
    expect(genObject.next().value).toEqual(
      takeEvery(IDeviceTypes.FETCH_REGISTER_DEVICE, registerDeviceGenerator, httpConnection),
    );
    expect(genObject.next().done).toBeTruthy();
  });

  it('should call deviceRegistered if first registration', () => {
    const user = User.Create({
      id: mockData.userId,
      properties: {
        email: new Email('test@test.com'),
      },
    });
    const device = Device.Create({ deviceId: mockData.deviceId, userId: mockData.userId.toString() });
    device.registerDeviceProperties({
      brand: mockData.brand,
      model: mockData.model,
      os: mockData.os,
      osVersion: mockData.osVersion,
    });
    device.addAppVersion(mockData.appVersion);
    device.connectToNotifications(mockData.firebaseId);

    testSaga(registerDeviceGenerator, httpConnection, {
      type: IDeviceTypes.FETCH_REGISTER_DEVICE,
      payload: mockData,
    })
      .next()
      .select(selectUser)
      .next(user)
      .call(AsyncStorage.getItem, IStoreKey.DEVICE_ID)
      .next(null)
      .call([deviceApi, deviceApi.createDevice], mockData)
      .next(device)
      .put(deviceRegistered(device))
      .next(device)
      .call(AsyncStorage.setItem, IStoreKey.DEVICE_ID, device.id)
      .next();
  });

  it('Should call deviceAlreadyRegistered if device exists in AsyncStorage', () => {
    const user = User.Create({
      id: mockData.userId,
      properties: {
        email: new Email('test@test.com'),
      },
    });
    const device = Device.Create({ deviceId: mockData.deviceId, userId: mockData.userId.toString() });
    device.registerDeviceProperties({
      brand: mockData.brand,
      model: mockData.model,
      os: mockData.os,
      osVersion: mockData.osVersion,
    });
    device.addAppVersion(mockData.appVersion);
    device.connectToNotifications(mockData.firebaseId);

    testSaga(registerDeviceGenerator, httpConnection, {
      type: IDeviceTypes.FETCH_REGISTER_DEVICE,
      payload: mockData,
    })
      .next()
      .select(selectUser)
      .next(user)
      .call(AsyncStorage.getItem, IStoreKey.DEVICE_ID)
      .next(device.id)
      .put(deviceAlreadyRegistered({ error: new DeviceError.AlreadyRegistered(device.id) }))
      .next()
      .cancel();
  });

  it('Should call showUnknownError action if 500', () => {
    const user = User.Create({
      id: mockData.userId,
      properties: {
        email: new Email('test@test.com'),
      },
    });

    testSaga(registerDeviceGenerator, httpConnection, {
      type: IDeviceTypes.FETCH_REGISTER_DEVICE,
      payload: mockData,
    })
      .next()
      .select(selectUser)
      .next(user)
      .call(AsyncStorage.getItem, IStoreKey.DEVICE_ID)
      .next(null)
      .call([deviceApi, deviceApi.createDevice], mockData)
      .throw(new ServerError(mockError500))
      .put(resetError())
      .next()
      .put(showUnknownError(new ServerError(mockError500)))
      .next();
  });
});
