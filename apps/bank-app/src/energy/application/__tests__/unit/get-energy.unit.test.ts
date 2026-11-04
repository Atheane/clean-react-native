/* eslint-disable  @typescript-eslint/no-explicit-any */
import { takeEvery } from 'redux-saga/effects';
import { testSaga } from 'redux-saga-test-plan';

import { DomainEventManager, domainEventManager } from '@clean-rn/ddd';
import { HttpConnection } from '@clean-rn/shared/infrastructure';
import { Energy, ENERGY_EVENTS, MEASUREMENT_UNIT } from '@clean-rn/energy/domain';

import { EnergyApi } from '@clean-rn/energy/infrastructure';

import { getEnergySaga, getEnergyGenerator } from '../../usecases/get-energy';
import { IEnergyTypes, initializeEnergy } from '../../commands';

import { ensureTokenRefreshed } from '../../../../shared/application/usecases/ensureTokenRefreshed';
import { showUnknownError } from '../../../../shared/application/commands/manage-global-errors';
import { selectUser } from '../../../../user/application/state-management/selectors';

import { createMockHttpConnection, mockInfrastructure } from '../helpers/setup';
import {
  mockUser,
  mockSensorsCO2AndHumidity,
  mockMeasurementCO2,
  mockMeasurementHumidity,
} from '../fixtures/mock-data';
import { selectEnergy } from '../../state-management/selectors';

describe('GetEnergy - usecase', () => {
  let httpConnection: HttpConnection;
  let api: EnergyApi;
  const mockEnergy = Energy.Create({ userId: mockUser.id });
  const domainManagerInstance = DomainEventManager.getInstance();

  beforeEach(() => {
    httpConnection = createMockHttpConnection();
    mockInfrastructure();
    api = EnergyApi.getInstance(httpConnection);
    jest.spyOn(domainManagerInstance, 'emit').mockImplementation((eventName: string, data: Energy) => {
      console.log('Mock emit called with:', eventName, data);
    });
  });

  afterEach(() => {
    jest.resetAllMocks();
    jest.clearAllMocks();
  });

  it('Should wait for GET_ENERGY action and call getHouseGenerator, should be done on next iteration', () => {
    const genObject = getEnergySaga(httpConnection);
    expect(genObject.next().value).toEqual(
      takeEvery(IEnergyTypes.GET_ENERGY, getEnergyGenerator, httpConnection),
    );
    expect(genObject.next().done).toBeTruthy();
  });

  it('Should getEnergy if it exists and populate it with existing sensors and measurements', async () => {
    testSaga(getEnergyGenerator, httpConnection)
      .next()
      .call(ensureTokenRefreshed, httpConnection)
      .next()
      .select(selectUser)
      .next(mockUser)
      .select(selectEnergy)
      .next(mockEnergy)
      .call([api, api.getSensors])
      .next(mockSensorsCO2AndHumidity)
      .call([api, api.getMeasurement], mockSensorsCO2AndHumidity[0].type)
      .next(mockMeasurementCO2)
      .call([api, api.getMeasurement], mockSensorsCO2AndHumidity[1].type)
      .next(mockMeasurementHumidity);

    expect(domainManagerInstance.emit<Energy>).toHaveBeenCalledWith(
      ENERGY_EVENTS.SENSORS_CHECKED,
      expect.objectContaining({
        properties: expect.objectContaining({
          userId: mockUser.id,
          sensors: expect.arrayContaining(mockSensorsCO2AndHumidity),
        }),
      }),
    );
    expect(domainManagerInstance.emit<Energy>).toHaveBeenCalledWith(
      ENERGY_EVENTS.CO2_ADDED,
      expect.objectContaining({
        properties: expect.objectContaining({
          userId: mockUser.id,
          measurements: expect.objectContaining({
            [mockSensorsCO2AndHumidity[0].type]: expect.objectContaining({
              average: mockMeasurementCO2.average,
              unit: MEASUREMENT_UNIT.PPM,
            }),
          }),
        }),
      }),
    );
    expect(domainManagerInstance.emit<Energy>).toHaveBeenCalledWith(
      ENERGY_EVENTS.HUMIDITY_ADDED,
      expect.objectContaining({
        properties: expect.objectContaining({
          userId: mockUser.id,
          measurements: expect.objectContaining({
            [mockSensorsCO2AndHumidity[1].type]: expect.objectContaining({
              average: mockMeasurementHumidity.average,
              unit: MEASUREMENT_UNIT.PERCENTAGE,
            }),
          }),
        }),
      }),
    );
  });

  it('Should createEnergy if it does not exists', () => {
    testSaga(getEnergyGenerator, httpConnection)
      .next()
      .call(ensureTokenRefreshed, httpConnection)
      .next()
      .select(selectUser)
      .next(mockUser)
      .select(selectEnergy)
      .next(null)
      .call([api, api.getSensors])
      .next([]);

    // check the first call (ENERGY_CREATED)
    expect(domainEventManager.emit).toHaveBeenNthCalledWith(
      1,
      ENERGY_EVENTS.ENERGY_CREATED,
      expect.objectContaining({
        properties: expect.objectContaining({
          userId: mockUser.id,
        }),
      }),
    );

    // check the second call (SENSORS_CHECKED)
    expect(domainEventManager.emit).toHaveBeenNthCalledWith(
      2,
      ENERGY_EVENTS.SENSORS_CHECKED,
      expect.objectContaining({
        properties: expect.objectContaining({
          userId: mockUser.id,
          sensors: expect.arrayContaining([]),
        }),
      }),
    );

    expect(domainEventManager.emit).toHaveBeenCalledTimes(2);
  });

  it('Should call showUnknownError action if unknown error', () => {
    testSaga(getEnergyGenerator, httpConnection)
      .next()
      .throw(new Error('unknown error'))
      .put(initializeEnergy())
      .next()
      .put(showUnknownError(new Error('unknown error')))
      .next();
  });
});
