/* eslint-disable @typescript-eslint/no-explicit-any */
import { call, put, StrictEffect, takeEvery, cancel, select } from 'redux-saga/effects';

import { Logger } from '@clean-rn/logger';
import { HttpConnection, ServerError } from '@clean-rn/shared/infrastructure';
import { DocumentError, DocumentVO, IDocumentProperties } from '@clean-rn/kyc/domain';
import { KycApi } from '@clean-rn/kyc/infrastructure';

import { IAuthStackPages, IKycStackPages } from '../../../../shared/presentation/types';
import { navigate } from '../../../../shared/presentation/navigation/navigationRef';
import { showUnknownError } from '../../../../shared/application/commands/manage-global-errors';

import { customerDocumentsUpdated } from '../../commands/customer';
import {
  documentInitialized,
  documentUploaded,
  IDocumentTypes,
  pageAdded,
  uploadDocument,
} from '../../commands/document';
import { selectCustomer, selectDocument, selectUserFromLogin } from '../../state-management/selectors';

export function* initializeDocumentSaga(): Generator<StrictEffect, any, any> {
  yield takeEvery(IDocumentTypes.INITIALIZE_DOCUMENT, initializeDocumentSagaGenerator);
}

export function* initializeDocumentSagaGenerator({
  payload,
}: {
  type: string;
  payload: {
    documentProperties: IDocumentProperties;
  };
}): Generator<StrictEffect, any, any> {
  try {
    const document = new DocumentVO(payload.documentProperties);
    yield put(documentInitialized({ document }));
  } catch (error: unknown) {
    // once app is well tested, delete this part and let onError hook manage unexpected errors
    yield put(showUnknownError(error as Error));
  }
}

export function* addPageSaga(): Generator<StrictEffect, any, any> {
  yield takeEvery(IDocumentTypes.ADD_PAGE, addPageSagaGenerator);
}

export function* addPageSagaGenerator({
  payload,
}: {
  type: string;
  payload: {
    base64: string;
  };
}): Generator<StrictEffect, any, any> {
  try {
    const { document } = yield select(selectDocument);

    // addPage to document (would be better in a DocumentVO method, but public methods are lost when transfered through redux state)
    if (document.expectedPageCount === 2 && !document.recto) {
      document.recto = payload.base64;
    } else if (document.expectedPageCount === 2 && !document.verso) {
      document.verso = payload.base64;
    } else {
      document.recto = payload.base64;
    }

    // check if document is ready (would be better in a DocumentVO method, but public methods are lost when transfered through redux state)
    if (document.expectedPageCount === 2) {
      document.isReady = !!document.recto && !!document.verso;
    } else {
      document.isReady = !!document.recto;
    }

    if (document.isReady) {
      yield put(uploadDocument({ document }));
      yield cancel();
    } else {
      yield put(pageAdded({ document }));
    }
  } catch (error: unknown) {
    // once app is well tested, delete this part and let onError hook manage unexpected errors
    yield put(showUnknownError(error as Error));
  }
}

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
    const user = yield select(selectUserFromLogin);

    const api = KycApi.getInstance(httpConnection);
    const documentProps = yield call([api, api.createDocument], {
      customerId: user.id,
      document: payload.document,
    });
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
