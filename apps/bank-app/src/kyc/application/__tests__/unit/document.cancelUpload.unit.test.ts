/* eslint-disable  @typescript-eslint/no-explicit-any */
import { takeEvery } from 'redux-saga/effects';
import { testSaga } from 'redux-saga-test-plan';

import { cancelUploadSaga, cancelUploadSagaGenerator } from '../../usecases/document';
import { IDocumentTypes, resetDocument } from '../../commands/document';
import { showUnknownError } from '../../../../shared/application/commands/manage-global-errors';
import { selectDocument } from '../../state-management/selectors';

describe('Document - cancelUpload - usecases', () => {
  const genObject = cancelUploadSaga();

  it('Should wait for CANCEL_UPLOAD action and call cancelUploadSagaGenerator, should be done on next iteration', () => {
    expect(genObject.next().value).toEqual(
      takeEvery(IDocumentTypes.CANCEL_UPLOAD, cancelUploadSagaGenerator),
    );
    expect(genObject.next().done).toBeTruthy();
  });

  it('Should call cancelRequest', async () => {
    const abortController = new AbortController();
    testSaga(cancelUploadSagaGenerator)
      .next()
      .select(selectDocument)
      .next({ abortController })
      .put(resetDocument())
      .next();
  });

  it('Should call unknown error if another unexpected error', async () => {
    testSaga(cancelUploadSagaGenerator)
      .next()
      .select(selectDocument)
      .throw(new Error('unexpected error'))
      .put(resetDocument())
      .next()
      .put(showUnknownError(new Error('unexpected error')))
      .next();
  });
});
