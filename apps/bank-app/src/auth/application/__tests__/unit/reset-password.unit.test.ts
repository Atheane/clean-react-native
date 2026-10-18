/* eslint-disable  @typescript-eslint/no-explicit-any */
import { takeEvery } from 'redux-saga/effects';
import { testSaga } from 'redux-saga-test-plan';
import nock from 'nock';
import * as path from 'path';

import { HttpConnection } from '@clean-rn/shared/infrastructure';
import { Email } from '@clean-rn/auth/domain';
import { AuthApi } from '@clean-rn/auth/infrastructure';

import { resetPasswordApiSaga, resetPasswordSaga } from '../../usecases/reset-password';
import { IResetPasswordTypes, resetPasswordSuccess } from '../../commands/reset-password';

describe('ResetPassword - usecase', () => {
  const genObject = resetPasswordSaga();

  const mockData = {
    email: new Email('test@example.com'),
  };

  const mockResponse = {
    success: true,
  };

  const httpConnection = HttpConnection.getInstance('https://sandbox.example.com');
  const api = AuthApi.getInstance(httpConnection);

  beforeAll(async () => {
    nock.disableNetConnect();
    nock.back.fixtures = path.resolve(`${__dirname}/fixtures`);
    nock.back.setMode('record');
  });

  afterAll(() => {
    nock.cleanAll();
  });

  it('should wait for FETCH_RESET_PASSWORD action and call resetPasswordApiSaga, should be done on next iteration', () => {
    expect(genObject.next().value).toEqual(
      takeEvery(IResetPasswordTypes.FETCH_RESET_PASSWORD, resetPasswordApiSaga),
    );
    expect(genObject.next().done).toBeTruthy();
  });

  it('should call resetPasswordSuccess actions', () => {
    nock.back('reset-password-response-ok.json', (nockDone) => {
      testSaga(resetPasswordApiSaga, {
        type: IResetPasswordTypes.FETCH_RESET_PASSWORD,
        payload: mockData,
      })
        .next()
        .call([api, api.resetPassword], mockData)
        .next(mockResponse)
        .put(
          resetPasswordSuccess({
            success: mockResponse.success,
          }),
        )
        .next();

      nockDone();
    });
  });
});
