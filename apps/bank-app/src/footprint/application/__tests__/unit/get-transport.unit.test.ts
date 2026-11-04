/* eslint-disable  @typescript-eslint/no-explicit-any */
import { takeEvery } from 'redux-saga/effects';
import { testSaga } from 'redux-saga-test-plan';

import { Vehicle, Transport, VEHICLE_STATUS, VehicleVO } from '@clean-rn/footprint/domain';
import { User } from '@clean-rn/user/domain';
import { Email } from '@clean-rn/auth/domain';
import { HttpConnection } from '@clean-rn/shared/infrastructure';
import { FootprintApi } from '@clean-rn/footprint/infrastructure';
import { showUnknownError } from '../../../../shared/application/commands/manage-global-errors';

import { getTransportSaga, getTransportGenerator } from '../../usecases/get-transport';
import { IFootprintTypes, initializeFootprint, transportCreated } from '../../commands';

import { ensureTokenRefreshed } from '../../../../shared/application/usecases/ensureTokenRefreshed';
import { selectUser } from '../../../../user/application/state-management/selectors';
import { mapVehiclePropsToDomain } from '../../mappers';

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

describe('GetTransport - usecase', () => {
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
    global.fetch = jest.fn();
    api = FootprintApi.getInstance(httpConnection);
  });

  const mockUserData = {
    userId: 100000352,
  };

  it('Should wait for GET_TRANSPORT action and call getTransportGenerator, should be done on next iteration', () => {
    const genObject = getTransportSaga(httpConnection);

    expect(genObject.next().value).toEqual(
      takeEvery(IFootprintTypes.GET_TRANSPORT, getTransportGenerator, httpConnection),
    );
    expect(genObject.next().done).toBeTruthy();
  });

  it('Should createTransport if transport does not exists', async () => {
    const user = User.Create({
      id: mockUserData.userId,
      properties: {
        email: new Email('test@test.com'),
      },
    });
    const transport = Transport.Create({
      transportId: user.id,
    });

    testSaga(getTransportGenerator, httpConnection)
      .next()
      .call(ensureTokenRefreshed, httpConnection)
      .next()
      .select(selectUser)
      .next(user)
      .call([api, api.searchTransport], {
        userId: user.id,
      })
      .next()
      .call([api, api.createTransport], {
        userId: user.id,
      })
      .next(transport)
      .put(transportCreated(transport))
      .next();
  });

  it('Should get transport if transport already created', async () => {
    const user = User.Create({
      id: mockUserData.userId,
      properties: {
        email: new Email('test@test.com'),
      },
    });
    const transport = Transport.Create({
      transportId: user.id,
    });
    const mockProps = {
      userId: mockUserData.userId,
      licensePlate: 'DB404PM',
      hasBeenChanged: false,
      acquisitionYear: 2020,
      vehicleStatus: VEHICLE_STATUS.OWNED,
    };

    const vehiclesVO = await mapVehiclePropsToDomain(mockProps);

    const vehicles = vehiclesVO.map((vehicleVO: VehicleVO) =>
      Vehicle.Create({
        vehicleId: 'vehicleId',
        vehicle: vehicleVO,
      }),
    );

    transport.addVehicles(vehicles);

    testSaga(getTransportGenerator, httpConnection)
      .next()
      .call(ensureTokenRefreshed, httpConnection)
      .next()
      .select(selectUser)
      .next(user)
      .call([api, api.searchTransport], {
        userId: user.id,
      })
      .next(transport)
      .put(transportCreated(transport))
      .next();
  });

  it('Should call showUnknownError action if unknown error', () => {
    testSaga(getTransportGenerator, httpConnection)
      .next()
      .throw(new Error('unknown error'))
      .put(initializeFootprint())
      .next()
      .put(showUnknownError(new Error('unknown error')))
      .next();
  });
});
