/* eslint-disable  @typescript-eslint/no-explicit-any */
import { takeEvery } from 'redux-saga/effects';
import { testSaga } from 'redux-saga-test-plan';
import Constants from 'expo-constants';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { HttpConnection, ServerError } from '@clean-rn/shared/infrastructure';
import { Email, User } from '@clean-rn/auth/domain';
import { DeviceApi } from '@clean-rn/device/infrastructure';
import { Device } from '@clean-rn/device/domain';

import { showUnknownError } from '../../../../shared/application/commands/manage-global-errors';
import { navigate } from '../../../../shared/presentation/navigation/navigationRef';
import { IAuthStackPages } from '../../../../shared/presentation/types';

import { selectUserFromLogin } from '../../../../kyc/application/state-management/selectors';

import { registerDeviceGenerator, registerDeviceSaga } from '../../usecases/register-device';
import { IDeviceTypes, initializeDevice, deviceRegistered } from '../../commands';

describe('Device - usecase', () => {
  const httpConnection = HttpConnection.getInstance(Constants.expoConfig?.extra?.BASE_URL_API);
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

  const mockError401 = {
    statusCode: 401,
    message: 'Unauthorized',
    response: {
      statusCode: 401,
      message: 'Unauthorized',
    },
    timestamp: '2023-10-03T13:20:21.303Z',
    path: '/app/account',
    method: 'GET',
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
      .select(selectUserFromLogin)
      .next(user)
      .call([deviceApi, deviceApi.createDevice], mockData)
      .next(device)
      .put(deviceRegistered(device))
      .next(device);
  });

  it('Should call showUnknownError action if 401', () => {
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
      .select(selectUserFromLogin)
      .next(user)
      .call([deviceApi, deviceApi.createDevice], mockData)
      .throw(new ServerError(mockError401))
      .put(initializeDevice())
      .next()
      .call(navigate, { route: IAuthStackPages.LOGIN })
      .next();
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
      .select(selectUserFromLogin)
      .next(user)
      .call([deviceApi, deviceApi.createDevice], mockData)
      .throw(new ServerError(mockError500))
      .put(initializeDevice())
      .next()
      .put(showUnknownError(new ServerError(mockError500)))
      .next();
  });
});
