/* eslint-disable  @typescript-eslint/no-explicit-any */
import { takeEvery } from 'redux-saga/effects';
import { testSaga } from 'redux-saga-test-plan';
import Constants from 'expo-constants';

import { HttpConnection, ServerError } from '@clean-rn/shared/infrastructure';
import { Email } from '@clean-rn/auth/domain';
import { AuthApi } from '@clean-rn/auth/infrastructure';

import { resetPasswordGenerator, resetPasswordSaga } from '../../usecases/reset-password';
import { IAuthTypes, initializeAuth, passwordReset } from '../../commands';
import { showUnknownError } from '../../../../shared/application/commands/manage-global-errors';

describe('ResetPassword - usecase', () => {
  const httpConnection = HttpConnection.getInstance(Constants.expoConfig?.extra?.BASE_URL_API);
  const api = AuthApi.getInstance(httpConnection);

  const genObject = resetPasswordSaga(httpConnection);

  const mockData = {
    email: new Email('test@example.com'),
  };

  const mockResponse = {
    success: true,
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

  it('should call resetPasswordSuccess actions', () => {
    testSaga(resetPasswordGenerator, httpConnection, {
      type: IAuthTypes.FETCH_RESET_PASSWORD,
      payload: mockData,
    })
      .next()
      .call([api, api.resetPassword], mockData)
      .next(mockResponse)
      .put(
        passwordReset({
          success: mockResponse.success,
        }),
      )
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
