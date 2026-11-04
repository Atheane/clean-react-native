/* eslint-disable  @typescript-eslint/no-explicit-any */
import { takeEvery } from 'redux-saga/effects';
import { testSaga } from 'redux-saga-test-plan';

import { Email } from '@clean-rn/auth/domain';
import { User } from '@clean-rn/user/domain';
import { Vehicle, VehicleVO, VEHICLE_STATUS, Transport, FootprintError } from '@clean-rn/footprint/domain';
import { HttpConnection } from '@clean-rn/shared/infrastructure';
import { FootprintApi } from '@clean-rn/footprint/infrastructure';

import { showUnknownError } from '../../../../shared/application/commands/manage-global-errors';

import { addVehiclesSaga, addVehiclesGenerator } from '../../usecases/add-vehicles';
import { vehiclesAdded, IFootprintTypes, initializeFootprint, vehiclesNotAdded } from '../../commands';
import { ensureTokenRefreshed } from '../../../../shared/application/usecases/ensureTokenRefreshed';

import { selectTransport } from '../../selectors';
import { selectUser } from '../../../../user/application/state-management/selectors';
import { IVehicleProps, IVehiclesProps } from 'apps/bank-app/src/footprint/presentation/types';
import { mapVehiclePropsToDomain } from 'apps/bank-app/src/footprint/application/mappers';

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

