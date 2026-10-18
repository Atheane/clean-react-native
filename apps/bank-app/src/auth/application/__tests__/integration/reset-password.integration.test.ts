/* eslint-disable  @typescript-eslint/no-explicit-any */
import SagaTester from 'redux-saga-tester';

import { Email } from '@clean-rn/auth/domain';

import { resetPasswordSaga } from '../../usecases/reset-password';
import {
  IResetPasswordTypes,
  fetchResetPassword,
  resetPasswordSuccess,
  initResetPassword,
} from '../../commands/reset-password';
import { resetPasswordReducer } from '../../state-management';
import { HttpConnection } from '@clean-rn/shared/infrastructure';

describe('ResetPassword - integration', () => {
  const mockData = {
    email: new Email('test@example.com'),
  };

  const mockResponse = {
    success: true,
  };

  let sagaTester: SagaTester;

  const httpConnection = HttpConnection.getInstance('https://fake-api.com');

  beforeEach(() => {
    const initialState = {
      pending: false,
      success: null,
    };
    sagaTester = new SagaTester({
      initialState,
      reducers: resetPasswordReducer,
    });
  });

  it('should store correct initial state if no initial state is provided', () => {
    const newState = resetPasswordReducer(undefined, {
      type: IResetPasswordTypes.FETCH_RESET_PASSWORD,
      payload: mockData,
    });

    expect(newState).toEqual({
      pending: true,
      success: null,
    });
  });

  it('Should store correct state in case if FETCH_RESET_PASSWORD', () => {
    sagaTester.start(resetPasswordSaga, httpConnection);

    sagaTester.dispatch(fetchResetPassword(mockData));

    expect(sagaTester.getState()).toEqual({
      pending: true,
      success: null,
    });
  });

  it('Should store correct state if RESET_PASSWORD_SUCCESS', () => {
    sagaTester.start(resetPasswordSaga, httpConnection);
    sagaTester.dispatch(fetchResetPassword(mockData));
    sagaTester.dispatch(resetPasswordSuccess({ success: mockResponse.success }));

    expect(sagaTester.getState()).toEqual({
      pending: false,
      success: mockResponse.success,
    });
  });

  it('Should store correct state in case if INIT_RESET_PASSWORD', () => {
    sagaTester.start(resetPasswordSaga, httpConnection);

    sagaTester.dispatch(initResetPassword());

    expect(sagaTester.getState()).toEqual({
      pending: false,
      success: null,
    });
  });
});
