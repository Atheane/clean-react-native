/* eslint-disable  @typescript-eslint/no-explicit-any */
import SagaTester from 'redux-saga-tester';
import Constants from 'expo-constants';

import { AuthError, Email } from '@clean-rn/auth/domain';

import { loginSaga } from '../../usecases/login';
import { loginSuccess, loginFailure, fetchLogin, ILoginTypes } from '../../commands/login';
import { ILoginState, loginReducer } from '../../state-management';
import { HttpConnection } from '@clean-rn/shared/infrastructure';

describe('Login - integration', () => {
  const mockData = {
    email: new Email('test@example.com'),
    password: '123456',
  };

  let sagaTester: SagaTester;

  const mockResponse = {
    accessToken: 'fake-access-token',
    refreshToken: 'fake-refresh-token',
  };

  beforeAll(async () => {
    HttpConnection.getInstance(Constants.expoConfig?.extra?.BASE_URL_API);
  });

  beforeEach(() => {
    const initialState: ILoginState = {
      pending: false,
      auth: {
        accessToken: null,
        refreshToken: null,
      },
      error: null,
    };
    sagaTester = new SagaTester({
      initialState,
      reducers: loginReducer,
    });
  });

  it('Should store correct initial state if not initial state is provided', () => {
    const newState = loginReducer(undefined, {
      type: ILoginTypes.FETCH_LOGIN,
      payload: mockData,
    });

    expect(newState).toEqual({
      pending: true,
      auth: {
        accessToken: null,
        refreshToken: null,
      },
      error: null,
    });
  });

  it('Should store correct state in case if FETCH_LOGIN', () => {
    sagaTester.start(loginSaga);

    sagaTester.dispatch(fetchLogin(mockData));

    expect(sagaTester.getState()).toEqual({
      pending: true,
      auth: {
        accessToken: null,
        refreshToken: null,
      },
      error: null,
    });
  });

  it('Should store correct state if LOGIN_SUCCESS', () => {
    sagaTester.start(loginSaga);
    sagaTester.dispatch(fetchLogin(mockData));
    sagaTester.dispatch(loginSuccess(mockResponse));

    expect(sagaTester.getState()).toEqual({
      pending: false,
      auth: mockResponse,
      error: null,
    });
  });

  it('Should store correct state if LOGIN_FAILURE for invalid credentials', () => {
    sagaTester.start(loginSaga);
    sagaTester.dispatch(fetchLogin(mockData));
    sagaTester.dispatch(loginFailure(new AuthError.LoginFailureInvalidCredentials()));

    expect(sagaTester.getState()).toEqual({
      pending: false,
      auth: {
        accessToken: null,
        refreshToken: null,
      },
      error: new AuthError.LoginFailureInvalidCredentials(),
    });
  });
});
