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
import { HttpConnection } from '@clean-rn/shared/infrastructure';
import { FootprintApi } from '@clean-rn/footprint/infrastructure';

import { showUnknownError } from '../../../../shared/application/commands/manage-global-errors';
import { addHeatersSaga, addHeatersGenerator } from '../../usecases/add-heaters';
import { heatersAdded, heatersNotAdded, IFootprintTypes, initializeFootprint } from '../../commands';
import { ensureTokenRefreshed } from '../../../../shared/application/usecases/ensureTokenRefreshed';

import { mapHeaterPropsToDomain } from '../../mappers';
import { selectHouse } from '../../selectors';
import { IHeaterProps } from '../../../presentation/types';

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

  it('Should wait for ADD_HEATERS action and call registerHeatersGenerator, should be done on next iteration', () => {
    const genObject = addHeatersSaga(httpConnection);

    expect(genObject.next().value).toEqual(
      takeEvery(IFootprintTypes.ADD_HEATERS, addHeatersGenerator, httpConnection),
    );
    expect(genObject.next().done).toBeTruthy();
  });

  it('Should add heaters if house is not created', async () => {
    const mockProps = {
      usage: HEATER_USAGE.MAIN,
      heatType: HEATER_TYPE.ELECTRIC,
      installationYear: 2014,
      previousHeatType: HEATER_TYPE.ELECTRIC,
      hasBeenChanged: true,
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

    const heatersVO = await mapHeaterPropsToDomain(mockProps);

    const houseWithHeaters = House.Create({
      userId: user.id,
      houseStatus: HOUSE_STATUS.OCCUPIED,
      houseId: 'houseId',
    });
    const heaters = heatersVO.map((heater, index) => {
      return Heater.Create({
        heaterId: `heaterId${index}`,
        heater,
      });
    });
    houseWithHeaters.addHeaters(heaters);

    testSaga(addHeatersGenerator, httpConnection, {
      type: IFootprintTypes.ADD_HEATERS,
      payload: mockProps,
    })
      .next()
      .call(mapHeaterPropsToDomain, mockProps)
      .next(heatersVO)
      .call(ensureTokenRefreshed, httpConnection)
      .next()
      .select(selectHouse)
      .next(house)
      .call([api, api.addHeaters], {
        house,
        heatersVO: heatersVO,
      })
      .next(houseWithHeaters)
      .put(heatersAdded(houseWithHeaters))
      .next(houseWithHeaters);
  });

  it('Should add heaters if installation year < 2011', async () => {
    const mockProps = {
      usage: HEATER_USAGE.MAIN,
      heatType: HEATER_TYPE.ELECTRIC,
      installationYear: 2010,
      previousHeatType: HEATER_TYPE.ELECTRIC,
      hasBeenChanged: true,
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
    const heatersVO = await mapHeaterPropsToDomain(mockProps);
    const houseWithHeaters = House.Create({
      userId: user.id,
      houseStatus: HOUSE_STATUS.OCCUPIED,
      houseId: 'houseId',
    });
    const heaters = heatersVO.map((heaterVO, index) => {
      return Heater.Create({
        heaterId: `heaterId${index}`,
        heater: heaterVO,
      });
    });
    houseWithHeaters.addHeaters(heaters);

    testSaga(addHeatersGenerator, httpConnection, {
      type: IFootprintTypes.ADD_HEATERS,
      payload: mockProps,
    })
      .next()
      .call(mapHeaterPropsToDomain, mockProps)
      .next(heatersVO)
      .call(ensureTokenRefreshed, httpConnection)
      .next()
      .select(selectHouse)
      .next(house)
      .call([api, api.addHeaters], {
        house,
        heatersVO: heatersVO,
      })
      .next(houseWithHeaters)
      .put(heatersAdded(houseWithHeaters))
      .next(houseWithHeaters);
  });

  it('Should add heaters if heaters has not changed', async () => {
    const mockProps = {
      usage: HEATER_USAGE.MAIN,
      heatType: HEATER_TYPE.ELECTRIC,
      installationYear: undefined,
      previousHeatType: HEATER_TYPE.ELECTRIC,
      hasBeenChanged: false,
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
    const heatersVO = await mapHeaterPropsToDomain(mockProps);
    const houseWithHeaters = House.Create({
      userId: user.id,
      houseStatus: HOUSE_STATUS.OCCUPIED,
      houseId: 'houseId',
    });
    const heaters = heatersVO.map((heaterVO, index) => {
      return Heater.Create({
        heaterId: `heaterId${index}`,
        heater: heaterVO,
      });
    });
    houseWithHeaters.addHeaters(heaters);

    testSaga(addHeatersGenerator, httpConnection, {
      type: IFootprintTypes.ADD_HEATERS,
      payload: mockProps,
    })
      .next()
      .call(mapHeaterPropsToDomain, mockProps)
      .next(heatersVO)
      .call(ensureTokenRefreshed, httpConnection)
      .next()
      .select(selectHouse)
      .next(house)
      .call([api, api.addHeaters], {
        house,
        heatersVO: heatersVO,
      })
      .next(houseWithHeaters)
      .put(heatersAdded(houseWithHeaters))
      .next(houseWithHeaters);
  });

  it('Should throw invalid heater usage if no heater usage is provided', async () => {
    const mockProps = {
      usage: undefined,
      heatType: HEATER_TYPE.ELECTRIC,
      installationYear: 2013,
      previousHeatType: HEATER_TYPE.COAL,
      hasBeenChanged: true,
    };
    testSaga(addHeatersGenerator, httpConnection, {
      type: IFootprintTypes.ADD_HEATERS,
      payload: mockProps as unknown as IHeaterProps,
    })
      .next()
      .call(mapHeaterPropsToDomain, mockProps)
      .throw(new FootprintError.InvalidHeaterUsage())
      .put(initializeFootprint())
      .next()
      .put(heatersNotAdded(new FootprintError.InvalidHeaterUsage()))
      .next();
  });

  it('Should throw invalid heater type if no heater type is provided', async () => {
    const mockProps = {
      usage: HEATER_USAGE.MAIN,
      heatType: undefined,
      installationYear: 2013,
      previousHeatType: HEATER_TYPE.ELECTRIC,
      hasBeenChanged: false,
    };
    testSaga(addHeatersGenerator, httpConnection, {
      type: IFootprintTypes.ADD_HEATERS,
      payload: mockProps as unknown as IHeaterProps,
    })
      .next()
      .call(mapHeaterPropsToDomain, mockProps)
      .throw(new FootprintError.InvalidHeaterType())
      .put(initializeFootprint())
      .next()
      .put(heatersNotAdded(new FootprintError.InvalidHeaterType()))
      .next();
  });

  it('Should throw invalid heater type if no previous heater type is provided and date > 2011', async () => {
    const mockProps = {
      usage: HEATER_USAGE.MAIN,
      heatType: HEATER_TYPE.ELECTRIC,
      installationYear: 2013,
      previousHeatType: undefined,
      hasBeenChanged: true,
    };
    testSaga(addHeatersGenerator, httpConnection, {
      type: IFootprintTypes.ADD_HEATERS,
      payload: mockProps,
    })
      .next()
      .call(mapHeaterPropsToDomain, mockProps)
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
      hasBeenChanged: true,
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
