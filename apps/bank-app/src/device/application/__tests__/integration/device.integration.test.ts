/* eslint-disable  @typescript-eslint/no-explicit-any */
import SagaTester from 'redux-saga-tester';
import Constants from 'expo-constants';

import { registerDeviceSaga } from '../../usecases/register-device';
import {
  IDeviceTypes,
  fetchRegisterDevice,
  initializeDevice,
  deviceRegistered,
  deviceAlreadyRegistered,
} from '../../commands';
import { deviceReducer } from '../../state-management/reducer';
import { HttpConnection } from '@clean-rn/shared/infrastructure';
import { Device, DeviceError } from '@clean-rn/device/domain';

const expoConstantsMock = {
  name: 'CleanRN BankApp Test',
  slug: 'clean-rn-bank-app-test',
  extra: {
    BASE_URL_API: 'https://fake-api.com',
    NODE_ENV: 'test',
  },
};

jest.mock('expo-constants', () => expoConstantsMock);

describe('Device - integration', () => {
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

  let sagaTester: SagaTester;

  let httpConnection: HttpConnection;

  beforeAll(() => {
    Constants.expoConfig = {
      name: 'CleanRN BankApp Test',
      slug: 'clean-rn-bank-app-test',
      extra: {
        BASE_URL_API: 'https://fake-api.com',
        NODE_ENV: 'test',
      },
    };
    httpConnection = HttpConnection.getInstance(Constants.expoConfig?.extra?.BASE_URL_API);
  });

  beforeEach(() => {
    const initialState = {
      pending: false,
      device: null,
      error: null,
    };
    sagaTester = new SagaTester({
      initialState,
      reducers: deviceReducer,
    });
  });

  it('should store correct initial state if no initial state is provided', () => {
    const newState = deviceReducer(undefined, {
      type: IDeviceTypes.FETCH_REGISTER_DEVICE,
      payload: mockData,
    });

    expect(newState).toEqual({
      pending: true,
      device: null,
      error: null,
    });
  });

  it('Should store correct state if INITIALIZE_DEVICE', () => {
    sagaTester.start(registerDeviceSaga, httpConnection);
    sagaTester.dispatch(fetchRegisterDevice(mockData));
    sagaTester.dispatch(initializeDevice());

    expect(sagaTester.getState()).toEqual({
      pending: false,
      device: null,
      error: null,
    });
  });

  it('Should store correct state in case if DEVICE_REGISTERED', () => {
    const device = Device.Create({ deviceId: mockData.deviceId, userId: mockData.userId.toString() });
    device.registerDeviceProperties({
      brand: mockData.brand,
      model: mockData.model,
      os: mockData.os,
      osVersion: mockData.osVersion,
    });
    device.addAppVersion(mockData.appVersion);
    device.connectToNotifications(mockData.firebaseId);

    sagaTester.start(registerDeviceSaga, httpConnection);
    sagaTester.dispatch(fetchRegisterDevice(mockData));
    sagaTester.dispatch(deviceRegistered(device));

    expect(sagaTester.getState()).toEqual({
      pending: false,
      device,
      error: null,
    });
  });

  it('Should store correct state in case if DEVICE_ALREADY_REGISTERED', () => {
    const device = Device.Create({ deviceId: mockData.deviceId, userId: mockData.userId.toString() });
    device.registerDeviceProperties({
      brand: mockData.brand,
      model: mockData.model,
      os: mockData.os,
      osVersion: mockData.osVersion,
    });
    device.addAppVersion(mockData.appVersion);
    device.connectToNotifications(mockData.firebaseId);

    sagaTester.start(registerDeviceSaga, httpConnection);
    sagaTester.dispatch(fetchRegisterDevice(mockData));
    sagaTester.dispatch(
      deviceAlreadyRegistered({ error: new DeviceError.AlreadyRegistered('Device already registered') }),
    );

    expect(sagaTester.getState()).toEqual({
      pending: false,
      device: null,
      error: new DeviceError.AlreadyRegistered('Device already registered'),
    });
  });
});
