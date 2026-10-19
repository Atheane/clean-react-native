import SagaTester from 'redux-saga-tester';
import { Email } from '@clean-rn/auth/domain';

import { loadStorageSaga } from '../../usecases/load-storage';
import { IInitializationTypes, loadStorage, storageLoaded } from '../../commands/initialize-application';
import { IInitializationState, initializationReducer } from '../../state-management';

describe('Load Storage - integration', () => {
  let sagaTester: SagaTester;

  beforeEach(() => {
    const initialState: IInitializationState = {
      pending: false,
      email: null,
      initRouteName: undefined,
      carbon: {
        house: {
          footprint: null,
          average: null,
        },
        transport: {
          footprint: null,
          average: null,
        },
        food: {
          footprint: null,
          average: null,
        },
        fly: {
          footprint: null,
          average: null,
        },
      },
    };
    sagaTester = new SagaTester({
      initialState,
      reducers: initializationReducer,
    });
  });

  it('Should store correct initial state if not initial state is provided', () => {
    const newState = initializationReducer(undefined, {
      type: IInitializationTypes.LOAD_STORAGE,
    });

    expect(newState).toEqual({
      pending: true,
      email: null,
      initRouteName: undefined,
      carbon: {
        house: {
          footprint: null,
          average: null,
        },
        transport: {
          footprint: null,
          average: null,
        },
        food: {
          footprint: null,
          average: null,
        },
        fly: {
          footprint: null,
          average: null,
        },
      },
    });
  });

  it('Should store correct state in case if LOAD_STORAGE', () => {
    sagaTester.start(loadStorageSaga);

    sagaTester.dispatch(loadStorage());

    expect(sagaTester.getState()).toEqual({
      pending: true,
      email: null,
      initRouteName: undefined,
      carbon: {
        house: {
          footprint: null,
          average: null,
        },
        transport: {
          footprint: null,
          average: null,
        },
        food: {
          footprint: null,
          average: null,
        },
        fly: {
          footprint: null,
          average: null,
        },
      },
    });
  });

  it('Should store correct state in case if STORAGE_LOADED', () => {
    sagaTester.start(loadStorageSaga);

    sagaTester.dispatch(loadStorage());
    sagaTester.dispatch(
      storageLoaded({
        email: new Email('test@example.com'),
      }),
    );

    expect(sagaTester.getState()).toEqual({
      pending: false,
      email: new Email('test@example.com'),
      initRouteName: undefined,
      carbon: {
        house: {
          footprint: null,
          average: null,
        },
        transport: {
          footprint: null,
          average: null,
        },
        food: {
          footprint: null,
          average: null,
        },
        fly: {
          footprint: null,
          average: null,
        },
      },
    });
  });
});
