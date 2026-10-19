import SagaTester from 'redux-saga-tester';
import { Email } from '@clean-rn/auth/domain';

import { initializeApplicationSaga } from '../../usecases/initialize-application';
import {
  IInitializationTypes,
  initializeApplication,
  applicationInitialized,
} from '../../commands/initialize-application';
import { IInitializationState, initializationReducer } from '../../state-management';
import { IAuthStackPages } from '../../../presentation/types';

describe('Initialization - integration', () => {
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
      type: IInitializationTypes.INITIALIZE_APPLICATION,
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

  it('Should store correct state in case if INITIALIZE_APPLICATION', () => {
    sagaTester.start(initializeApplicationSaga);

    sagaTester.dispatch(initializeApplication());

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

  it('Should store correct state in case if INITIALIZE_APPLICATION_SUCCESS', () => {
    sagaTester.start(initializeApplicationSaga);

    sagaTester.dispatch(initializeApplication());
    sagaTester.dispatch(
      applicationInitialized({
        email: new Email('test@example.com'),
        initRouteName: IAuthStackPages.LOGIN,
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
      }),
    );

    expect(sagaTester.getState()).toEqual({
      pending: false,
      email: new Email('test@example.com'),
      initRouteName: IAuthStackPages.LOGIN,
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
