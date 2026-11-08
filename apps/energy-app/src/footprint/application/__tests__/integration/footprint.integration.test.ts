/* eslint-disable  @typescript-eslint/no-explicit-any */
import SagaTester from 'redux-saga-tester';
import { setupServer } from 'msw/node';
import { http, HttpResponse } from 'msw';
import fs from 'fs';

import { HttpConnection } from '@clean-rn/shared/infrastructure';
import { FootprintError, Footprint, FOOTPRINT_UNIT, HouseholdVO } from '@clean-rn/footprint/domain';

import { footprintReducer } from '../../state-management';
import { authReducer } from '../../../../auth/application/state-management';
import { userReducer } from '../../../../user/application/state-management';
import {
  createFootprint,
  footprintCreated,
  footprintNotCreated,
  footprintNotFound,
  getFootprint,
  IFootprintTypes,
  initializeFootprint,
} from '../../commands';
import { mapHouseholdPropsToDomain } from '../../mappers';
import { createFootprintSaga } from '../../usecases/create-footprint';
import { getFootprintSaga } from '../../usecases/get-footprint';
import {
  authUser,
  createFootprintEmpty,
  createFootprintExists,
  getFootprint2025,
  getFootprintEmpty,
} from '../fixtures/generate-fixtures';

const httpConnection = HttpConnection.getInstance(
  process.env?.EXPO_PUBLIC_BASE_URL_API || 'https://sandbox.example.com',
);

const setupFixtures = async (httpConnection: HttpConnection) => {
  const fixtureDir = __dirname + '/../fixtures';

  if (!fs.existsSync(fixtureDir)) {
    fs.mkdirSync(fixtureDir, { recursive: true });
  }

  if (!fs.existsSync(fixtureDir + '/auth.json')) {
    authUser(httpConnection);
  }

  if (!fs.existsSync(fixtureDir + '/get-footprint-2025.json')) {
    getFootprint2025(httpConnection);
  }

  if (!fs.existsSync(fixtureDir + '/get-footprint-empty.json')) {
    getFootprintEmpty(httpConnection);
  }

  if (!fs.existsSync(fixtureDir + '/create-footprint-empty.json')) {
    createFootprintEmpty(httpConnection);
  }

  if (!fs.existsSync(fixtureDir + '/create-footprint-exists.json')) {
    createFootprintExists(httpConnection);
  }

  const fixtures = {
    auth: JSON.parse(fs.readFileSync(fixtureDir + '/auth.json', 'utf8')),
    getFootprintEmpty: JSON.parse(fs.readFileSync(fixtureDir + '/get-footprint-empty.json', 'utf8')),
    getFootprint2025: JSON.parse(fs.readFileSync(fixtureDir + '/get-footprint-2025.json', 'utf8')),
    createFootprintEmpty: JSON.parse(fs.readFileSync(fixtureDir + '/create-footprint-empty.json', 'utf8')),
    createFootprintExists: JSON.parse(fs.readFileSync(fixtureDir + '/create-footprint-exists.json', 'utf8')),
    unknownServerError: JSON.parse(fs.readFileSync(fixtureDir + '/unknown-server-error.json', 'utf8')),
  };

  return fixtures;
};

