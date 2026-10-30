/* eslint-disable  @typescript-eslint/no-explicit-any */
import { takeEvery } from 'redux-saga/effects';
import { testSaga } from 'redux-saga-test-plan';

import {
  HEATER_TYPE,
  HEATER_USAGE,
  HOUSE_STATUS,
  House,
  Heater,
  FootprintError,
} from '@clean-rn/footprint/domain';
import { User } from '@clean-rn/user/domain';
import { Email } from '@clean-rn/auth/domain';

import { showUnknownError } from '../../../../shared/application/commands/manage-global-errors';

import { addHeatersSaga, addHeatersGenerator } from '../../usecases/add-heaters';
import { heatersAdded, heatersNotAdded, IFootprintTypes, initializeFootprint } from '../../commands';
import { HttpConnection, ServerError } from '@clean-rn/shared/infrastructure';
import { FootprintApi } from '@clean-rn/footprint/infrastructure';
import { ensureTokenRefreshed } from '../../../../shared/application/usecases/ensureTokenRefreshed';

import { mapHeaterPropsToDomain } from '../../mappers';
import { selectHouse } from '../../selectors';

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

describe('AddHeaters - usecase', () => {
  let httpConnection: HttpConnection;
  let api: FootprintApi;

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
    api = FootprintApi.getInstance(httpConnection);
  });

  afterEach(() => {
    jest.resetAllMocks();
    jest.clearAllMocks();
  });

  const mockUserData = {
    userId: 100000352,
  };

  const mockError400HeaterAlreadyExists = {
    statusCode: 400,
    message: 'Root::Footprint::HouseService::Create - House #220189872 - Heater #MAIN ALREADY_EXISTS',
    response: 'Root::Footprint::HouseService::Create - House #220189872 - Heater #MAIN ALREADY_EXISTS',
    timestamp: '2024-09-09T14:36:19.119Z',
    path: '/app/footprint/house/220189872/heater',
    method: 'POST',
    body: {
      heaterUsage: 'MAIN',
      heaterType: 'COAL',
      date: '2014-09-09T12:18:37.852Z',
      isActive: false,
    },
  };

  it('Should wait for ADD_HEATERS action and call registerHeatersGenerator, should be done on next iteration', () => {
    const genObject = addHeatersSaga(httpConnection);

    expect(genObject.next().value).toEqual(
      takeEvery(IFootprintTypes.ADD_HEATERS, addHeatersGenerator, httpConnection),
    );
    expect(genObject.next().done).toBeTruthy();
  });

  it('Should add heaters if house is not created', async () => {
    const mockData = {
      usage: HEATER_USAGE.MAIN,
      heatType: HEATER_TYPE.ELECTRIC,
      installationYear: 2013,
      previousHeatType: HEATER_TYPE.ELECTRIC,
    };
    const user = User.Create({
      id: mockUserData.userId,
      properties: {
        email: new Email('test@test.com'),
      },
    });
    const house = House.Create({
      userId: user.id,
      houseStatus: HOUSE_STATUS.OCCUPIED,
      houseId: 'houseId',
    });
    const heatersVO = await mapHeaterPropsToDomain(mockData);
    const houseWitHeaters = House.Create({
      userId: user.id,
      houseStatus: HOUSE_STATUS.OCCUPIED,
      houseId: 'houseId',
    });
    houseWitHeaters.addHeater(
      Heater.Create({
        heaterId: 'heaterId',
        heater: heatersVO[0],
      }),
    );
    houseWitHeaters.addHeater(
      Heater.Create({
        heaterId: 'heaterId2',
        heater: heatersVO[1],
      }),
    );

    testSaga(addHeatersGenerator, httpConnection, {
      type: IFootprintTypes.ADD_HEATERS,
      payload: mockData,
    })
      .next()
      .call(mapHeaterPropsToDomain, mockData)
      .next(heatersVO)
      .call(ensureTokenRefreshed, httpConnection)
      .next()
      .select(selectHouse)
      .next(house)
      .call([api, api.addHeaters], {
        house,
        heaters: heatersVO,
      })
      .next(houseWitHeaters)
      .put(heatersAdded(houseWitHeaters))
      .next(houseWitHeaters);
  });

  it('Should add heaters if installation year < 2012', async () => {
    const mockData = {
      usage: HEATER_USAGE.MAIN,
      heatType: HEATER_TYPE.ELECTRIC,
      installationYear: 2011,
      previousHeatType: HEATER_TYPE.ELECTRIC,
    };
    const user = User.Create({
      id: mockUserData.userId,
      properties: {
        email: new Email('test@test.com'),
      },
    });
    const house = House.Create({
      userId: user.id,
      houseStatus: HOUSE_STATUS.OCCUPIED,
      houseId: 'houseId',
    });
    const heatersVO = await mapHeaterPropsToDomain(mockData);
    const houseWitHeaters = House.Create({
      userId: user.id,
      houseStatus: HOUSE_STATUS.OCCUPIED,
      houseId: 'houseId',
    });
    houseWitHeaters.addHeater(
      Heater.Create({
        heaterId: 'heaterId',
        heater: heatersVO[0],
      }),
    );

    testSaga(addHeatersGenerator, httpConnection, {
      type: IFootprintTypes.ADD_HEATERS,
      payload: mockData,
    })
      .next()
      .call(mapHeaterPropsToDomain, mockData)
      .next(heatersVO)
      .call(ensureTokenRefreshed, httpConnection)
      .next()
      .select(selectHouse)
      .next(house)
      .call([api, api.addHeaters], {
        house,
        heaters: heatersVO,
      })
      .next(houseWitHeaters)
      .put(heatersAdded(houseWitHeaters))
      .next(houseWitHeaters);
  });

  it('Should not add heaters if already exists', async () => {
    const serverError = new ServerError(mockError400HeaterAlreadyExists);
    serverError.statusCode = 400;

    const mockData = {
      usage: HEATER_USAGE.MAIN,
      heatType: HEATER_TYPE.ELECTRIC,
      installationYear: 2013,
      previousHeatType: HEATER_TYPE.ELECTRIC,
    };
    const user = User.Create({
      id: mockUserData.userId,
      properties: {
        email: new Email('test@test.com'),
      },
    });
    const house = House.Create({
      userId: user.id,
      houseStatus: HOUSE_STATUS.OCCUPIED,
      houseId: 'houseId',
    });
    const heatersVO = await mapHeaterPropsToDomain(mockData);

    testSaga(addHeatersGenerator, httpConnection, {
      type: IFootprintTypes.ADD_HEATERS,
      payload: mockData,
    })
      .next()
      .call(mapHeaterPropsToDomain, mockData)
      .next(heatersVO)
      .call(ensureTokenRefreshed, httpConnection)
      .next()
      .select(selectHouse)
      .next(house)
      .call([api, api.addHeaters], {
        house,
        heaters: heatersVO,
      })
      .throw(serverError)
      .put(initializeFootprint())
      .next()
      .put(heatersNotAdded(new FootprintError.HeaterAlreadyExists()))
      .next();
  });

  it('Should throw invalid heater usage if no heater usage is provided', async () => {
    const mockData = {
      usage: undefined,
      heatType: HEATER_TYPE.ELECTRIC,
      installationYear: 2013,
      previousHeatType: HEATER_TYPE.COAL,
    };
    testSaga(addHeatersGenerator, httpConnection, {
      type: IFootprintTypes.ADD_HEATERS,
      payload: mockData,
    })
      .next()
      .call(mapHeaterPropsToDomain, mockData)
      .throw(new FootprintError.InvalidHeaterUsage())
      .put(initializeFootprint())
      .next()
      .put(heatersNotAdded(new FootprintError.InvalidHeaterUsage()))
      .next();
  });

  it('Should throw invalid heater type if no heater type is provided', async () => {
    const mockData = {
      usage: HEATER_USAGE.MAIN,
      heatType: undefined,
      installationYear: 2013,
      previousHeatType: HEATER_TYPE.ELECTRIC,
    };
    testSaga(addHeatersGenerator, httpConnection, {
      type: IFootprintTypes.ADD_HEATERS,
      payload: mockData,
    })
      .next()
      .call(mapHeaterPropsToDomain, mockData)
      .throw(new FootprintError.InvalidHeaterType())
      .put(initializeFootprint())
      .next()
      .put(heatersNotAdded(new FootprintError.InvalidHeaterType()))
      .next();
  });

  it('Should throw invalid heater type if no previous heater type is provided and date > 2012', async () => {
    const mockData = {
      usage: HEATER_USAGE.MAIN,
      heatType: HEATER_TYPE.ELECTRIC,
      installationYear: 2013,
      previousHeatType: undefined,
    };
    testSaga(addHeatersGenerator, httpConnection, {
      type: IFootprintTypes.ADD_HEATERS,
      payload: mockData,
    })
      .next()
      .call(mapHeaterPropsToDomain, mockData)
      .throw(new FootprintError.InvalidHeaterType())
      .put(initializeFootprint())
      .next()
      .put(heatersNotAdded(new FootprintError.InvalidHeaterType()))
      .next();
  });

  it('should throw InvalidHeaterDate when installationYear is undefined', async () => {
    const props = {
      usage: HEATER_USAGE.MAIN,
      heatType: HEATER_TYPE.ELECTRIC,
      installationYear: undefined,
      previousHeatType: HEATER_TYPE.ELECTRIC,
    };

    await expect(mapHeaterPropsToDomain(props)).rejects.toThrow(FootprintError.InvalidHeaterDate);
  });

  it('Should call showUnknownError action if unknown error', () => {
    const mockData = {
      usage: HEATER_USAGE.MAIN,
      heatType: HEATER_TYPE.ELECTRIC,
      installationYear: 2013,
      previousHeatType: HEATER_TYPE.ELECTRIC,
    };

    testSaga(addHeatersGenerator, httpConnection, {
      type: IFootprintTypes.ADD_HEATERS,
      payload: mockData,
    })
      .next()
      .throw(new Error('unknown error'))
      .put(initializeFootprint())
      .next()
      .put(showUnknownError(new Error('unknown error')))
      .next();
  });
});
