import SagaTester from 'redux-saga-tester';
import { setupServer } from 'msw/node';
import { http, HttpResponse } from 'msw';
import fs from 'fs';

import { HttpConnection } from '@clean-rn/shared/infrastructure';
import { createDomainEventsMiddleware } from '../../../../shared/application/state-management/middleware/domain-events.middleware';
import { energyReducer } from '../../state-management/reducer';
import { authReducer } from '../../../../auth/application/state-management';
import { userReducer } from '../../../../user/application/state-management';
import { getEnergy, initializeEnergy, IEnergyTypes } from '../../commands';
import { getEnergySaga } from '../../usecases/get-energy';
import { energyDomainEventsConfig } from '../../state-management/domain-events.config';
import {
  authUser,
  getSensors,
  getMeasurementTemperature,
  getMeasurementHumidity,
  getMeasurementCO2,
} from '../fixtures/generate-fixtures';

const httpConnection = HttpConnection.getInstance(
  process.env?.EXPO_PUBLIC_BASE_URL_API || 'https://sandbox.example.com',
);

const server = setupServer();

const setupFixtures = async (httpConnection: HttpConnection) => {
  const fixtureDir = __dirname + '/../fixtures';

  if (!fs.existsSync(fixtureDir)) {
    fs.mkdirSync(fixtureDir, { recursive: true });
  }

  if (!fs.existsSync(fixtureDir + '/auth.json')) {
    await authUser(httpConnection);
  }

  if (!fs.existsSync(fixtureDir + '/get-sensors.json')) {
    await getSensors(httpConnection);
  }

  if (!fs.existsSync(fixtureDir + '/get-measurement-temperature.json')) {
    await getMeasurementTemperature(httpConnection);
  }

  if (!fs.existsSync(fixtureDir + '/get-measurement-humidity.json')) {
    await getMeasurementHumidity(httpConnection);
  }

  if (!fs.existsSync(fixtureDir + '/get-measurement-co2-error404.json')) {
    await getMeasurementCO2(httpConnection);
  }

  const fixtures = {
    auth: JSON.parse(fs.readFileSync(fixtureDir + '/auth.json', 'utf8')),
    getSensors: JSON.parse(fs.readFileSync(fixtureDir + '/get-sensors.json', 'utf8')),
    getMeasurementTemperature: JSON.parse(
      fs.readFileSync(fixtureDir + '/get-measurement-temperature.json', 'utf8'),
    ),
    getMeasurementHumidity: JSON.parse(
      fs.readFileSync(fixtureDir + '/get-measurement-humidity.json', 'utf8'),
    ),
    getMeasurementCO2: JSON.parse(fs.readFileSync(fixtureDir + '/get-measurement-co2-error404.json', 'utf8')),
    unknownServerError: JSON.parse(fs.readFileSync(fixtureDir + '/unknown-server-error.json', 'utf8')),
  };

  return fixtures;
};

