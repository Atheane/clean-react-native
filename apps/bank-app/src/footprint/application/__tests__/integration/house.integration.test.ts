/* eslint-disable  @typescript-eslint/no-explicit-any */
import SagaTester from 'redux-saga-tester';

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

import { IFootprintState, footprintReducer } from '../../state-management';
import {
  addHeaters,
  getHouse,
  heatersAdded,
  heatersNotAdded,
  houseCreated,
  IFootprintTypes,
  initializeFootprint,
} from '../../commands';
import { IHeaterProps } from '../../../presentation/types';
import { mapHeaterPropsToDomain } from '../../mappers';
import { addHeatersSaga } from '../../usecases/add-heaters';
import { getHouseSaga } from '../../usecases/get-house';

describe('AddHeaters footprint - integration', () => {
  let sagaTester: SagaTester;

  const mockData: IHeaterProps = {
    usage: HEATER_USAGE.MAIN,
    heatType: HEATER_TYPE.ELECTRIC,
    installationYear: 2013,
    previousHeatType: HEATER_TYPE.ELECTRIC,
  };
  const mockUserData = {
    userId: 100000352,
  };
  const user = User.Create({
    id: mockUserData.userId,
    properties: {
      email: new Email('test@test.com'),
    },
  });
  const mockHouse = House.Create({
    userId: user.id,
    houseStatus: HOUSE_STATUS.OCCUPIED,
    houseId: 'houseId',
  });

  beforeEach(() => {
    const initialState: IFootprintState = {
      pending: false,
      house: {
        data: null,
        footprint: null,
        average: null,
        house: null,
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
      error: null,
    };
    sagaTester = new SagaTester({
      initialState,
      reducers: footprintReducer,
    });
  });

  it('Should store correct state if ADD_HEATERS', () => {
    const newState = footprintReducer(undefined, {
      type: IFootprintTypes.ADD_HEATERS,
      payload: mockData,
    });

    expect(newState).toEqual({
      pending: true,
      house: {
        data: null,
        footprint: null,
        average: null,
        house: null,
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
      error: null,
    });
  });

  it('Should store correct state if HOUSE_CREATED', () => {
    sagaTester.start(getHouseSaga);
    sagaTester.dispatch(getHouse());
    sagaTester.dispatch(houseCreated(mockHouse));
    expect(sagaTester.getState()).toEqual({
      pending: false,
      house: {
        data: null,
        footprint: null,
        average: null,
        house: mockHouse,
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
      error: null,
    });
  });

  it('Should store correct state if HEATERS_ADDED', async () => {
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
    sagaTester.start(addHeatersSaga);
    sagaTester.dispatch(addHeaters(mockData));
    sagaTester.dispatch(heatersAdded(houseWitHeaters));
    expect(sagaTester.getState()).toEqual({
      pending: false,
      house: {
        data: null,
        footprint: null,
        average: null,
        house: houseWitHeaters,
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
      error: null,
    });
  });

  it('Should store correct state if HEATERS_NOT_ADDED', async () => {
    sagaTester.start(addHeatersSaga);
    sagaTester.dispatch(addHeaters(mockData));
    sagaTester.dispatch(houseCreated(mockHouse));
    sagaTester.dispatch(heatersNotAdded(new FootprintError.HeaterAlreadyExists('heaterId')));
    expect(sagaTester.getState()).toEqual({
      pending: false,
      house: {
        data: null,
        footprint: null,
        average: null,
        house: mockHouse,
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
      error: new FootprintError.HeaterAlreadyExists('heaterId'),
    });
  });

  it('Should store correct state if INITIALIZE_FOOTPRINT', async () => {
    sagaTester.start(addHeatersSaga);
    sagaTester.dispatch(addHeaters(mockData));
    sagaTester.dispatch(houseCreated(mockHouse));
    sagaTester.dispatch(initializeFootprint());
    expect(sagaTester.getState()).toEqual({
      pending: false,
      house: {
        data: null,
        footprint: null,
        average: null,
        house: mockHouse,
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
      error: null,
    });
  });
});
