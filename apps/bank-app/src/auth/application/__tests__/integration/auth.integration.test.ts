/* eslint-disable  @typescript-eslint/no-explicit-any */
import SagaTester from 'redux-saga-tester';
import Constants from 'expo-constants';

import { AuthError, Email, Password } from '@clean-rn/auth/domain';

import { IGender, KYC_REVIEW } from '@clean-rn/user/domain';

import { loginSaga } from '../../usecases/login';
import { refreshSaga } from '../../usecases/refresh';
import { resetPasswordSaga } from '../../usecases/reset-password';
import { logoutSaga } from '../../usecases/logout';

import {
  loginSuccess,
  loginFailure,
  fetchLogin,
  IAuthTypes,
  initializeAuth,
  resetError,
  fetchRefresh,
  refreshSuccess,
  fetchResetPassword,
  passwordReset,
  fetchLogout,
  loggedOut,
} from '../../commands';
import { IAuthState, authReducer } from '../../state-management';
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

  const mockSuccess = {
    success: true,
  };

  let httpConnection: HttpConnection;

  const mockUserData = {
    birthday: '1984-10-06T00:00:00.000Z',
    email: 'dev1@example.com',
    firstname: 'Jane',
    lastname: 'Doe',
    nationality: 'FR',
    phone: '+33600000002',
    specifiedUSPerson: 0,
    title: 'Mme',
    userId: 3952561,
    kycReview: KYC_REVIEW.NONE,
  };

  let gender = IGender.NEUTRAL;
  if (mockUserData.title === 'Mme') {
    gender = IGender.WOMAN;
  } else if (mockUserData.title === 'M') {
    gender = IGender.MAN;
  }

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
    const initialState: IAuthState = {
      pending: false,
      auth: {
        accessToken: null,
        refreshToken: null,
      },
      email: null,
      password: null,
      error: null,
      success: null,
    };
    sagaTester = new SagaTester({
      initialState,
      reducers: authReducer,
    });
  });

  it('Should store correct initial state if not initial state is provided', () => {
    const newState = authReducer(undefined, {
      type: IAuthTypes.FETCH_LOGIN,
      payload: mockData,
    });

    expect(newState).toEqual({
      pending: true,
      auth: {
        accessToken: null,
        refreshToken: null,
      },
      email: mockData.email,
      password: mockData.password,
      error: null,
      success: null,
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
      email: mockData.email,
      password: mockData.password,
      success: null,
    });
  });

  it('Should store correct state in case if RESET_ERROR', () => {
    sagaTester.dispatch(resetError());

    expect(sagaTester.getState()).toEqual({
      pending: false,
      auth: {
        accessToken: null,
        refreshToken: null,
      },
      error: null,
      email: null,
      password: null,
      success: null,
    });
  });

  it('Should store correct state if LOGIN_SUCCESS', () => {
    sagaTester.start(wrapSagaHidingNotFoundError, loginSaga, httpConnection);
    sagaTester.dispatch(fetchLogin(mockData));
    sagaTester.dispatch(loginSuccess({ auth: mockResponse }));

    expect(sagaTester.getState()).toEqual({
      pending: false,
      auth: mockResponse,
      error: null,
      email: mockData.email,
      password: mockData.password,
      success: null,
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
      email: mockData.email,
      password: mockData.password,
      error: new AuthError.LoginFailureInvalidCredentials(),
      success: null,
    });
  });

  it('Should store correct state if REFRESH_SUCCESS', () => {
    sagaTester.start(wrapSagaHidingNotFoundError, refreshSaga, httpConnection);
    sagaTester.dispatch(fetchRefresh());
    sagaTester.dispatch(refreshSuccess({ auth: mockResponse }));
    expect(sagaTester.getState()).toEqual({
      pending: false,
      auth: mockResponse,
      error: null,
      email: null,
      password: null,
      success: null,
    });
  });

  it('Should store correct state if INITIALIZE_AUTH for invalid credentials', () => {
    sagaTester.start(wrapSagaHidingNotFoundError, loginSaga, httpConnection);
    sagaTester.dispatch(fetchLogin(mockData));
    sagaTester.dispatch(initializeAuth());

    expect(sagaTester.getState()).toEqual({
      pending: false,
      auth: {
        accessToken: null,
        refreshToken: null,
      },
      email: null,
      password: null,
      error: null,
      success: null,
    });
  });

  it('should store correct initial state if no initial state is provided', () => {
    const newState = authReducer(undefined, {
      type: IAuthTypes.FETCH_RESET_PASSWORD,
      payload: mockData,
    });

    expect(newState).toEqual({
      pending: true,
      auth: {
        accessToken: null,
        refreshToken: null,
      },
      email: null,
      password: null,
      error: null,
      success: null,
    });
  });

  it('Should store correct state in case if FETCH_RESET_PASSWORD', () => {
    sagaTester.start(wrapSagaHidingNotFoundError, resetPasswordSaga, httpConnection);

    sagaTester.dispatch(fetchResetPassword(mockData));

    expect(sagaTester.getState()).toEqual({
      pending: true,
      auth: {
        accessToken: null,
        refreshToken: null,
      },
      email: null,
      password: null,
      error: null,
      success: null,
    });
  });

  it('Should store correct state if RESET_PASSWORD_SUCCESS', () => {
    sagaTester.start(wrapSagaHidingNotFoundError, resetPasswordSaga, httpConnection);
    sagaTester.dispatch(fetchResetPassword(mockData));
    sagaTester.dispatch(passwordReset({ success: mockSuccess.success }));

    expect(sagaTester.getState()).toEqual({
      pending: false,
      auth: {
        accessToken: null,
        refreshToken: null,
      },
      email: null,
      password: null,
      error: null,
      success: mockSuccess.success,
    });
  });

  it('Should store correct state if LOGGED_OUT', () => {
    sagaTester.start(wrapSagaHidingNotFoundError, logoutSaga, httpConnection);
    sagaTester.dispatch(fetchLogout());
    sagaTester.dispatch(loggedOut());

    expect(sagaTester.getState()).toEqual({
      pending: false,
      auth: {
        accessToken: null,
        refreshToken: null,
      },
      email: null,
      password: null,
      error: null,
      success: null,
    });
  });
});