describe('Energy - integration', () => {
  let sagaTester: SagaTester;
  let fixtures: any;
  let realDate: DateConstructor;

  beforeAll(async () => {
    // Fixer la date pour tous les tests
    realDate = global.Date;
    const currentDate = new Date('2024-01-01T00:00:00.000Z');
    global.Date = class extends Date {
      constructor(date?: any) {
        if (date) {
          return new realDate(date);
        }
        return currentDate;
      }
      static now() {
        return currentDate.getTime();
      }
    } as DateConstructor;

    fixtures = await setupFixtures(httpConnection);
    server.listen();
  });

  beforeEach(() => {
    const initialState = {
      auth: {
        auth: {
          accessToken: fixtures.auth.accessToken,
          refreshToken: fixtures.auth.refreshToken,
        },
      },
      user: {
        user: {
          id: '123',
        },
      },
      energy: {
        pending: false,
        energy: null,
        error: null,
      },
    };

    const domainEventsMiddleware = createDomainEventsMiddleware({
      energy: energyDomainEventsConfig.energy,
    });

    sagaTester = new SagaTester({
      initialState,
      reducers: {
        auth: authReducer,
        user: userReducer,
        energy: energyReducer,
      },
      middlewares: [domainEventsMiddleware],
    });
  });

  afterEach(() => server.resetHandlers());
  afterAll(() => {
    // Restaurer la vraie date
    global.Date = realDate;
    server.close();
  });

  it('Should trigger ENERGY_DOMAIN_EVENT when sensors and measurements are retrieved successfully', async () => {
    server.use(
      http.get('*/auth/refresh', () => {
        return HttpResponse.json({
          accessToken: 'new-fake-token',
          refreshToken: 'new-fake-refresh-token',
          expiresIn: 3600,
        });
      }),
      http.get('*/app/energy-app/sensor', () => {
        return HttpResponse.json(fixtures.getSensors);
      }),
      http.get('*/app/energy-app/sensor/temperature', () => {
        return HttpResponse.json(fixtures.getMeasurementTemperature);
      }),
      http.get('*/app/energy-app/sensor/relativeHumidity', () => {
        return HttpResponse.json(fixtures.getMeasurementHumidity);
      }),
    );

    const allEventsPromise = new Promise<void>((resolve) => {
      const unsubscribe = sagaTester.store.subscribe(() => {
        const actions = sagaTester.getCalledActions();
        const domainEvents = actions.filter((a) => a.type === IEnergyTypes.ENERGY_DOMAIN_EVENT);
        if (domainEvents.length === 4) {
          unsubscribe();
          resolve();
        }
      });
    });

    sagaTester.start(getEnergySaga, httpConnection);
    sagaTester.dispatch(getEnergy());

    await allEventsPromise;

    const state = sagaTester.getState();
    expect(state.energy).toMatchObject({
      pending: false,
      error: null,
      energy: expect.objectContaining({
        id: expect.any(String),
        properties: {
          userId: '123',
          sensors: expect.arrayContaining([
            expect.objectContaining({
              roomId: expect.any(Number),
              startDate: expect.any(String),
              type: expect.stringMatching(/TEMPERATURE|HUMIDITY/),
            }),
          ]),
          measurements: {
            TEMPERATURE: expect.objectContaining({
              average: expect.any(Number),
              data: expect.arrayContaining([
                expect.objectContaining({
                  observedAt: expect.any(String),
                  unit: 'CELCIUS',
                  value: expect.any(Number),
                }),
              ]),
              observedAt: expect.any(String),
              unit: 'CELCIUS',
            }),
            HUMIDITY: expect.objectContaining({
              average: expect.any(Number),
              data: expect.arrayContaining([
                expect.objectContaining({
                  observedAt: expect.any(String),
                  unit: 'PERCENTAGE',
                  value: expect.any(Number),
                }),
              ]),
              observedAt: expect.any(String),
              unit: 'PERCENTAGE',
            }),
          },
        },
      }),
    });

    const calledActions = sagaTester.getCalledActions();
    const domainEvents = calledActions.filter((action) => action.type === IEnergyTypes.ENERGY_DOMAIN_EVENT);

    expect(calledActions).toContainEqual(getEnergy());
    expect(domainEvents).toHaveLength(4);
  });

  it('Should trigger INITIALIZE_ENERGY when server returns error 500', async () => {
    // S'assurer que toutes les requêtes retournent 500
    server.use(
      http.get('*/app/energy-app/sensor', () => {
        return new HttpResponse(JSON.stringify(fixtures.unknownServerError), {
          status: 500,
          statusText: 'Server Error',
          headers: {
            'Content-Type': 'application/json',
          },
        });
      }),
      http.get('*/auth/refresh', () => {
        return HttpResponse.json(fixtures.auth);
      }),
    );

    const errorPromise = new Promise<void>((resolve) => {
      const unsubscribe = sagaTester.store.subscribe(() => {
        const actions = sagaTester.getCalledActions();
        if (actions.some((action) => action.type === IEnergyTypes.INITIALIZE_ENERGY)) {
          unsubscribe();
          resolve();
        }
      });
    });

    sagaTester.start(getEnergySaga, httpConnection);
    sagaTester.dispatch(getEnergy());

    await errorPromise;

    expect(sagaTester.getState().energy).toEqual({
      pending: false,
      energy: null,
      error: null,
    });

    const calledActions = sagaTester.getCalledActions();
    expect(calledActions).toContainEqual(getEnergy());
    expect(calledActions).toContainEqual(initializeEnergy());
  });
});