describe('Footprint - integration', () => {
  let sagaTester: SagaTester;
  let fixtures: any;
  let server: ReturnType<typeof setupServer>;

  beforeAll(async () => {
    fixtures = await setupFixtures(httpConnection);

    server = setupServer(
      // Auth endpoints
      http.post('*/auth/login', () => {
        return HttpResponse.json(fixtures.auth);
      }),
      http.get('*/auth/refresh', () => {
        return HttpResponse.json(fixtures.auth);
      }),
    );

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
          id: fixtures.createFootprintEmpty.userId,
        },
      },
      footprint: {
        pending: false,
        estimate: {
          house: { data: null, footprint: null, average: null },
          transport: { data: null, footprint: null, average: null },
          food: { data: null, footprint: null, average: null },
          fly: { data: null, footprint: null, average: null },
        },
        footprint: null,
        house: null,
        transport: null,
        error: null,
      },
    };

    sagaTester = new SagaTester({
      initialState,
      reducers: {
        auth: authReducer,
        user: userReducer,
        footprint: footprintReducer,
      },
    });
  });

  afterEach(() => server.resetHandlers());

  afterAll(() => server.close());

  it('Should trigger FOOTPRINT_CREATED  if we try to get footprints and user already as footprints', async () => {
    const householdVO: HouseholdVO = await mapHouseholdPropsToDomain({
      adultNumber: fixtures.getFootprint2025[0].adultNumber,
      childNumber: fixtures.getFootprint2025[0].childNumber,
    });
    server.use(
      http.get('*/app/footprint', () => {
        return HttpResponse.json(fixtures.getFootprint2025);
      }),
    );
    const footprint = Footprint.Create({
      household: householdVO,
      userId: fixtures.getFootprint2025[0].userId.toString(),
      unit: FOOTPRINT_UNIT.CO2,
      startDate: new Date(fixtures.getFootprint2025[0].startDate),
      endDate: new Date(fixtures.getFootprint2025[0].endDate),
    });
    footprint.addHistory([]);
    sagaTester.start(getFootprintSaga, httpConnection);
    sagaTester.dispatch(getFootprint());

    // wait for complete saga execution
    await sagaTester.waitFor(IFootprintTypes.FOOTPRINT_CREATED);

    // check that final state is correct
    expect(sagaTester.getState().footprint).toEqual({
      pending: false,
      estimate: {
        house: { data: null, footprint: null, average: null },
        transport: { data: null, footprint: null, average: null },
        food: { data: null, footprint: null, average: null },
        fly: { data: null, footprint: null, average: null },
      },
      footprint: footprint,
      house: null,
      transport: null,
      error: null,
    });
    // check thats redux actions have been called correctly
    const calledActions = sagaTester.getCalledActions();
    expect(calledActions).toContainEqual(getFootprint());
    expect(calledActions).toContainEqual(footprintCreated(footprint));
  });

  it('Should trigger FOOTPRINT_NOTFOUND if we try to get footprints and user has no footprints registered yet', async () => {
    server.use(
      http.get('*/app/footprint', () => {
        return HttpResponse.json(fixtures.getFootprintEmpty);
      }),
    );

    sagaTester.start(getFootprintSaga, httpConnection);
    sagaTester.dispatch(getFootprint());

    // wait for complete saga execution
    await sagaTester.waitFor(IFootprintTypes.FOOTPRINT_NOTFOUND);
    // check that final state is correct
    expect(sagaTester.getState().footprint).toEqual({
      pending: false,
      estimate: {
        house: { data: null, footprint: null, average: null },
        transport: { data: null, footprint: null, average: null },
        food: { data: null, footprint: null, average: null },
        fly: { data: null, footprint: null, average: null },
      },
      footprint: null,
      house: null,
      transport: null,
      error: null,
    });
    // check thats redux actions have been called correctly
    const calledActions = sagaTester.getCalledActions();
    expect(calledActions).toContainEqual(getFootprint());
    expect(calledActions).toContainEqual(footprintNotFound());
  });

  it('Should trigger FOOTPRINT_CREATED if we try to create footprints and user has no footprints registered yet', async () => {
    const mockData = {
      adultNumber: fixtures.createFootprintEmpty.adultNumber,
      childNumber: fixtures.createFootprintEmpty.childNumber,
    };
    const householdVO = await mapHouseholdPropsToDomain(mockData);
    server.use(
      http.post('*/app/footprint', () => {
        return HttpResponse.json(fixtures.createFootprintEmpty);
      }),
    );
    const footprint = Footprint.Create({
      household: householdVO,
      userId: fixtures.createFootprintEmpty.userId.toString(),
      unit: FOOTPRINT_UNIT.CO2,
      startDate: new Date(fixtures.createFootprintEmpty.startDate),
      endDate: new Date(fixtures.createFootprintEmpty.endDate),
    });

    sagaTester.start(createFootprintSaga, httpConnection);
    sagaTester.dispatch(createFootprint(mockData));
    await sagaTester.waitFor(IFootprintTypes.FOOTPRINT_CREATED);

    // Ne vérifier que l'état footprint
    expect(sagaTester.getState().footprint).toEqual({
      pending: false,
      estimate: {
        house: { data: null, footprint: null, average: null },
        transport: { data: null, footprint: null, average: null },
        food: { data: null, footprint: null, average: null },
        fly: { data: null, footprint: null, average: null },
      },
      house: null,
      footprint: footprint,
      transport: null,
      error: null,
    });

    // check thats redux actions have been called correctly
    const calledActions = sagaTester.getCalledActions();
    expect(calledActions).toContainEqual(createFootprint(mockData));
    expect(calledActions).toContainEqual(footprintCreated(footprint));
  });

  it('Should trigger FOOTPRINT_NOT_CREATED if we try to create footprints and footprint already exists', async () => {
    server.use(
      // S'assurer que le refresh token fonctionne
      http.post('*/app/footprint', () => {
        return new HttpResponse(JSON.stringify(fixtures.createFootprintExists), {
          status: 400,
          statusText: 'Bad Request',
          headers: {
            'Content-Type': 'application/json',
          },
        });
      }),
      http.get('*/auth/refresh', () => {
        return HttpResponse.json({
          accessToken: fixtures.auth.accessToken,
          refreshToken: fixtures.auth.refreshToken,
        });
      }),
    );

    const mockData = {
      adultNumber: fixtures.createFootprintExists.body.adultNumber,
      childNumber: fixtures.createFootprintExists.body.childNumber,
    };

    sagaTester.start(createFootprintSaga, httpConnection);
    sagaTester.dispatch(createFootprint(mockData));
    await sagaTester.waitFor(IFootprintTypes.FOOTPRINT_NOT_CREATED);

    // Ne vérifier que l'état footprint
    expect(sagaTester.getState().footprint).toEqual({
      pending: false,
      estimate: {
        house: { data: null, footprint: null, average: null },
        transport: { data: null, footprint: null, average: null },
        food: { data: null, footprint: null, average: null },
        fly: { data: null, footprint: null, average: null },
      },
      house: null,
      footprint: null,
      transport: null,
      error: new FootprintError.HouseAlreadyDeclared(),
    });

    // check thats redux actions have been called correctly
    const calledActions = sagaTester.getCalledActions();
    expect(calledActions).toContainEqual(createFootprint(mockData));
    expect(calledActions).toContainEqual(footprintNotCreated(new FootprintError.HouseAlreadyDeclared()));
  });

  it('Should trigger INITIALIZE_FOOTPRINT on createFootprint if server error 500', async () => {
    server.use(
      // S'assurer que le refresh token fonctionne
      http.post('*/app/footprint', () => {
        return new HttpResponse(JSON.stringify(fixtures.unknownServerError), {
          status: 500,
          statusText: 'Server Error',
          headers: {
            'Content-Type': 'application/json',
          },
        });
      }),
      http.get('*/auth/refresh', () => {
        return HttpResponse.json({
          accessToken: fixtures.auth.accessToken,
          refreshToken: fixtures.auth.refreshToken,
        });
      }),
    );

    const mockData = {
      adultNumber: fixtures.createFootprintExists.body.adultNumber,
      childNumber: fixtures.createFootprintExists.body.childNumber,
    };

    sagaTester.start(createFootprintSaga, httpConnection);
    sagaTester.dispatch(createFootprint(mockData));
    await sagaTester.waitFor(IFootprintTypes.INITIALIZE_FOOTPRINT);

    // Ne vérifier que l'état footprint
    expect(sagaTester.getState().footprint).toEqual({
      pending: false,
      estimate: {
        house: { data: null, footprint: null, average: null },
        transport: { data: null, footprint: null, average: null },
        food: { data: null, footprint: null, average: null },
        fly: { data: null, footprint: null, average: null },
      },
      house: null,
      footprint: null,
      transport: null,
      error: null,
    });

    // check thats redux actions have been called correctly
    const calledActions = sagaTester.getCalledActions();
    expect(calledActions).toContainEqual(createFootprint(mockData));
    expect(calledActions).toContainEqual(initializeFootprint());
  });

  it('Should trigger INITIALIZE_FOOTPRINT on getFootprint if server error 500', async () => {
    server.use(
      // S'assurer que le refresh token fonctionne
      http.get('*/app/footprint', () => {
        return new HttpResponse(JSON.stringify(fixtures.unknownServerError), {
          status: 500,
          statusText: 'Server Error',
          headers: {
            'Content-Type': 'application/json',
          },
        });
      }),
      http.get('*/auth/refresh', () => {
        return HttpResponse.json({
          accessToken: fixtures.auth.accessToken,
          refreshToken: fixtures.auth.refreshToken,
        });
      }),
    );

    sagaTester.start(getFootprintSaga, httpConnection);
    sagaTester.dispatch(getFootprint());
    await sagaTester.waitFor(IFootprintTypes.INITIALIZE_FOOTPRINT);

    // Ne vérifier que l'état footprint
    expect(sagaTester.getState().footprint).toEqual({
      pending: false,
      estimate: {
        house: { data: null, footprint: null, average: null },
        transport: { data: null, footprint: null, average: null },
        food: { data: null, footprint: null, average: null },
        fly: { data: null, footprint: null, average: null },
      },
      house: null,
      footprint: null,
      transport: null,
      error: null,
    });

    // check thats redux actions have been called correctly
    const calledActions = sagaTester.getCalledActions();
    expect(calledActions).toContainEqual(getFootprint());
    expect(calledActions).toContainEqual(initializeFootprint());
  });
});
