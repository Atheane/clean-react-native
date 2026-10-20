/* eslint-disable  @typescript-eslint/no-explicit-any */
import { takeEvery } from 'redux-saga/effects';
import { testSaga } from 'redux-saga-test-plan';
import Constants from 'expo-constants';
import { createMockTask } from '@redux-saga/testing-utils';

import { User } from '@clean-rn/auth/domain';
import {
  Customer,
  DocumentError,
  DocumentVO,
  IDocumentCategory,
  IDocumentStatus,
  KycDocuments,
} from '@clean-rn/kyc/domain';

import { HttpConnection, ServerError } from '@clean-rn/shared/infrastructure';
import { KycApi } from '@clean-rn/kyc/infrastructure';

import { uploadDocumentSaga, uploadDocumentSagaGenerator } from '../../usecases/document';
import { customerDocumentsUpdated } from '../../commands/customer';
import { IDocumentTypes, documentUploaded } from '../../commands/document';
import { selectCustomer, selectUserFromLogin } from '../../state-management/selectors';
import { showUnknownError } from '../../../../shared/application/commands/manage-global-errors';
import { navigate } from '../../../../shared/presentation/navigation/navigationRef';
import { IAuthStackPages } from '../../../../shared/presentation/types';

describe('Document - uploadDocument - usecases', () => {
  const httpConnection = HttpConnection.getInstance(Constants.expoConfig?.extra?.BASE_URL_API);

  const documentProperties = {
    typeId: 9,
    category: IDocumentCategory.FIRST_ID,
    status: IDocumentStatus.PENDING,
    name: 'test-mock',
    createdAt: new Date('2023-10-03T13:20:21.303Z'),
  };

  const api = KycApi.getInstance(httpConnection);
  const genObject = uploadDocumentSaga(httpConnection);

  const mockError401 = {
    statusCode: 401,
    message: 'Unauthorized',
    response: {
      statusCode: 401,
      message: 'Unauthorized',
    },
    timestamp: '2023-10-03T13:20:21.303Z',
    path: '/app/document/kyc',
    method: 'GET',
  };

  const mockError500 = {
    message: 'Core::DocumentService::Document - Server Error',
    statusCode: 500,
    response: 'Core::DocumentService::Document - Server Error',
    timestamp: '2023-04-07T15:28:04.657Z',
    path: '/app/document/kyc',
  };

  it('Should wait for UPLOAD_DOCUMENT action and call uploadDocumentSagaGenerator, should be done on next iteration', () => {
    expect(genObject.next().value).toEqual(
      takeEvery(IDocumentTypes.UPLOAD_DOCUMENT, uploadDocumentSagaGenerator, httpConnection),
    );
    expect(genObject.next().done).toBeTruthy();
  });

  it('Should call documentUploaded and customerDocumentsUpdated', async () => {
    const user = User.Create({ id: 123, properties: { USPerson: false } });

    const document = new DocumentVO(documentProperties);
    document.addPage('base64-fake-recto');
    document.addPage('base64-fake-verso');

    const mockTask = createMockTask();

    const customer = Customer.Create({
      id: 123,
      properties: {
        USPerson: false,
      },
    });
    customer.addKyc(new KycDocuments([document.properties]));
    customer.addDocument(document);

    testSaga(uploadDocumentSagaGenerator, httpConnection, {
      type: IDocumentTypes.UPLOAD_DOCUMENT,
      payload: {
        document,
      },
    })
      .next()
      .select(selectUserFromLogin)
      .next(user)
      .fork([api, api.createDocument], { customerId: user.id, document }) // <- Utilisez cette syntaxe pour spécifier le contexte.
      .next(mockTask)
      .join(mockTask)
      .next(document)
      .put(
        documentUploaded({
          document,
        }),
      )
      .next()
      .select(selectCustomer)
      .next({ customer })
      .put(customerDocumentsUpdated({ customer }))
      .next();
  });

  it('Should call unknown error if document not ready', async () => {
    const document = new DocumentVO(documentProperties);
    document.addPage('base64-fake');

    testSaga(uploadDocumentSagaGenerator, httpConnection, {
      type: IDocumentTypes.UPLOAD_DOCUMENT,
      payload: {
        document,
      },
    })
      .next()
      .put(showUnknownError(new DocumentError.DocumentNotReady('Document is not ready')))
      .next();
  });

  it('Should call navigate to Login modale if 401 from Server', () => {
    const user = User.Create({ id: 123, properties: {} });
    const document = new DocumentVO(documentProperties);
    document.addPage('base64-fake-recto');
    document.addPage('base64-fake-verso');

    testSaga(uploadDocumentSagaGenerator, httpConnection, {
      type: IDocumentTypes.UPLOAD_DOCUMENT,
      payload: {
        document,
      },
    })
      .next()
      .select(selectUserFromLogin)
      .next(user)
      .fork([api, api.createDocument], { customerId: user.id, document }) // <- Utilisez cette syntaxe pour spécifier le contexte.
      .throw(new ServerError(mockError401))
      .call(navigate, { route: IAuthStackPages.LOGIN })
      .next()
      .cancel();
  });

  it('Should call navigate to Login modale if 500 from Server', () => {
    const user = User.Create({ id: 123, properties: {} });
    const document = new DocumentVO(documentProperties);
    document.addPage('base64-fake-recto');
    document.addPage('base64-fake-verso');

    testSaga(uploadDocumentSagaGenerator, httpConnection, {
      type: IDocumentTypes.UPLOAD_DOCUMENT,
      payload: {
        document,
      },
    })
      .next()
      .select(selectUserFromLogin)
      .next(user)
      .fork([api, api.createDocument], { customerId: user.id, document }) // <- Utilisez cette syntaxe pour spécifier le contexte.
      .throw(new ServerError(mockError500))
      .put(showUnknownError(new ServerError(mockError500)))
      .next();
  });

  it('Should call unknown error if another unexpected error', async () => {
    const user = User.Create({ id: 123, properties: { USPerson: false } });

    const document = new DocumentVO(documentProperties);
    document.addPage('base64-fake-recto');
    document.addPage('base64-fake-verso');

    testSaga(uploadDocumentSagaGenerator, httpConnection, {
      type: IDocumentTypes.UPLOAD_DOCUMENT,
      payload: {
        document,
      },
    })
      .next()
      .select(selectUserFromLogin)
      .next(user)
      .fork([api, api.createDocument], { customerId: user.id, document }) // <- Utilisez cette syntaxe pour spécifier le contexte.
      .throw(new Error('unexpected error'))
      .put(showUnknownError(new Error('unexpected error')))
      .next();
  });
});
