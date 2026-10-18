import SagaTester from 'redux-saga-tester';
import { Email } from '@clean-rn/auth/domain';

import { initializationSaga } from '../../usecases/initialization';
import {
  IInitializationTypes,
  initializeApplication,
  initializeApplicationSuccess,
} from '../../commands/initialization';
import { IInitializationState, initializationReducer } from '../../state-management';

describe('Initialization - integration', () => {
  let sagaTester: SagaTester;

  beforeEach(() => {
    const initialState: IInitializationState = {
      pending: false,
      email: null,
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
    });
  });

  it('Should store correct state in case if INITIALIZE_APPLICATION', () => {
    sagaTester.start(initializationSaga);

    sagaTester.dispatch(initializeApplication());

    expect(sagaTester.getState()).toEqual({
      pending: true,
      email: null,
    });
  });

  it('Should store correct state in case if INITIALIZE_APPLICATION_SUCCESS', () => {
    sagaTester.start(initializationSaga);

    sagaTester.dispatch(initializeApplication());
    sagaTester.dispatch(initializeApplicationSuccess(new Email('test@example.com')));

    expect(sagaTester.getState()).toEqual({
      pending: false,
      email: new Email('test@example.com'),
    });
  });
});
