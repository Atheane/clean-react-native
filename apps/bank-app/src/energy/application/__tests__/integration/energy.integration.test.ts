import SagaTester from 'redux-saga-tester';
import { setupServer } from 'msw/node';
import { http, HttpResponse } from 'msw';
import fs from 'fs';

import { HttpConnection } from '@clean-rn/shared/infrastructure';
import { createDomainEventsMiddleware } from '../../../../shared/application/state-management/middleware/domain-events.middleware';
import { energyReducer } from '../../state-management/reducer';
import { authReducer } from '../../../../auth/application/state-management';
import { userReducer } from '../../../../user/application/state-management';
import {
  getEnergy,
  initializeEnergy,
  IEnergyTypes,
  getQuiz,
  checkAnswer,
  computeRewards,
} from '../../commands';
import { getEnergySaga } from '../../usecases/get-energy';
import { energyDomainEventsConfig } from '../../state-management/domain-events.config';
import {
  authUser,
  getSensors,
  getMeasurementTemperature,
  getMeasurementHumidity,
  getMeasurementCO2,
  getPriceComfort,
  getRewards,
  getQuiz as getQuizFixture,
  checkAnswerFailed as checkAnswerFailedFixture,
  checkAnswerSuccess as checkAnswerSuccessFixture,
} from '../fixtures/generate-fixtures';
import { getQuizSaga } from '../../usecases/get-quiz';
import { checkAnswerSaga } from '../../usecases/check-answer';
import { computeRewardsSaga } from '../../usecases/compute-rewards';

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

  if (!fs.existsSync(fixtureDir + '/get-price-comfort.json')) {
    await getPriceComfort(httpConnection);
  }

  if (!fs.existsSync(fixtureDir + '/get-rewards.json')) {
    await getRewards(httpConnection);
  }

  if (!fs.existsSync(fixtureDir + '/get-quiz.json')) {
    await getQuizFixture(httpConnection);
  }

  if (!fs.existsSync(fixtureDir + '/check-answer-failed.json')) {
    await checkAnswerFailedFixture(httpConnection);
  }

  if (!fs.existsSync(fixtureDir + '/check-answer-success.json')) {
    await checkAnswerSuccessFixture(httpConnection);
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
    getPriceComfort: JSON.parse(fs.readFileSync(fixtureDir + '/get-price-comfort.json', 'utf8')),
    getRewards: JSON.parse(fs.readFileSync(fixtureDir + '/get-rewards.json', 'utf8')),
    getQuiz: JSON.parse(fs.readFileSync(fixtureDir + '/get-quiz.json', 'utf8')),
    checkAnswerFailed: JSON.parse(fs.readFileSync(fixtureDir + '/check-answer-failed.json', 'utf8')),
    checkAnswerSuccess: JSON.parse(fs.readFileSync(fixtureDir + '/check-answer-success.json', 'utf8')),
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

  it('Should trigger ENERGY_DOMAIN_EVENT when sensors, measurements and price comfort are retrieved successfully', async () => {
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
      http.get('*/app/energy-app/reward/stats', () => {
        return HttpResponse.json({
          rewardTotal: 1234,
        });
      }),
      http.get('*/app/energy-app/sensor/temperature', () => {
        return HttpResponse.json(fixtures.getMeasurementTemperature);
      }),
      http.get('*/app/energy-app/sensor/relativeHumidity', () => {
        return HttpResponse.json(fixtures.getMeasurementHumidity);
      }),
      http.get('*/app/energy-app/core/comfort-price', () => {
        return HttpResponse.json(fixtures.getPriceComfort);
      }),
    );

    sagaTester.start(getEnergySaga, httpConnection);
    sagaTester.dispatch(getEnergy());

    // Attendre juste un tick pour laisser le temps au reducer de mettre à jour l'état
    await new Promise((resolve) => setTimeout(resolve, 0));

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
              type: expect.any(String),
            }),
          ]),
          totalRewards: 1234,
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
          globalPriceComfort: expect.objectContaining({
            endDate: expect.any(String),
            granularity: 'DAILY',
            intercept: expect.any(Number),
            slope: expect.any(Number),
            startDate: expect.any(String),
            temperature: expect.any(Number),
            type: 'ALL',
          }),
          heatingPriceComfort: expect.objectContaining({
            endDate: expect.any(String),
            granularity: 'DAILY',
            intercept: expect.any(Number),
            slope: expect.any(Number),
            startDate: expect.any(String),
            temperature: expect.any(Number),
            type: 'HEATING',
          }),
          coolingPriceComfort: undefined,
        },
      }),
    });

    const calledActions = sagaTester.getCalledActions();
    expect(calledActions).toContainEqual(getEnergy());
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

  it('Should handle quiz retrieval successfully', async () => {
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
      http.get('*/app/energy-app/reward/stats', () => {
        return HttpResponse.json({
          rewardTotal: 0,
        });
      }),
      http.get('*/app/energy-app/sensor/temperature', () => {
        return HttpResponse.json(fixtures.getMeasurementTemperature);
      }),
      http.get('*/app/energy-app/sensor/relativeHumidity', () => {
        return HttpResponse.json(fixtures.getMeasurementHumidity);
      }),
      http.get('*/app/energy-app/core/comfort-price', () => {
        return HttpResponse.json(fixtures.getPriceComfort);
      }),
      http.get('*/app/energy-app/quiz', () => {
        return HttpResponse.json(fixtures.getQuiz);
      }),
    );

    sagaTester.start(getEnergySaga, httpConnection);
    sagaTester.dispatch(getEnergy());
    sagaTester.start(getQuizSaga, httpConnection);
    sagaTester.dispatch(getQuiz());

    await new Promise((resolve) => setTimeout(resolve, 0));

    const state = sagaTester.getState();

    expect(state.energy.energy).toMatchObject({
      id: expect.any(String),
      properties: {
        sensors: expect.arrayContaining([expect.any(Object)]),
        totalRewards: 0,
        userId: '123',
        currentQuiz: expect.objectContaining({
          id: expect.any(String),
          properties: expect.objectContaining({
            quizId: expect.any(String),
            theme: expect.any(String),
            reward: expect.any(Number),
            question: expect.any(String),
            difficulty: expect.any(String),
            intros: expect.arrayContaining([expect.any(String)]),
            choices: expect.arrayContaining([expect.any(String)]),
          }),
        }),
      },
    });
  });

  it('Should handle quiz answer failed', async () => {
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
      http.get('*/app/energy-app/reward/stats', () => {
        return HttpResponse.json({
          rewardTotal: 0,
        });
      }),
      http.get('*/app/energy-app/sensor/temperature', () => {
        return HttpResponse.json(fixtures.getMeasurementTemperature);
      }),
      http.get('*/app/energy-app/sensor/relativeHumidity', () => {
        return HttpResponse.json(fixtures.getMeasurementHumidity);
      }),
      http.get('*/app/energy-app/core/comfort-price', () => {
        return HttpResponse.json(fixtures.getPriceComfort);
      }),
      http.get('*/app/energy-app/quiz', () => {
        return HttpResponse.json(fixtures.getQuiz);
      }),
      http.post('*/app/energy-app/quiz/answer', () => {
        return HttpResponse.json(fixtures.checkAnswerFailed);
      }),
    );

    sagaTester.start(getEnergySaga, httpConnection);
    sagaTester.start(getQuizSaga, httpConnection);
    sagaTester.start(checkAnswerSaga, httpConnection);

    sagaTester.dispatch(getEnergy());
    await new Promise((resolve) => setTimeout(resolve, 500));
    sagaTester.dispatch(getQuiz());
    await new Promise((resolve) => setTimeout(resolve, 500));
    sagaTester.dispatch(checkAnswer({ quizId: '92885687', answerIdx: 1 }));
    await new Promise((resolve) => setTimeout(resolve, 500));
    const state = sagaTester.getState();

    expect(state.energy.energy).toMatchObject({
      id: expect.any(String),
      properties: {
        currentQuiz: expect.objectContaining({
          id: expect.any(String),
          properties: expect.objectContaining({
            quizId: expect.any(String),
            theme: expect.any(String),
            reward: expect.any(Number),
            question: expect.any(String),
            difficulty: expect.any(String),
            intros: expect.arrayContaining([expect.any(String)]),
            choices: expect.arrayContaining([expect.any(String)]),
          }),
        }),
        currentAnswerIsCorrect: false,
        totalRewards: 0,
      },
    });
  });

  it('Should handle quiz answer success', async () => {
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
      http.get('*/app/energy-app/reward/stats', () => {
        return HttpResponse.json({
          rewardTotal: 0,
        });
      }),
      http.get('*/app/energy-app/sensor/temperature', () => {
        return HttpResponse.json(fixtures.getMeasurementTemperature);
      }),
      http.get('*/app/energy-app/sensor/relativeHumidity', () => {
        return HttpResponse.json(fixtures.getMeasurementHumidity);
      }),
      http.get('*/app/energy-app/core/comfort-price', () => {
        return HttpResponse.json(fixtures.getPriceComfort);
      }),
      http.get('*/app/energy-app/quiz', () => {
        return HttpResponse.json(fixtures.getQuiz);
      }),
      http.post('*/app/energy-app/quiz/answer', () => {
        return HttpResponse.json(fixtures.checkAnswerSuccess);
      }),
    );

    sagaTester.start(getEnergySaga, httpConnection);
    sagaTester.start(getQuizSaga, httpConnection);
    sagaTester.start(checkAnswerSaga, httpConnection);

    sagaTester.dispatch(getEnergy());
    await new Promise((resolve) => setTimeout(resolve, 500));
    sagaTester.dispatch(getQuiz());
    await new Promise((resolve) => setTimeout(resolve, 500));
    sagaTester.dispatch(checkAnswer({ quizId: '92885687', answerIdx: 2 }));
    await new Promise((resolve) => setTimeout(resolve, 500));
    const state = sagaTester.getState();

    expect(state.energy.energy).toMatchObject({
      id: expect.any(String),
      properties: {
        currentQuiz: expect.objectContaining({
          id: expect.any(String),
          properties: expect.objectContaining({
            quizId: expect.any(String),
            theme: expect.any(String),
            reward: expect.any(Number),
            question: expect.any(String),
            difficulty: expect.any(String),
            intros: expect.arrayContaining([expect.any(String)]),
            choices: expect.arrayContaining([expect.any(String)]),
          }),
        }),
        currentAnswerIsCorrect: true,
        totalRewards: 0,
      },
    });
  });

  it('Should handle compute rewards when answer is correct', async () => {
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
      http.get('*/app/energy-app/reward/stats', () => {
        return HttpResponse.json({
          rewardTotal: 0,
        });
      }),
      http.get('*/app/energy-app/sensor/temperature', () => {
        return HttpResponse.json(fixtures.getMeasurementTemperature);
      }),
      http.get('*/app/energy-app/sensor/relativeHumidity', () => {
        return HttpResponse.json(fixtures.getMeasurementHumidity);
      }),
      http.get('*/app/energy-app/core/comfort-price', () => {
        return HttpResponse.json(fixtures.getPriceComfort);
      }),
      http.get('*/app/energy-app/quiz', () => {
        return HttpResponse.json(fixtures.getQuiz);
      }),
      http.post('*/app/energy-app/quiz/answer', () => {
        return HttpResponse.json(fixtures.checkAnswerSuccess);
      }),
    );

    sagaTester.start(getEnergySaga, httpConnection);
    sagaTester.start(getQuizSaga, httpConnection);
    sagaTester.start(checkAnswerSaga, httpConnection);
    sagaTester.start(computeRewardsSaga, httpConnection);

    sagaTester.dispatch(getEnergy());
    await new Promise((resolve) => setTimeout(resolve, 500));
    sagaTester.dispatch(getQuiz());
    await new Promise((resolve) => setTimeout(resolve, 500));
    sagaTester.dispatch(checkAnswer({ quizId: '92885687', answerIdx: 2 }));
    await new Promise((resolve) => setTimeout(resolve, 500));
    sagaTester.dispatch(computeRewards());
    await new Promise((resolve) => setTimeout(resolve, 500));
    const state = sagaTester.getState();

    expect(state.energy.energy).toMatchObject({
      id: expect.any(String),
      properties: {
        currentQuiz: undefined,
        currentAnswerIsCorrect: true,
        totalRewards: 0.5,
      },
    });
  });

  it('Should handle compute rewards when answer is incorrect', async () => {
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
      http.get('*/app/energy-app/reward/stats', () => {
        return HttpResponse.json({
          rewardTotal: 0,
        });
      }),
      http.get('*/app/energy-app/sensor/temperature', () => {
        return HttpResponse.json(fixtures.getMeasurementTemperature);
      }),
      http.get('*/app/energy-app/sensor/relativeHumidity', () => {
        return HttpResponse.json(fixtures.getMeasurementHumidity);
      }),
      http.get('*/app/energy-app/core/comfort-price', () => {
        return HttpResponse.json(fixtures.getPriceComfort);
      }),
      http.get('*/app/energy-app/quiz', () => {
        return HttpResponse.json(fixtures.getQuiz);
      }),
      http.post('*/app/energy-app/quiz/answer', () => {
        return HttpResponse.json(fixtures.checkAnswerFailed);
      }),
    );

    sagaTester.start(getEnergySaga, httpConnection);
    sagaTester.start(getQuizSaga, httpConnection);
    sagaTester.start(checkAnswerSaga, httpConnection);
    sagaTester.start(computeRewardsSaga, httpConnection);

    sagaTester.dispatch(getEnergy());
    await new Promise((resolve) => setTimeout(resolve, 500));
    sagaTester.dispatch(getQuiz());
    await new Promise((resolve) => setTimeout(resolve, 500));
    sagaTester.dispatch(checkAnswer({ quizId: '92885687', answerIdx: 1 }));
    await new Promise((resolve) => setTimeout(resolve, 500));
    sagaTester.dispatch(computeRewards());
    await new Promise((resolve) => setTimeout(resolve, 500));
    const state = sagaTester.getState();

    expect(state.energy.energy).toMatchObject({
      id: expect.any(String),
      properties: {
        currentQuiz: undefined,
        currentAnswerIsCorrect: false,
        totalRewards: 0,
      },
    });
  });
});