describe('AddVehicles - usecase', () => {
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

  it('Should wait for ADD_VEHICLES action and call addWorksGenerator, should be done on next iteration', () => {
    const genObject = addVehiclesSaga(httpConnection);

    expect(genObject.next().value).toEqual(
      takeEvery(IFootprintTypes.ADD_VEHICLES, addVehiclesGenerator, httpConnection),
    );
    expect(genObject.next().done).toBeTruthy();
  });

  it('Should create transport and add a vehicle if no previous transport was created', async () => {
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

    const user = User.CreateFromEmail(new Email('test@test.com'));

    const transport = Transport.Create({ transportId: user.id });
    const transportWithVehicles = Transport.Create({ transportId: user.id });
    transportWithVehicles.addVehicles(vehicles);

    testSaga(addVehiclesGenerator, httpConnection, {
      type: IFootprintTypes.ADD_VEHICLES,
      payload: {
        userId: mockUserData.userId,
        vehicles: vehiclesVO,
      },
    })
      .next()
      .call(ensureTokenRefreshed, httpConnection)
      .next()
      .select(selectUser)
      .next(user)
      .select(selectTransport)
      .next(undefined)
      .call([api, api.addVehicles], {
        transport,
        vehiclesVO,
      })
      .next(transportWithVehicles)
      .put(vehiclesAdded(transportWithVehicles))
      .next(transportWithVehicles);
  });

  it('Should create transport and add two vehicles if no previous transport was created', async () => {
    const mockProps = {
      userId: mockUserData.userId,
      licensePlate: 'DB404PM',
      oldLicensePlate: 'AA404BB',
      hasBeenChanged: true,
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

    const user = User.CreateFromEmail(new Email('test@test.com'));

    const transport = Transport.Create({ transportId: user.id });
    const transportWithVehicles = Transport.Create({ transportId: user.id });
    transportWithVehicles.addVehicles(vehicles);

    testSaga(addVehiclesGenerator, httpConnection, {
      type: IFootprintTypes.ADD_VEHICLES,
      payload: {
        userId: mockUserData.userId,
        vehicles: vehiclesVO,
      },
    })
      .next()
      .call(ensureTokenRefreshed, httpConnection)
      .next()
      .select(selectUser)
      .next(user)
      .select(selectTransport)
      .next(undefined)
      .call([api, api.addVehicles], {
        transport,
        vehiclesVO,
      })
      .next(transportWithVehicles)
      .put(vehiclesAdded(transportWithVehicles))
      .next(transportWithVehicles);
  });

  it('Should add vehicles if transport already exists', async () => {
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

    const user = User.CreateFromEmail(new Email('test@test.com'));

    const transport = Transport.Create({ transportId: user.id });
    const transportWithVehicles = Transport.Create({ transportId: user.id });
    transportWithVehicles.addVehicles(vehicles);

    testSaga(addVehiclesGenerator, httpConnection, {
      type: IFootprintTypes.ADD_VEHICLES,
      payload: {
        userId: mockUserData.userId,
        vehicles: vehiclesVO,
      },
    })
      .next()
      .call(ensureTokenRefreshed, httpConnection)
      .next()
      .select(selectUser)
      .next(user)
      .select(selectTransport)
      .next(transport)
      .call([api, api.addVehicles], {
        transport,
        vehiclesVO,
      })
      .next(transportWithVehicles)
      .put(vehiclesAdded(transportWithVehicles))
      .next(transportWithVehicles);
  });

  it('Should add empty array if transport has no vehicles', async () => {
    const mockProps = undefined;

    const vehiclesVO = await mapVehiclePropsToDomain(mockProps as unknown as IVehicleProps);

    const vehicles = vehiclesVO.map((vehicleVO: VehicleVO) =>
      Vehicle.Create({
        vehicleId: 'vehicleId',
        vehicle: vehicleVO,
      }),
    );

    const user = User.CreateFromEmail(new Email('test@test.com'));

    const transport = Transport.Create({ transportId: user.id });
    const transportWithVehicles = Transport.Create({ transportId: user.id });
    transportWithVehicles.addVehicles(vehicles);

    testSaga(addVehiclesGenerator, httpConnection, {
      type: IFootprintTypes.ADD_VEHICLES,
      payload: {
        userId: mockUserData.userId,
        vehicles: vehiclesVO,
      } as unknown as IVehiclesProps,
    })
      .next()
      .call(ensureTokenRefreshed, httpConnection)
      .next()
      .select(selectUser)
      .next(user)
      .select(selectTransport)
      .next(transport)
      .call([api, api.addVehicles], {
        transport,
        vehiclesVO,
      })
      .next(transportWithVehicles)
      .put(vehiclesAdded(transportWithVehicles))
      .next(transportWithVehicles);
  });

  it('Should call vehiclesNotAdded action if Footprint error', async () => {
    testSaga(addVehiclesGenerator, httpConnection, {
      type: IFootprintTypes.ADD_VEHICLES,
      payload: {
        userId: mockUserData.userId,
        vehicles: [],
      },
    })
      .next()
      .throw(new FootprintError.InvalidLicensePlate())
      .put(initializeFootprint())
      .next()
      .put(vehiclesNotAdded(new FootprintError.InvalidLicensePlate()))
      .next();
  });

  it('Should call showUnknownError action if unknown error', async () => {
    const mockProps = {
      userId: mockUserData.userId,
      licensePlate: 'DB404PM',
      hasBeenChanged: false,
      acquisitionYear: 2020,
      vehicleStatus: VEHICLE_STATUS.OWNED,
    };
    const vehiclesVO = await mapVehiclePropsToDomain(mockProps as unknown as IVehicleProps);

    testSaga(addVehiclesGenerator, httpConnection, {
      type: IFootprintTypes.ADD_VEHICLES,
      payload: {
        userId: mockUserData.userId,
        vehicles: vehiclesVO,
      },
    })
      .next()
      .throw(new Error('unknown error'))
      .put(initializeFootprint())
      .next()
      .put(showUnknownError(new Error('unknown error')))
      .next();
  });

  it('Should throw InvalidVehicleDate error', async () => {
    const mockProps = {
      userId: mockUserData.userId,
      licensePlate: 'DB404PM',
      hasBeenChanged: false,
      acquisitionYear: undefined,
      vehicleStatus: VEHICLE_STATUS.OWNED,
    };

    await expect(mapVehiclePropsToDomain(mockProps)).rejects.toThrow(FootprintError.InvalidVehicleDate);
  });

  it('Should throw InvalidLicensePlate error if wrong license plate', async () => {
    const mockProps = {
      userId: mockUserData.userId,
      licensePlate: 'DB',
      hasBeenChanged: false,
      acquisitionYear: 2020,
      vehicleStatus: VEHICLE_STATUS.OWNED,
    };

    await expect(mapVehiclePropsToDomain(mockProps)).rejects.toThrow(FootprintError.InvalidLicensePlate);
  });

  it('Should throw InvalidLicensePlate error if no license plate', async () => {
    const mockProps = {
      userId: mockUserData.userId,
      licensePlate: undefined,
      hasBeenChanged: false,
      acquisitionYear: 2020,
      vehicleStatus: VEHICLE_STATUS.OWNED,
    };

    await expect(mapVehiclePropsToDomain(mockProps)).rejects.toThrow(FootprintError.InvalidLicensePlate);
  });

  it('Should throw InvalidLicensePlate error if has changed but no old license plate provided', async () => {
    const mockProps = {
      userId: mockUserData.userId,
      licensePlate: 'DB404PM',
      oldLicensePlzte: undefined,
      hasBeenChanged: true,
      acquisitionYear: 2020,
      vehicleStatus: VEHICLE_STATUS.OWNED,
    };

    await expect(mapVehiclePropsToDomain(mockProps)).rejects.toThrow(FootprintError.InvalidLicensePlate);
  });
});
