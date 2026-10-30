/* eslint-disable  @typescript-eslint/no-explicit-any */
import SagaTester from 'redux-saga-tester';

import {
  HEATER_TYPE,
  HEATER_USAGE,
  HOUSE_STATUS,
  House,
  Heater,
  CarbonError,
} from '@clean-rn/carbon/domain';
import { User } from '@clean-rn/user/domain';
import { Email } from '@clean-rn/auth/domain';

import { ICarbonState, carbonReducer } from '../../state-management';
import {
  addHeaters,
  getHouse,
  heatersAdded,
  heatersNotAdded,
  houseCreated,
  ICarbonTypes,
  initializeCarbon,
} from '../../commands';
import { IHeaterProps } from '../../../presentation/types';
import { addHeatersSaga } from '../../usecases/add-heaters';
import { mapHeaterPropsToDomain } from '../../mappers';
import { getHouseSaga } from '../../usecases/get-house';
import { HttpConnection } from '@clean-rn/shared/infrastructure';

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

  let httpConnection: HttpConnection;

  beforeEach(() => {
    const initialState: ICarbonState = {
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
      reducers: carbonReducer,
    });
    httpConnection = {
      baseUrl: 'http://mock-api.com',
      options: jest.fn(),
      handleError: jest.fn(),
      getDefaultHeaders: jest.fn(),
      attachBearerToken: jest.fn(),
    };
    HttpConnection.getInstance.mockReturnValue(httpConnection);
    global.fetch = jest.fn();
  });

  afterEach(() => {
    jest.resetAllMocks();
    jest.clearAllMocks();
  });

  it('Should store correct state if ADD_HEATERS', () => {
    const newState = carbonReducer(undefined, {
      type: ICarbonTypes.ADD_HEATERS,
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
    sagaTester.dispatch(heatersNotAdded(new CarbonError.HeaterAlreadyExists('heaterId')));
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
      error: new CarbonError.HeaterAlreadyExists('heaterId'),
    });
  });

  it('Should store correct state if INITIALIZE_CARBON', async () => {
    sagaTester.start(addHeatersSaga);
    sagaTester.dispatch(addHeaters(mockData));
    sagaTester.dispatch(houseCreated(mockHouse));
    sagaTester.dispatch(initializeCarbon());
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
