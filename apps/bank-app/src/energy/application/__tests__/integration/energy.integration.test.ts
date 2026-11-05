import SagaTester from 'redux-saga-tester';
import { setupServer } from 'msw/node';
import { http, HttpResponse } from 'msw';
import fs from 'fs';

import { HttpConnection } from '@clean-rn/shared/infrastructure';
import { createDomainEventsMiddleware } from '../../../../shared/application/state-management/middleware/domain-events.middleware';
import { energyReducer } from '../../state-management/reducer';
import { authReducer } from '../../../../auth/application/state-management';
import { userReducer } from '../../../../user/application/state-management';
import { getEnergy, initializeEnergy, IEnergyTypes, getQuiz } from '../../commands';
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
} from '../fixtures/generate-fixtures';
import { getQuizSaga } from '../../usecases/get-quiz';

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
      http.get('*/app/energy-app/core/comfort-price*', () => {
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
    const domainEvents = calledActions.filter((action) => action.type === IEnergyTypes.ENERGY_DOMAIN_EVENT);

    expect(calledActions).toContainEqual(getEnergy());
    expect(domainEvents).toHaveLength(6);
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

      http.get('*/app/energy-app/quiz', () => {
        return HttpResponse.json([
          {
            choices: [
              {
                de: '',
                en: 'Decreasing energy consumption',
                es: '',
                fr: "Diminuer la consommation d'énergie",
                gr: '',
                it: '',
                lv: '',
              },
              {
                de: '',
                en: 'Reducing noise pollution',
                es: '',
                fr: 'La réduction de la pollution sonore',
                gr: '',
                it: '',
                lv: '',
              },
              {
                de: '',
                en: 'Increasing ventilation efficiency',
                es: '',
                fr: "Augmenter l'efficacité de la ventilation",
                gr: '',
                it: '',
                lv: '',
              },
            ],
            difficulty: 'NORMAL',
            intros: [
              {
                de: '',
                en: "Did you know? Monitoring air quality in residential buildings is more than just keeping the air fresh—it's about improving the way buildings respond to environmental changes.",
                es: '',
                fr: "Le saviez-vous ? Le contrôle de la qualité de l'air dans les bâtiments résidentiels ne se limite pas à maintenir l'air frais. Il s'agit d'améliorer la façon dont les bâtiments réagissent aux changements environnementaux.",
                gr: '',
                it: '',
                lv: '',
              },
              {
                de: '',
                en: 'Smart homes, smarter air! Smart sensors provide data to optimize building systems, like ventilation. They can help identify areas where ventilation might need a boost, ensuring a healthier, more comfortable and more efficient living environment.',
                es: 'Casas inteligentes, ar mais inteligente! Os sensores inteligentes fornecem dados para optimizar os sistemas do edifício, como a ventilação. Podem ajudar a identificar áreas onde a ventilação precisa ser melhorada, garantindo um ambiente mais saudável, mais confortável e mais eficiente.',
                fr: "Maison intelligente, air plus intelligent ! Les capteurs intelligents fournissent des données permettant d'optimiser les systèmes de construction, comme la ventilation. Ils peuvent aider à identifier les zones où la ventilation pourrait avoir besoin d'un coup de pouce, garantissant ainsi un environnement de vie plus sain, plus confortable et plus efficace.",
                gr: '',
                it: '',
                lv: '',
              },
              {
                de: '',
                en: "Installing air quality sensors isn't just a tech trend—it's about better managing indoor spaces. From tracking pollutants to improving system performance, these sensors are reshaping how we control our living conditions.",
                es: '',
                fr: "L'installation de capteurs de qualité de l'air n'est pas seulement une tendance technologique - il s'agit de mieux gérer les espaces intérieurs. De la détection des polluants à l'amélioration des performances des systèmes, ces capteurs modifient la façon dont nous contrôlons nos conditions de vie.",
                gr: '',
                it: '',
                lv: '',
              },
            ],
            question: {
              de: '',
              en: 'What is a key benefit of installing air quality sensors in residential buildings?',
              es: '',
              fr: "Quel est l'un des principaux avantages de l'installation de capteurs de qualité de l'air dans les bâtiments résidentiels ?",
              gr: '',
              it: '',
              lv: '',
            },
            quizId: 92885687,
            reward: 0.5,
            theme: 'AIR_QUALITY',
          },
        ]);
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
            theme: expect.any(String),
          }),
        }),
      },
    });

    const calledActions = sagaTester.getCalledActions();
    expect(calledActions).toContainEqual(getQuiz());
  });
});
