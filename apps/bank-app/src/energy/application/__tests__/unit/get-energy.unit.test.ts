/* eslint-disable  @typescript-eslint/no-explicit-any */
import { takeEvery } from 'redux-saga/effects';
import { testSaga } from 'redux-saga-test-plan';

import { DomainEventManager, domainEventManager } from '@clean-rn/ddd';
import { HttpConnection } from '@clean-rn/shared/infrastructure';
import {
  Energy,
  ENERGY_EVENTS,
  MEASUREMENT_UNIT,
  PRICE_COMFORT_DATA_GRANULARITY,
  PRICE_COMFORT_TYPE,
} from '@clean-rn/energy/domain';

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
  mockPricesComfort,
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
      console.log('Event émis:', eventName);
      console.log('Data:', JSON.stringify(data, null, 2));
      return true;
    });
  });

  afterEach(() => {
    jest.resetAllMocks();
    jest.clearAllMocks();
  });

  it('Should wait for GET_ENERGY action and call getEnergyGenerator, should be done on next iteration', () => {
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
      .call([api, api.getRewards])
      .next(1234)
      .call([api, api.getPriceComfort])
      .next(mockPricesComfort)
      .call([api, api.getSensors])
      .next(mockSensorsCO2AndHumidity)
      .call([api, api.getMeasurement], mockSensorsCO2AndHumidity[0].type)
      .next(mockMeasurementCO2)
      .call([api, api.getMeasurement], mockSensorsCO2AndHumidity[1].type)
      .next(mockMeasurementHumidity);

    expect(domainManagerInstance.emit<Energy>).toHaveBeenCalledWith(
      ENERGY_EVENTS.TOTAL_REWARDS_UPDATED,
      expect.objectContaining({
        properties: expect.objectContaining({
          userId: mockUser.id,
          totalRewards: 1234,
        }),
      }),
    );

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
    expect(domainManagerInstance.emit<Energy>).toHaveBeenCalledWith(
      ENERGY_EVENTS.PRICES_COMFORT_ADDED,
      expect.objectContaining({
        properties: expect.objectContaining({
          userId: mockUser.id,
          heatingPriceComfort: expect.objectContaining({
            type: PRICE_COMFORT_TYPE.HEATING,
            granularity: PRICE_COMFORT_DATA_GRANULARITY.DAILY,
            value: expect.objectContaining({
              incremental: 1480.2069375871483,
              average: 17006.343627221664,
            }),
          }),
          globalPriceComfort: expect.objectContaining({
            type: PRICE_COMFORT_TYPE.ALL,
            granularity: PRICE_COMFORT_DATA_GRANULARITY.DAILY,
            value: expect.objectContaining({
              incremental: 1480.2069375871483,
              average: 17006.343627221664,
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
      .call([api, api.getRewards])
      .next(0)
      .call([api, api.getPriceComfort])
      .next(mockPricesComfort)
      .call([api, api.getSensors])
      .next([]);

    // Premier événement : ENERGY_CREATED
    expect(domainEventManager.emit).toHaveBeenNthCalledWith(
      1,
      ENERGY_EVENTS.ENERGY_CREATED,
      expect.objectContaining({
        properties: expect.objectContaining({
          userId: mockUser.id,
        }),
      }),
    );

    // Deuxième événement : TOTAL_REWARDS_SET
    expect(domainEventManager.emit).toHaveBeenNthCalledWith(
      2,
      ENERGY_EVENTS.TOTAL_REWARDS_UPDATED,
      expect.objectContaining({
        properties: expect.objectContaining({
          userId: mockUser.id,
          totalRewards: 0,
        }),
      }),
    );

    // Troisième événement : PRICES_COMFORT_ADDED
    expect(domainEventManager.emit).toHaveBeenNthCalledWith(
      3,
      ENERGY_EVENTS.PRICES_COMFORT_ADDED,
      expect.objectContaining({
        properties: expect.objectContaining({
          userId: mockUser.id,
          heatingPriceComfort: expect.objectContaining({
            type: PRICE_COMFORT_TYPE.HEATING,
            granularity: PRICE_COMFORT_DATA_GRANULARITY.DAILY,
            value: expect.objectContaining({
              incremental: 1480.2069375871483,
              average: 17006.343627221664,
            }),
          }),
        }),
      }),
    );

    // Quatrième événement : SENSORS_CHECKED
    expect(domainEventManager.emit).toHaveBeenNthCalledWith(
      4,
      ENERGY_EVENTS.SENSORS_CHECKED,
      expect.objectContaining({
        properties: expect.objectContaining({
          userId: mockUser.id,
          sensors: expect.arrayContaining([]),
        }),
      }),
    );

    expect(domainEventManager.emit).toHaveBeenCalledTimes(4);
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
