/* eslint-disable  @typescript-eslint/no-explicit-any */
import { takeEvery } from 'redux-saga/effects';
import { testSaga } from 'redux-saga-test-plan';
import Constants from 'expo-constants';

import { HttpConnection } from '@clean-rn/shared/infrastructure';
import { Email } from '@clean-rn/auth/domain';
import { AuthApi } from '@clean-rn/auth/infrastructure';

import { resetPasswordApiSaga, resetPasswordSaga } from '../../usecases/reset-password';
import { IResetPasswordTypes, passwordReset } from '../../commands/reset-password';

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

  it('should wait for FETCH_RESET_PASSWORD action and call resetPasswordApiSaga, should be done on next iteration', () => {
    expect(genObject.next().value).toEqual(
      takeEvery(IResetPasswordTypes.FETCH_RESET_PASSWORD, resetPasswordApiSaga, httpConnection),
    );
    expect(genObject.next().done).toBeTruthy();
  });

  it('should call resetPasswordSuccess actions', () => {
    testSaga(resetPasswordApiSaga, httpConnection, {
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
});
