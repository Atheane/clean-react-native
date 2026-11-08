import { takeEvery } from 'redux-saga/effects';
import { testSaga } from 'redux-saga-test-plan';

import { HttpConnection, ServerError } from '@clean-rn/shared/infrastructure';
import { UserApi } from '@clean-rn/user/infrastructure';

import { IParametersStackPages } from '../../../../shared/presentation/types';
import { navigate } from '../../../../shared/presentation/navigation/navigationRef';
import { showUnknownError } from '../../../../shared/application/commands/manage-global-errors';

import { deleteUserAccountGenerator, deleteUserAccountSaga } from '../../usecases';
import { IUserTypes, initializeUser, resetError } from '../../commands';
import { ensureTokenRefreshed } from '../../../../shared/application/usecases/ensureTokenRefreshed';

jest.mock('@clean-rn/shared/infrastructure', () => ({
  HttpConnection: {
    getInstance: jest.fn(),
  },
  ServerError: jest.fn().mockImplementation(function (error) {
    this.message = error.message;
    this.name = 'ServerError';
    this.statusCode = error.statusCode;
    this.codeError = error.codeError;
    this.cause = error.response;
  }),
}));

describe('Delete User Account - usecase', () => {
  let httpConnection: HttpConnection;
  let userApi: UserApi;

  beforeEach(() => {
    httpConnection = {
      baseUrl: 'http://mock-api.com',
      options: jest.fn(),
      handleError: jest.fn(),
      getDefaultHeaders: jest.fn(),
      attachBearerToken: jest.fn(),
    };
    HttpConnection.getInstance.mockReturnValue(httpConnection);
    global.fetch = jest.fn();
    userApi = UserApi.getInstance(httpConnection);
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  const mockError500 = {
    message: 'Core::AuthService::Auth - Server Error',
    statusCode: 500,
    response: 'Core::AuthService::Auth - Server Error',
    timestamp: '2023-04-07T15:28:04.657Z',
    path: '/auth/login',
  };

  it('should wait for FETCH_DELETE_USER_ACCOUNT action and call deleteUserAccountGenerator, should be done on next iteration', () => {
    const genObject = deleteUserAccountSaga(httpConnection);

    expect(genObject.next().value).toEqual(
      takeEvery(IUserTypes.FETCH_DELETE_USER_ACCOUNT, deleteUserAccountGenerator, httpConnection),
    );
    expect(genObject.next().done).toBeTruthy();
  });

  it('should call userAccountDeleted actions if email does not exists', () => {
    testSaga(deleteUserAccountGenerator, httpConnection)
      .next()
      .call(ensureTokenRefreshed, httpConnection)
      .next()
      .call([userApi, userApi.deleteUserAccount])
      .next()
      .put(initializeUser())
      .next()
      .call(navigate, { route: IParametersStackPages.GOODBYE })
      .next();
  });

  it('should call showUnknownError if 500', () => {
    testSaga(deleteUserAccountGenerator, httpConnection)
      .next()
      .call(ensureTokenRefreshed, httpConnection)
      .next()
      .call([userApi, userApi.deleteUserAccount])
      .next()
      .throw(new ServerError(mockError500))
      .put(resetError())
      .next()
      .put(showUnknownError(new ServerError(mockError500)))
      .next();
  });

  it('should call showUnknownError if unknown error', () => {
    testSaga(deleteUserAccountGenerator, httpConnection)
      .next()
      .call(ensureTokenRefreshed, httpConnection)
      .next()
      .call([userApi, userApi.deleteUserAccount])
      .next()
      .throw(new Error('unknown error'))
      .put(resetError())
      .next()
      .put(showUnknownError(new Error('unknown error')))
      .next();
  });
});
