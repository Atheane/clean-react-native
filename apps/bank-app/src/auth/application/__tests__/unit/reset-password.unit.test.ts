/* eslint-disable  @typescript-eslint/no-explicit-any */
import { takeEvery } from 'redux-saga/effects';
import { testSaga } from 'redux-saga-test-plan';
import Constants from 'expo-constants';

import { HttpConnection, ServerError } from '@clean-rn/shared/infrastructure';
import { Email } from '@clean-rn/auth/domain';
import { AuthApi } from '@clean-rn/auth/infrastructure';

import { resetPasswordGenerator, resetPasswordSaga } from '../../usecases/reset-password';
import { IResetPasswordTypes, initializeResetPassword, passwordReset } from '../../commands/reset-password';
import { showUnknownError } from '../../../../shared/application/commands/manage-global-errors';
import { fetchRefresh } from '../../../../auth/application/commands/login';

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

  const mockError401 = {
    statusCode: 401,
    message: 'Unauthorized',
    response: {
      statusCode: 401,
      message: 'Unauthorized',
    },
    timestamp: '2023-10-03T13:20:21.303Z',
    path: '/app/account',
    method: 'GET',
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
      takeEvery(IResetPasswordTypes.FETCH_RESET_PASSWORD, resetPasswordGenerator, httpConnection),
    );
    expect(genObject.next().done).toBeTruthy();
  });

  it('should call resetPasswordSuccess actions', () => {
    testSaga(resetPasswordGenerator, httpConnection, {
      type: IResetPasswordTypes.FETCH_RESET_PASSWORD,
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

  it('Should call navigate to Login modale if 401 from Server', () => {
    testSaga(resetPasswordGenerator, httpConnection, {
      type: IResetPasswordTypes.FETCH_RESET_PASSWORD,
      payload: mockData,
    })
      .next()
      .call([api, api.resetPassword], mockData)
      .throw(new ServerError(mockError401))
      .put(fetchRefresh())
      .next()
      .cancel();
  });

  it('Should call showUnknownError action if 500', () => {
    testSaga(resetPasswordGenerator, httpConnection, {
      type: IResetPasswordTypes.FETCH_RESET_PASSWORD,
      payload: mockData,
    })
      .next()
      .call([api, api.resetPassword], mockData)
      .throw(new ServerError(mockError500))
      .put(initializeResetPassword())
      .next()
      .put(showUnknownError(new ServerError(mockError500)))
      .next();
  });
});
