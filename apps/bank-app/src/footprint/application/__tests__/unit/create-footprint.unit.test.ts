/* eslint-disable  @typescript-eslint/no-explicit-any */
import { takeEvery } from 'redux-saga/effects';
import { testSaga } from 'redux-saga-test-plan';

import { Footprint, FOOTPRINT_UNIT, FootprintError, FootprintVO } from '@clean-rn/footprint/domain';
import { User } from '@clean-rn/user/domain';
import { Email } from '@clean-rn/auth/domain';

import { showUnknownError } from '../../../../shared/application/commands/manage-global-errors';

import { createFootprintSaga, createFootprintGenerator } from '../../usecases/create-footprint';
import { footprintCreated, footprintNotCreated, IFootprintTypes, initializeFootprint } from '../../commands';
import { HttpConnection, ServerError } from '@clean-rn/shared/infrastructure';
import { FootprintApi } from '@clean-rn/footprint/infrastructure';
import { ensureTokenRefreshed } from '../../../../shared/application/usecases/ensureTokenRefreshed';
import { selectUser } from '../../../../user/application/state-management/selectors';
import { mapFootprintPropsToDomain } from '../../mappers';
import { IFootprintProps } from '../../../presentation/types';

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

describe('CreateFootprint - usecase', () => {
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

  const mockUserData = {
    userId: 100000352,
  };

  const mockFootprintProps = {
    adultNumber: 2,
    childNumber: 1,
  };

  const mockError400 = {
    statusCode: 400,
    message: 'Root::FootprintService::Function - Footprint #5154253 has overlapping periods ALREADY_EXISTS',
    response: 'Root::FootprintService::Function - Footprint #5154253 has overlapping periods ALREADY_EXISTS',
    timestamp: '2024-09-19T13:59:25.366Z',
    path: '/app/footprint',
    method: 'POST',
    body: {
      adultNumber: 1,
      childNumber: 1,
    },
  };

  it('Should wait for CREATE_FOOTPRINT action and call createFootprintGenerator, should be done on next iteration', () => {
    const genObject = createFootprintSaga(httpConnection);

    expect(genObject.next().value).toEqual(
      takeEvery(IFootprintTypes.CREATE_FOOTPRINT, createFootprintGenerator, httpConnection),
    );
    expect(genObject.next().done).toBeTruthy();
  });

  it('Should createFootprint', async () => {
    const user = User.Create({
      id: mockUserData.userId,
      properties: {
        email: new Email('test@test.com'),
      },
    });

    const footprintVO = await FootprintVO.create(mockFootprintProps);
    const footprint = Footprint.Create({
      userId: user.id,
      footprint: footprintVO,
      startDate: new Date(),
      endDate: new Date(),
      unit: FOOTPRINT_UNIT.CO2,
    });

    testSaga(createFootprintGenerator, httpConnection, {
      type: IFootprintTypes.CREATE_FOOTPRINT,
      payload: mockFootprintProps,
    })
      .next()
      .call(mapFootprintPropsToDomain, mockFootprintProps)
      .next(footprintVO)
      .call(ensureTokenRefreshed, httpConnection)
      .next()
      .select(selectUser)
      .next(user)
      .call([api, api.createFootprint], {
        userId: user.id,
        footprint: footprintVO,
      })
      .next(footprint)
      .put(footprintCreated(footprint))
      .next(footprint);
  });

  it('should throw InvalidAdultNumber error if adults is zero', async () => {
    const props: IFootprintProps = {
      adultNumber: 0,
      childNumber: 1,
    };

    await expect(mapFootprintPropsToDomain(props)).rejects.toThrow(FootprintError.InvalidAdultNumber);
  });

  it('should return footprintVO if adultNumber and childNumber are valid', async () => {
    const props: IFootprintProps = {
      adultNumber: 2,
      childNumber: 1,
    };

    const footprint = await mapFootprintPropsToDomain(props);
    expect(footprint.value).toEqual({
      adultNumber: 2,
      childNumber: 1,
    });
  });

  it('Should call footprintNotCreated action if footprint error', () => {
    testSaga(createFootprintGenerator, httpConnection, {
      type: IFootprintTypes.CREATE_FOOTPRINT,
      payload: mockFootprintProps,
    })
      .next()
      .throw(new FootprintError.InvalidAdultNumber())
      .put(initializeFootprint())
      .next()
      .put(footprintNotCreated(new FootprintError.InvalidAdultNumber()))
      .next();
  });

  it('Should call footprintNotCreated action if server error 400', () => {
    const serverError = new ServerError(mockError400);
    serverError.statusCode = 400;

    testSaga(createFootprintGenerator, httpConnection, {
      type: IFootprintTypes.CREATE_FOOTPRINT,
      payload: mockFootprintProps,
    })
      .next()
      .throw(serverError)
      .put(initializeFootprint())
      .next()
      .put(footprintNotCreated(new FootprintError.HouseholdAlreadyDeclared(serverError)))
      .next();
  });

  it('Should call showUnknownError action if unknown error', () => {
    testSaga(createFootprintGenerator, httpConnection, {
      type: IFootprintTypes.CREATE_FOOTPRINT,
      payload: mockFootprintProps,
    })
      .next()
      .throw(new Error('unknown error'))
      .put(initializeFootprint())
      .next()
      .put(showUnknownError(new Error('unknown error')))
      .next();
  });
});
