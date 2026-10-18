/* eslint-disable  @typescript-eslint/no-explicit-any */
import { takeEvery } from 'redux-saga/effects';
import { testSaga } from 'redux-saga-test-plan';
import Constants from 'expo-constants';

import { HttpConnection } from '@clean-rn/shared/infrastructure';
import { Email } from '@clean-rn/auth/domain';
import { AuthApi } from '@clean-rn/auth/infrastructure';

import { checkEmailApiSaga, checkEmailSaga } from '../../usecases/check-email';
import { ICheckEmailTypes, checkEmailSuccess } from '../../commands/check-email';
import { ISuccess } from '@clean-rn/ddd';

describe('CheckEmail - usecase', () => {
  const httpConnection = HttpConnection.getInstance(Constants.expoConfig?.extra?.BASE_URL_API);
  const api = AuthApi.getInstance(httpConnection);

  const genObject = checkEmailSaga(httpConnection);

  const query = {
    email: new Email('test@example.com'),
  };

  const mockResponse: ISuccess = {
    success: false,
  };

  it('should wait for FETCH_CHECK_EMAIL action and call checkEmailApiSaga, should be done on next iteration', () => {
    expect(genObject.next().value).toEqual(
      takeEvery(ICheckEmailTypes.FETCH_CHECK_EMAIL, checkEmailApiSaga, httpConnection),
    );
    expect(genObject.next().done).toBeTruthy();
  });

  it('should call checkEmailSuccess actions', () => {
    testSaga(checkEmailApiSaga, httpConnection, {
      type: ICheckEmailTypes.FETCH_CHECK_EMAIL,
      payload: query,
    })
      .next()
      .call([api, api.searchEmail], query)
      .next(mockResponse)
      .put(
        checkEmailSuccess({
          success: mockResponse.success,
        }),
      )
      .next();
  });
});
