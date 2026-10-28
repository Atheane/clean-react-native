/* eslint-disable  @typescript-eslint/no-explicit-any */
import SagaTester from 'redux-saga-tester';

import { AuthError, Email, Password } from '@clean-rn/auth/domain';

import { IGender, KYC_REVIEW } from '@clean-rn/user/domain';

import { loginSaga } from '../../usecases/login';

import {
  loginSuccess,
  loginFailure,
  fetchLogin,
  IAuthTypes,
  initializeAuth,
  resetError,
} from '../../commands/login';
import { IAuthState, authReducer } from '../../state-management';
import { HttpConnection, wrapSagaHidingNotFoundError } from '@clean-rn/shared/infrastructure';

describe('Login - integration', () => {
  const mockData = {
    email: new Email('test@example.com'),
    password: new Password('123456'),
    remember: false,
  };

  let sagaTester: SagaTester;

  const mockResponse = {
    accessToken: 'fake-access-token',
    refreshToken: 'fake-refresh-token',
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
    httpConnection = HttpConnection.getInstance(
      process.env.EXPO_PUBLIC_BASE_URL_API || 'https://localhost:3000',
    );
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
});
