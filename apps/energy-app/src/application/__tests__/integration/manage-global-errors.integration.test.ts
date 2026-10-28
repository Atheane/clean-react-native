import SagaTester from 'redux-saga-tester';

import { showUnknownErrorSaga } from '../../usecases/manage-global-errors';
import { IGlobalErrorTypes, showUnknownError, initGlobalError } from '../../commands/manage-global-errors';
import { IGlobalErrorState, globalErrorReducer } from '../../state-management';

describe('Manage Global Errors - integration', () => {
  let sagaTester: SagaTester;

  beforeEach(() => {
    const initialState: IGlobalErrorState = {
      error: null,
    };
    sagaTester = new SagaTester({
      initialState,
      reducers: globalErrorReducer,
    });
  });

  it('Should store correct initial state if not initial state is provided', () => {
    const newState = globalErrorReducer(undefined, {
      type: IGlobalErrorTypes.INIT_GLOBAL_ERROR,
    });

    expect(newState).toEqual({
      error: null,
    });
  });

  it('Should store correct state in case if SHOW_UNKNOWN_ERROR', () => {
    sagaTester.start(showUnknownErrorSaga);

    sagaTester.dispatch(showUnknownError(new Error('test2')));

    expect(sagaTester.getState()).toEqual({
      error: new Error('test2'),
    });
  });

  it('Should store correct state in case if INIT_GLOBAL_ERROR', () => {
    sagaTester.start(showUnknownErrorSaga);

    sagaTester.dispatch(initGlobalError());

    expect(sagaTester.getState()).toEqual({
      error: null,
    });
  });
});
