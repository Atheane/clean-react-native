import SagaTester from 'redux-saga-tester';
import { setupServer } from 'msw/node';
import { http, HttpResponse } from 'msw';
import fs from 'fs';

import { HttpConnection } from '@clean-rn/shared/infrastructure';
import { createDomainEventsMiddleware } from '../../../../shared/application/state-management/middleware/domain-events.middleware';
import { authReducer } from '../../../../auth/application/state-management';
import { userReducer } from '../../../../user/application/state-management';

import { customerReducer } from '../../state-management/reducer';
import { checkCustomerStatus, ICustomerTypes, initializeCustomer } from '../../commands';
import { createDocument, addPage } from '../../commands';
import { checkCustomerStatusSaga } from '../../usecases/customer';
import { createDocumentSaga, addPageSaga } from '../../usecases';

import { kycDomainEventsConfig } from '../../state-management/domain-events.config';
import { authUser } from '../fixtures/generate-fixtures';
import { mockUserKYCNoneRevenues, mockIPassportDocument } from '../fixtures/mock-data';

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

  const fixtures = {
    auth: JSON.parse(fs.readFileSync(fixtureDir + '/auth.json', 'utf8')),
  };

  return fixtures;
};

const initState = (fixtures: any) => {
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
        properties: {
          config: {
            lang: 'en',
          },
        },
      },
    },
    customer: {
      pending: false,
      customer: null,
      error: null,
    },
  };

  const domainEventsMiddleware = createDomainEventsMiddleware({
    customer: kycDomainEventsConfig.customer,
  });

  const sagaTester = new SagaTester({
    initialState,
    reducers: {
      auth: authReducer,
      user: userReducer,
      customer: customerReducer,
    },
    middlewares: [domainEventsMiddleware],
  });

  return sagaTester;
};

describe('Kyc - integration', () => {
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
    sagaTester = await initState(fixtures);
    server.listen();
  });

  afterEach(() => {
    server.resetHandlers();
  });
  afterAll(() => {
    // Restaurer la vraie date
    global.Date = realDate;
    server.close();
    sagaTester.reset();
  });

  it('Should trigger KYC_DOMAIN_EVENT if checkCustomerStatus is called', async () => {
    server.use(
      http.get('*/auth/refresh', () => {
        return HttpResponse.json({
          accessToken: 'new-fake-token',
          refreshToken: 'new-fake-refresh-token',
          expiresIn: 3600,
        });
      }),
    );

    sagaTester.start(checkCustomerStatusSaga, httpConnection);
    sagaTester.dispatch(checkCustomerStatus({ user: mockUserKYCNoneRevenues }));
    await new Promise((resolve) => setTimeout(resolve, 0));
    const calledActions = sagaTester.getCalledActions();
    expect(calledActions).toContainEqual(checkCustomerStatus({ user: mockUserKYCNoneRevenues }));
  });

  it('Should trigger KYC_DOMAIN_EVENT if createDocument is called', async () => {
    server.use(
      http.get('*/auth/refresh', () => {
        return HttpResponse.json({
          accessToken: 'new-fake-token',
          refreshToken: 'new-fake-refresh-token',
          expiresIn: 3600,
        });
      }),
    );

    sagaTester.start(createDocumentSaga, httpConnection);
    sagaTester.dispatch(createDocument({ documentProperties: mockIPassportDocument }));
    await new Promise((resolve) => setTimeout(resolve, 0));
    const calledActions = sagaTester.getCalledActions();
    expect(calledActions).toContainEqual(createDocument({ documentProperties: mockIPassportDocument }));
  });

  it('Should trigger KYC_DOMAIN_EVENT if addPage is called', async () => {
    server.use(
      http.get('*/auth/refresh', () => {
        return HttpResponse.json({
          accessToken: 'new-fake-token',
          refreshToken: 'new-fake-refresh-token',
          expiresIn: 3600,
        });
      }),
    );

    sagaTester.start(addPageSaga, httpConnection);
    sagaTester.dispatch(addPage({ base64: 'fake-base64' }));
    await new Promise((resolve) => setTimeout(resolve, 0));
    const calledActions = sagaTester.getCalledActions();
    expect(calledActions).toContainEqual(addPage({ base64: 'fake-base64' }));
  });

  it('Should trigger INITIALIZE_CUSTOMER when server returns error 500', async () => {
    // S'assurer que toutes les requêtes retournent 500
    server.use(
      http.get('*/auth/refresh', () => {
        return new HttpResponse(JSON.stringify(fixtures.unknownServerError), {
          status: 500,
          statusText: 'Server Error',
          headers: {
            'Content-Type': 'application/json',
          },
        });
      }),
    );

    const errorPromise = new Promise<void>((resolve) => {
      const unsubscribe = sagaTester.store.subscribe(() => {
        const actions = sagaTester.getCalledActions();
        if (actions.some((action) => action.type === ICustomerTypes.INITIALIZE_CUSTOMER)) {
          unsubscribe();
          resolve();
        }
      });
    });

    sagaTester.start(checkCustomerStatusSaga, httpConnection);
    sagaTester.dispatch(checkCustomerStatus({ user: mockUserKYCNoneRevenues }));

    await errorPromise;

    const calledActions = sagaTester.getCalledActions();
    expect(calledActions).toContainEqual(checkCustomerStatus({ user: mockUserKYCNoneRevenues }));
    expect(calledActions).toContainEqual(initializeCustomer());
  });
});
