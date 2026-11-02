/* eslint-disable  @typescript-eslint/no-explicit-any */
import SagaTester from 'redux-saga-tester';

import { VEHICLE_STATUS, FootprintError, Transport, Vehicle } from '@clean-rn/footprint/domain';

import { IRootState } from '../../../../shared/application/state-management/reducers/root-reducer';
import { addVehiclesSaga } from '../../usecases/add-vehicles';
import { getTransportSaga } from '../../usecases/get-transport';
import { IFootprintState, footprintReducer } from '../../state-management';
import {
  addVehicles,
  vehiclesAdded,
  vehiclesNotAdded,
  IFootprintTypes,
  initializeFootprint,
  getTransport,
  transportCreated,
} from '../../commands';
import { IVehiclesProps } from '../../../presentation/types';
import { mapVehiclePropsToDomain } from '../../mappers';
import { selectTransport } from '../../selectors';

describe('Transport footprint - integration', () => {
  let sagaTester: SagaTester;

  beforeEach(() => {
    const initialState: IFootprintState = {
      pending: false,
      estimate: {
        house: {
          data: null,
          footprint: null,
          average: null,
        },
        transport: {
          data: null,
          footprint: null,
          average: null,
        },
        food: {
          data: null,
          footprint: null,
          average: null,
        },
        fly: {
          data: null,
          footprint: null,
          average: null,
        },
      },
      footprint: null,
      house: null,
      transport: null,
      error: null,
    };
    sagaTester = new SagaTester({
      initialState,
      reducers: footprintReducer,
    });
  });

  it('Should store correct state if GET_TRANSPORT', async () => {
    const newState = footprintReducer(undefined, {
      type: IFootprintTypes.GET_TRANSPORT,
    });

    expect(newState).toEqual({
      pending: true,
      estimate: {
        house: {
          data: null,
          footprint: null,
          average: null,
        },
        transport: {
          data: null,
          footprint: null,
          average: null,
        },
        food: {
          data: null,
          footprint: null,
          average: null,
        },
        fly: {
          data: null,
          footprint: null,
          average: null,
        },
      },
      footprint: null,
      house: null,
      transport: null,
      error: null,
    });
  });

  it('Should store correct state if TRANSPORT_CREATED', async () => {
    const mockUserData = {
      userId: 100000352,
    };

    const vehiclesVO = await mapVehiclePropsToDomain({
      userId: mockUserData.userId,
      licensePlate: 'DB404PM',
      hasBeenChanged: false,
      acquisitionYear: 2020,
      vehicleStatus: VEHICLE_STATUS.OWNED,
    });

    const vehicles = vehiclesVO.map((vo) => {
      return Vehicle.Create({ vehicleId: 'vehicleId', vehicle: vo });
    });
    const transportWithVehicles = Transport.Create({});
    transportWithVehicles.addVehicles(vehicles);

    sagaTester.start(getTransportSaga);
    sagaTester.dispatch(getTransport());
    sagaTester.dispatch(transportCreated(transportWithVehicles));

    expect(sagaTester.getState()).toEqual({
      pending: false,
      estimate: {
        house: {
          data: null,
          footprint: null,
          average: null,
        },
        transport: {
          data: null,
          footprint: null,
          average: null,
        },
        food: {
          data: null,
          footprint: null,
          average: null,
        },
        fly: {
          data: null,
          footprint: null,
          average: null,
        },
      },
      footprint: null,
      house: null,
      transport: transportWithVehicles,
      error: null,
    });
  });

  it('should select transport from state', () => {
    const mockState = {
      footprint: {
        pending: false,
        estimate: {
          house: {
            data: null,
            footprint: null,
            average: null,
          },
          transport: {
            data: null,
            footprint: null,
            average: null,
          },
          food: {
            data: null,
            footprint: null,
            average: null,
          },
          fly: {
            data: null,
            footprint: null,
            average: null,
          },
        },
        footprint: null,
        house: null,
        transport: null,
        error: null,
      },
    };
    expect(selectTransport(mockState as IRootState)).toBe(mockState.footprint.transport);
  });

  it('Should store correct state if ADD_VEHICLES', async () => {
    const mockUserData = {
      userId: 100000352,
    };

    const vehiclesVO = await mapVehiclePropsToDomain({
      userId: mockUserData.userId,
      licensePlate: 'DB404PM',
      hasBeenChanged: false,
      acquisitionYear: 2020,
      vehicleStatus: VEHICLE_STATUS.OWNED,
    });

    const mockVehicles: IVehiclesProps = {
      userId: mockUserData.userId,
      vehicles: vehiclesVO,
    };

    const newState = footprintReducer(undefined, {
      type: IFootprintTypes.ADD_VEHICLES,
      payload: mockVehicles,
    });

    expect(newState).toEqual({
      pending: true,
      estimate: {
        house: {
          data: null,
          footprint: null,
          average: null,
        },
        transport: {
          data: null,
          footprint: null,
          average: null,
        },
        food: {
          data: null,
          footprint: null,
          average: null,
        },
        fly: {
          data: null,
          footprint: null,
          average: null,
        },
      },
      footprint: null,
      house: null,
      transport: null,
      error: null,
    });
  });

  it('Should store correct state if VEHICLE_ADDED', async () => {
    const mockUserData = {
      userId: 100000352,
    };

    const vehiclesVO = await mapVehiclePropsToDomain({
      userId: mockUserData.userId,
      licensePlate: 'DB404PM',
      hasBeenChanged: false,
      acquisitionYear: 2020,
      vehicleStatus: VEHICLE_STATUS.OWNED,
    });

    const mockVehicles: IVehiclesProps = {
      userId: mockUserData.userId,
      vehicles: vehiclesVO,
    };
    const transportWithVehicles = Transport.Create({});
    const vehicles = vehiclesVO.map((vo) => {
      return Vehicle.Create({ vehicleId: 'vehicleId', vehicle: vo });
    });
    transportWithVehicles.addVehicles(vehicles);
    sagaTester.start(addVehiclesSaga);
    sagaTester.dispatch(addVehicles(mockVehicles));
    sagaTester.dispatch(vehiclesAdded(transportWithVehicles));
    expect(sagaTester.getState()).toEqual({
      pending: false,
      estimate: {
        house: {
          data: null,
          footprint: null,
          average: null,
        },
        transport: {
          data: null,
          footprint: null,
          average: null,
        },
        food: {
          data: null,
          footprint: null,
          average: null,
        },
        fly: {
          data: null,
          footprint: null,
          average: null,
        },
      },
      footprint: null,
      house: null,
      transport: transportWithVehicles,
      error: null,
    });
  });

  it('Should store correct state if VEHICLES_NOT_ADDED', async () => {
    const mockUserData = {
      userId: 100000352,
    };

    const vehiclesVO = await mapVehiclePropsToDomain({
      userId: mockUserData.userId,
      licensePlate: 'DB404PM',
      hasBeenChanged: false,
      acquisitionYear: 2020,
      vehicleStatus: VEHICLE_STATUS.OWNED,
    });

    const mockVehicles: IVehiclesProps = {
      userId: mockUserData.userId,
      vehicles: vehiclesVO,
    };
    sagaTester.start(addVehiclesSaga);
    sagaTester.dispatch(addVehicles(mockVehicles));
    sagaTester.dispatch(vehiclesNotAdded(new FootprintError.InvalidLicensePlate()));
    expect(sagaTester.getState()).toEqual({
      pending: false,
      estimate: {
        house: {
          data: null,
          footprint: null,
          average: null,
        },
        transport: {
          data: null,
          footprint: null,
          average: null,
        },
        food: {
          data: null,
          footprint: null,
          average: null,
        },
        fly: {
          data: null,
          footprint: null,
          average: null,
        },
      },
      footprint: null,
      house: null,
      transport: null,
      error: new FootprintError.InvalidLicensePlate(),
    });
  });

  it('Should store correct state if INITIALIZE_FOOTPRINT', async () => {
    const mockUserData = {
      userId: 100000352,
    };

    const vehiclesVO = await mapVehiclePropsToDomain({
      userId: mockUserData.userId,
      licensePlate: 'DB404PM',
      hasBeenChanged: false,
      acquisitionYear: 2020,
      vehicleStatus: VEHICLE_STATUS.OWNED,
    });

    const mockVehicles: IVehiclesProps = {
      userId: mockUserData.userId,
      vehicles: vehiclesVO,
    };
    sagaTester.start(addVehiclesSaga);
    sagaTester.dispatch(addVehicles(mockVehicles));
    sagaTester.dispatch(initializeFootprint());
    expect(sagaTester.getState()).toEqual({
      pending: false,
      estimate: {
        house: {
          data: null,
          footprint: null,
          average: null,
        },
        transport: {
          data: null,
          footprint: null,
          average: null,
        },
        food: {
          data: null,
          footprint: null,
          average: null,
        },
        fly: {
          data: null,
          footprint: null,
          average: null,
        },
      },
      footprint: null,
      house: null,
      transport: null,
      error: null,
    });
  });
});
