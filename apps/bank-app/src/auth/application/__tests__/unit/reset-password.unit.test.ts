/* eslint-disable  @typescript-eslint/no-explicit-any */
import { takeEvery } from 'redux-saga/effects';
import { testSaga } from 'redux-saga-test-plan';

import { HttpConnection, ServerError } from '@clean-rn/shared/infrastructure';
import { AuthError, Email } from '@clean-rn/auth/domain';
import { AuthApi } from '@clean-rn/auth/infrastructure';

import { resetPasswordGenerator, resetPasswordSaga } from '../../usecases/reset-password';
import { IAuthTypes, initializeAuth, passwordReset } from '../../commands';
import { showUnknownError } from '../../../../shared/application/commands/manage-global-errors';

describe('ResetPassword - usecase', () => {
  const httpConnection = HttpConnection.getInstance(process.env.EXPO_PUBLIC_BASE_URL_API || '');
  const api = AuthApi.getInstance(httpConnection);

  const genObject = resetPasswordSaga(httpConnection);

  const mockData = {
    email: new Email('test@example.com'),
  };

  const mockError500 = {
    message: 'Core::AuthService::Auth - Server Error',
    statusCode: 500,
    response: 'Core::AuthService::Auth - Server Error',
    timestamp: '2023-04-07T15:28:04.657Z',
    path: '/auth/login',
  };

  it('should wait for FETCH_RESET_PASSWORD action and call resetPasswordApiSaga, should be done on next iteration', () => {
    expect(genObject.next().value).toEqual(
      takeEvery(IAuthTypes.FETCH_RESET_PASSWORD, resetPasswordGenerator, httpConnection),
    );
    expect(genObject.next().done).toBeTruthy();
  });

  it('should call passwordReset if success true from api', () => {
    testSaga(resetPasswordGenerator, httpConnection, {
      type: IAuthTypes.FETCH_RESET_PASSWORD,
      payload: mockData,
    })
      .next()
      .call([api, api.resetPassword], mockData)
      .next({ success: true })
      .put(
        passwordReset({
          success: true,
        }),
      )
      .next();
  });

  it('should throw PasswordResetFailure if success false from api', () => {
    testSaga(resetPasswordGenerator, httpConnection, {
      type: IAuthTypes.FETCH_RESET_PASSWORD,
      payload: mockData,
    })
      .next()
      .call([api, api.resetPassword], mockData)
      .next({ success: false })
      .put(initializeAuth())
      .next()
      .put(showUnknownError(new AuthError.PasswordResetFailure()))
      .next();
  });

  it('Should call showUnknownError action if 500', () => {
    testSaga(resetPasswordGenerator, httpConnection, {
      type: IAuthTypes.FETCH_RESET_PASSWORD,
      payload: mockData,
    })
      .next()
      .call([api, api.resetPassword], mockData)
      .throw(new ServerError(mockError500))
      .put(initializeAuth())
      .next()
      .put(showUnknownError(new ServerError(mockError500)))
      .next();
  });
});
