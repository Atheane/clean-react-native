/* eslint-disable  @typescript-eslint/no-explicit-any */
import { takeEvery } from 'redux-saga/effects';
import { testSaga } from 'redux-saga-test-plan';

import { HttpConnection, ServerError } from '@clean-rn/shared/infrastructure';
import { Email } from '@clean-rn/auth/domain';
import { User } from '@clean-rn/user/domain';
import { DeviceApi } from '@clean-rn/device/infrastructure';
import { Device } from '@clean-rn/device/domain';

import { showUnknownError } from '../../../../shared/application/commands/manage-global-errors';

import { selectUser } from '../../../../user/application/state-management/selectors';

import { registerDeviceGenerator, registerDeviceSaga } from '../../usecases/register-device';
import { IDeviceTypes, deviceRegistered, resetError } from '../../commands';

jest.mock('@clean-rn/shared/infrastructure', () => ({
  HttpConnection: {
    getInstance: jest.fn(),
  },
  ServerError: jest.fn().mockImplementation(function (error) {
    this.message = error.message;
    this.name = 'ServerError';
    this.statusCode = error.statusCode;
    this.codeError = error.codeError;
    this.cause = error.response;
  }),
}));

describe('Device - usecase', () => {
  let httpConnection: HttpConnection;
  let deviceApi: DeviceApi;

  beforeEach(() => {
    httpConnection = {
      baseUrl: 'http://mock-api.com',
      options: jest.fn(),
      handleError: jest.fn(),
      getDefaultHeaders: jest.fn(),
      attachBearerToken: jest.fn(),
    };
    HttpConnection.getInstance.mockReturnValue(httpConnection);
    global.fetch = jest.fn();
    deviceApi = DeviceApi.getInstance(httpConnection);
  });

  afterEach(() => {
    jest.resetAllMocks();
    jest.clearAllMocks();
  });

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
    const genObject = registerDeviceSaga(httpConnection);

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
      .call([deviceApi, deviceApi.createDevice], mockData)
      .next(device)
      .put(deviceRegistered(device))
      .next(device);
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
      .call([deviceApi, deviceApi.createDevice], mockData)
      .throw(new ServerError(mockError500))
      .put(resetError())
      .next()
      .put(showUnknownError(new ServerError(mockError500)))
      .next();
  });
});
