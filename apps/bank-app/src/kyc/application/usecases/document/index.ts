/* eslint-disable @typescript-eslint/no-explicit-any */
import { call, put, StrictEffect, takeEvery, cancel, select, spawn, join } from 'redux-saga/effects';
import { ImageSourcePropType } from 'react-native';

import { Logger } from '@clean-rn/logger';
import { HttpConnection, ServerError } from '@clean-rn/shared/infrastructure';
import { Customer, DocumentError, DocumentVO, IDocumentProperties } from '@clean-rn/kyc/domain';
import { KycApi } from '@clean-rn/kyc/infrastructure';

import { IKycStackPages } from '../../../../shared/presentation/types';
import { navigate } from '../../../../shared/presentation/navigation/navigationRef';
import { showUnknownError } from '../../../../shared/application/commands/manage-global-errors';

import { fetchRefresh } from '../../../../auth/application/commands/login';

import { customerDocumentsUpdated } from '../../commands/customer';
import {
  documentInitialized,
  documentUploaded,
  IDocumentTypes,
  pageAdded,
  uploadDocument,
  resetDocument,
  setAbortController,
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
    nextRouteParams?: {
      instruction: string;
      imageSource: ImageSourcePropType;
      anotherInstruction?: string;
      docPickerVisible?: boolean;
      secondImageVisible?: boolean;
      showExample?: boolean;
    };
  };
}): Generator<StrictEffect, any, any> {
  try {
    // redux get rid of instance methods such as addPage, isReady...
    const { document: documentFromRedux } = yield select(selectDocument);

    // so we need to instanciate a new instance so as to make use of these useful methods
    // bouhhh redux on that one

    const document = new DocumentVO(documentFromRedux.properties);

    if (documentFromRedux.value.recto) {
      document.addPage(documentFromRedux.value.recto);
    }

    // if documentFromRedux.value.verso is not null, it should have been uploaded to back-end

    // addPage to document (would be better in a DocumentVO method, but public methods are lost when transfered through redux state)
    document.addPage(payload.base64);

    if (document.isReady) {
      yield put(uploadDocument({ document }));
      yield call(navigate, { route: IKycStackPages.KYC });
      yield cancel();
    } else {
      yield put(pageAdded({ document }));
      yield call(navigate, { route: IKycStackPages.UPLOAD_DOCUMENT, params: payload.nextRouteParams });
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

    const abortController = new AbortController(); // Créer une nouvelle instance ici
    yield put(setAbortController({ controller: abortController }));

    const createDocumentTask = yield spawn([api, api.createDocument], {
      customerId: user.id,
      document: payload.document,
      abortSignal: abortController.signal,
    });
    const document: DocumentVO = yield join(createDocumentTask);

    Logger.getInstance().info(document.properties.status);
    yield put(documentUploaded({ document }));

    const { customer: customerFromRedux } = yield select(selectCustomer);
    const customer = Customer.Create(customerFromRedux);
    customer.addKyc(customerFromRedux.properties.kyc);
    customer.addDocument(document);
    yield put(customerDocumentsUpdated({ customer }));
  } catch (error: any) {
    yield put(resetDocument());

    // https://redux-saga.js.org/docs/basics/ErrorHandling/ expected error must be managed at the saga level
    if (error instanceof ServerError && error.statusCode === 401) {
      yield put(fetchRefresh());
      yield put(uploadDocument(payload));
      yield cancel();
    } else if (error.name === 'AbortError') {
      Logger.getInstance().info(error);
      yield cancel();
    }
    // once app is well tested, delete this part and let onError hook manage unexpected errors
    yield put(showUnknownError(error as Error));
  }
}

export function* cancelUploadSaga(): Generator<StrictEffect, any, any> {
  yield takeEvery(IDocumentTypes.CANCEL_UPLOAD, cancelUploadSagaGenerator);
}

export function* cancelUploadSagaGenerator(): Generator<StrictEffect, any, any> {
  try {
    const { abortController } = yield select(selectDocument);
    abortController.abort();
    yield put(resetDocument());
  } catch (error: unknown) {
    yield put(resetDocument());
    // once app is well tested, delete this part and let onError hook manage unexpected errors
    yield put(showUnknownError(error as Error));
  }
}
