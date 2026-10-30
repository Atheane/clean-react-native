/* eslint-disable  @typescript-eslint/no-explicit-any */
import SagaTester from 'redux-saga-tester';

import { FootprintError, Footprint, FOOTPRINT_UNIT } from '@clean-rn/footprint/domain';

import { IFootprintState, footprintReducer } from '../../state-management';
import {
  createFootprint,
  footprintCreated,
  footprintNotCreated,
  IFootprintTypes,
  initializeFootprint,
} from '../../commands';
import { IFootprintProps } from '../../../presentation/types';
import { mapFootprintPropsToDomain } from '../../mappers';
import { createFootprintSaga } from '../../usecases/create-footprint';

describe('Create footprint - integration', () => {
  let sagaTester: SagaTester;

  const mockData: IFootprintProps = {
    adultNumber: 2,
    childNumber: 1,
  };

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
      house: null,
      footprint: null,
      error: null,
    };
    sagaTester = new SagaTester({
      initialState,
      reducers: footprintReducer,
    });
  });

  it('Should store correct state if CREATE_FOOTPRINT', () => {
    const newState = footprintReducer(undefined, {
      type: IFootprintTypes.CREATE_FOOTPRINT,
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
      house: null,
      footprint: null,
      error: null,
    });
  });

  it('Should store correct state if FOOTPRINT_CREATED', async () => {
    const footprintVO = await mapFootprintPropsToDomain(mockData);
    const footprint = Footprint.Create({
      footprint: footprintVO,
      userId: 'userId',
      unit: FOOTPRINT_UNIT.CO2,
      startDate: new Date(),
      endDate: new Date(),
    });
    sagaTester.start(createFootprintSaga);
    sagaTester.dispatch(createFootprint());
    sagaTester.dispatch(footprintCreated(footprint));
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
      house: null,
      footprint: footprint,
      error: null,
    });
  });

  it('Should store correct state if FOOTPRINT_NOT_CREATED', async () => {
    sagaTester.start(createFootprintSaga);
    sagaTester.dispatch(createFootprint());
    sagaTester.dispatch(footprintNotCreated(new FootprintError.InvalidAdultNumber()));
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
      house: null,
      footprint: null,
      error: new FootprintError.InvalidAdultNumber(),
    });
  });
  it('Should store correct state if INITIALIZE_FOOTPRINT', async () => {
    sagaTester.start(createFootprintSaga);
    sagaTester.dispatch(createFootprint());
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
      house: null,
      footprint: null,
      error: null,
    });
  });
});
