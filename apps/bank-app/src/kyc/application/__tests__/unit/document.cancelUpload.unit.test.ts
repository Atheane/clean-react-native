/* eslint-disable  @typescript-eslint/no-explicit-any */
import { takeEvery } from 'redux-saga/effects';
import { testSaga } from 'redux-saga-test-plan';
import Constants from 'expo-constants';

import { HttpConnection } from '@clean-rn/shared/infrastructure';
import { KycApi } from '@clean-rn/kyc/infrastructure';

import { cancelUploadSaga, cancelUploadSagaGenerator } from '../../usecases/document';
import { IDocumentTypes, resetDocument } from '../../commands/document';
import { showUnknownError } from '../../../../shared/application/commands/manage-global-errors';

describe('Document - cancelUpload - usecases', () => {
  const httpConnection = HttpConnection.getInstance(Constants.expoConfig?.extra?.BASE_URL_API);

  const api = KycApi.getInstance(httpConnection);
  const genObject = cancelUploadSaga(httpConnection);

  it('Should wait for CANCEL_UPLOAD action and call cancelUploadSagaGenerator, should be done on next iteration', () => {
    expect(genObject.next().value).toEqual(
      takeEvery(IDocumentTypes.CANCEL_UPLOAD, cancelUploadSagaGenerator, httpConnection),
    );
    expect(genObject.next().done).toBeTruthy();
  });

  it('Should call cancelRequest', async () => {
    testSaga(cancelUploadSagaGenerator, httpConnection).next().call(api.cancelRequest).next();
  });

  it('Should call unknown error if another unexpected error', async () => {
    testSaga(cancelUploadSagaGenerator, httpConnection)
      .next()
      .call(api.cancelRequest)
      .throw(new Error('unexpected error'))
      .put(resetDocument())
      .next()
      .put(showUnknownError(new Error('unexpected error')))
      .next();
  });
});
