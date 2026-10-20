/* eslint-disable @typescript-eslint/no-explicit-any */
import { call, put, StrictEffect, takeEvery, cancel, select } from 'redux-saga/effects';
import { HttpConnection, ServerError } from '@clean-rn/shared/infrastructure';
import { DocumentError, DocumentVO, IDocumentProperties } from '@clean-rn/kyc/domain';
import { KycApi } from '@clean-rn/kyc/infrastructure';

import { IAuthStackPages } from '../../../../shared/presentation/types';
import { navigate } from '../../../../shared/presentation/navigation/navigationRef';
import { showUnknownError } from '../../../../shared/application/commands/manage-global-errors';

import { customerDocumentsUpdated } from '../../commands/customer';
import { documentUploaded, IDocumentTypes } from '../../commands/document';
import { selectCustomer } from '../../state-management/selectors';
import { Logger } from '@clean-rn/logger';

export function* uploadDocumentSaga(httpConnection: HttpConnection): Generator<StrictEffect, any, any> {
  yield takeEvery(IDocumentTypes.UPLOAD_DOCUMENT, uploadDocumentSagaGenerator, httpConnection);
}

export function* uploadDocumentSagaGenerator(
  httpConnection: HttpConnection,
  {
    payload,
  }: {
    type: string;
    payload: {
      document: DocumentVO;
    };
  },
): Generator<StrictEffect, any, any> {
  try {
    if (!payload.document.isReady) {
      throw new DocumentError.DocumentNotReady();
    }
    const api = KycApi.getInstance(httpConnection);
    const documentProps: IDocumentProperties = yield call([api, api.createDocument], document);
    Logger.getInstance().info(documentProps);
    yield put(documentUploaded({ document: payload.document }));
    // todo update customer in customerReducer
    const customer = yield select(selectCustomer);
    customer.addDocument(payload.document);
    yield put(customerDocumentsUpdated({ customer }));
  } catch (error: unknown) {
    // https://redux-saga.js.org/docs/basics/ErrorHandling/ expected error must be managed at the saga level
    if (error instanceof ServerError && error.statusCode === 401) {
      yield call(navigate, { route: IAuthStackPages.LOGIN });
      yield cancel();
    }
    // once app is well tested, delete this part and let onError hook manage unexpected errors
    yield put(showUnknownError(error as Error));
  }
}
