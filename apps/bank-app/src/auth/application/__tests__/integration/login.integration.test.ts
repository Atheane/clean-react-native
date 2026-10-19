/* eslint-disable  @typescript-eslint/no-explicit-any */
import SagaTester from 'redux-saga-tester';
import Constants from 'expo-constants';

import { AuthError, Email, Password } from '@clean-rn/auth/domain';

import { loginSaga } from '../../usecases/login';
import { loginSuccess, loginFailure, fetchLogin, ILoginTypes, initializeLogin } from '../../commands/login';
import { ILoginState, loginReducer } from '../../state-management';
import { HttpConnection, wrapSagaHidingNotFoundError } from '@clean-rn/shared/infrastructure';

const expoConstantsMock = {
  name: 'CleanRN BankApp Test',
  slug: 'clean-rn-bank-app-test',
  extra: {
    BASE_URL_API: 'https://fake-api.com',
    NODE_ENV: 'test',
  },
};

jest.mock('expo-constants', () => expoConstantsMock);

describe('Login - integration', () => {
  const mockData = {
    email: new Email('test@example.com'),
    password: new Password('123456'),
  };

  let sagaTester: SagaTester;

  const mockResponse = {
    accessToken: 'fake-access-token',
    refreshToken: 'fake-refresh-token',
  };

  let httpConnection: HttpConnection;

  beforeAll(() => {
    Constants.expoConfig = {
      name: 'CleanRN BankApp Test',
      slug: 'clean-rn-bank-app-test',
      extra: {
        BASE_URL_API: 'https://fake-api.com',
        NODE_ENV: 'test',
      },
    };
    httpConnection = HttpConnection.getInstance(Constants.expoConfig?.extra?.BASE_URL_API);
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
    sagaTester.start(wrapSagaHidingNotFoundError, loginSaga, httpConnection);

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
    sagaTester.start(wrapSagaHidingNotFoundError, loginSaga, httpConnection);
    sagaTester.dispatch(fetchLogin(mockData));
    sagaTester.dispatch(loginSuccess(mockResponse));

    expect(sagaTester.getState()).toEqual({
      pending: false,
      auth: mockResponse,
      error: null,
    });
  });

  it('Should store correct state if LOGIN_FAILURE for invalid credentials', () => {
    sagaTester.start(wrapSagaHidingNotFoundError, loginSaga, httpConnection);
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

  it('Should store correct state if INITIALIZE_LOGIN for invalid credentials', () => {
    sagaTester.start(wrapSagaHidingNotFoundError, loginSaga, httpConnection);
    sagaTester.dispatch(fetchLogin(mockData));
    sagaTester.dispatch(initializeLogin());

    expect(sagaTester.getState()).toEqual({
      pending: false,
      auth: {
        accessToken: null,
        refreshToken: null,
      },
      error: null,
    });
  });
});
