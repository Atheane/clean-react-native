import { takeEvery } from 'redux-saga/effects';
import { testSaga } from 'redux-saga-test-plan';

import { HttpConnection, ServerError } from '@clean-rn/shared/infrastructure';
import { UserApi } from '@clean-rn/user/infrastructure';

import { IProfileStackPages } from '../../../../shared/presentation/types';
import { navigate } from '../../../../shared/presentation/navigation/navigationRef';
import { showUnknownError } from '../../../../shared/application/commands/manage-global-errors';

import { deleteUserAccountGenerator, deleteUserAccountSaga } from '../../usecases';
import { IUserTypes, initializeUser, resetError } from '../../commands';
import { ensureTokenRefreshed } from '../../../../shared/application/usecases/ensureTokenRefreshed';

describe('Delete User Account - usecase', () => {
  const httpConnection = HttpConnection.getInstance(process.env.EXPO_PUBLIC_BASE_URL_API || '');
  const userApi = UserApi.getInstance(httpConnection);

  const mockError500 = {
    message: 'Core::AuthService::Auth - Server Error',
    statusCode: 500,
    response: 'Core::AuthService::Auth - Server Error',
    timestamp: '2023-04-07T15:28:04.657Z',
    path: '/auth/login',
  };

  const genObject = deleteUserAccountSaga(httpConnection);

  it('should wait for FETCH_DELETE_USER_ACCOUNT action and call deleteUserAccountGenerator, should be done on next iteration', () => {
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
      .call(navigate, { route: IProfileStackPages.GOODBYE })
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
