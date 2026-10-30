/* eslint-disable  @typescript-eslint/no-explicit-any */
import { takeEvery } from 'redux-saga/effects';
import { testSaga } from 'redux-saga-test-plan';
import { createMockTask } from '@redux-saga/testing-utils';

import { User } from '@clean-rn/user/domain';
import {
  Customer,
  DocumentError,
  DocumentVO,
  IKycSteps,
  IDocumentProperties,
  IDocumentStatus,
  IDocumentStatusCode,
} from '@clean-rn/kyc/domain';

import { HttpConnection, ServerError } from '@clean-rn/shared/infrastructure';
import { KycApi } from '@clean-rn/kyc/infrastructure';

import { showUnknownError } from '../../../../shared/application/commands/manage-global-errors';

import { selectUser } from '../../../../user/application/state-management/selectors';

import { uploadDocumentSaga, uploadDocumentSagaGenerator } from '../../usecases/document';
import { customerDocumentsUpdated } from '../../commands/customer';
import { IDocumentTypes, documentUploaded, resetDocument, setAbortController } from '../../commands/document';
import { selectCustomer } from '../../state-management/selectors';
import { ensureTokenRefreshed } from '../../../../shared/application/usecases/ensureTokenRefreshed';

jest.mock('@clean-rn/shared/infrastructure', () => ({
  HttpConnection: {
    getInstance: jest.fn(),
  },
  ServerError: jest.fn().mockImplementation(function (error) {
    this.message = error.message;
    this.name = 'ServerError';
    this.statusCode = error.statusCode;
    this.codeError = error.codeError;
    this.cause = error.response;
  }),
}));

describe('Document - uploadDocument - usecases', () => {
  let httpConnection: HttpConnection;
  let api: KycApi;

  beforeEach(() => {
    httpConnection = {
      baseUrl: 'http://mock-api.com',
      options: jest.fn(),
      handleError: jest.fn(),
      getDefaultHeaders: jest.fn(),
      attachBearerToken: jest.fn(),
    };
    HttpConnection.getInstance.mockReturnValue(httpConnection);
    global.fetch = jest.fn();
    api = KycApi.getInstance(httpConnection);
    mockAbortController = new AbortController();
    jest.spyOn(window, 'AbortController').mockImplementation(() => mockAbortController);
  });

  afterEach(() => {
    jest.resetAllMocks();
    jest.clearAllMocks();
  });

  const documentProperties: IDocumentProperties = {
    typeId: 9,
    kycStep: IKycSteps.ID,
    status: IDocumentStatus.PENDING,
    name: 'test-mock',
    createdAt: new Date('2023-10-03T13:20:21.303Z'),
    statusCode: IDocumentStatusCode.INITIAL,
  };

  const mockError500 = {
    message: 'Core::DocumentService::Document - Server Error',
    statusCode: 500,
    response: 'Core::DocumentService::Document - Server Error',
    timestamp: '2023-04-07T15:28:04.657Z',
    path: '/app/document/kyc',
  };

  let mockAbortController: AbortController;

  it('Should wait for UPLOAD_DOCUMENT action and call uploadDocumentSagaGenerator, should be done on next iteration', () => {
    const genObject = uploadDocumentSaga(httpConnection);

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
        status: 0,
        kycReviewComment: '',
        USPerson: false,
      },
    });
    customer.initKyc([document.properties], []);
    customer.addDocument(document);

    testSaga(uploadDocumentSagaGenerator, httpConnection, {
      type: IDocumentTypes.UPLOAD_DOCUMENT,
      payload: {
        document,
      },
    })
      .next()
      .select(selectUser)
      .next(user)
      .call(ensureTokenRefreshed, httpConnection)
      .next()
      .put(setAbortController({ controller: mockAbortController }))
      .next()
      .spawn([api, api.createDocument], {
        customerId: user.id,
        document,
        abortSignal: mockAbortController.signal,
      }) // <- Utilisez cette syntaxe pour spécifier le contexte.
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
      .put(resetDocument())
      .next()
      .put(showUnknownError(new DocumentError.DocumentNotReady('Document is not ready')))
      .next();
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
      .select(selectUser)
      .next(user)
      .call(ensureTokenRefreshed, httpConnection)
      .next()
      .put(setAbortController({ controller: mockAbortController }))
      .next()
      .spawn([api, api.createDocument], {
        customerId: user.id,
        document,
        abortSignal: mockAbortController.signal,
      }) // <- Utilisez cette syntaxe pour spécifier le contexte.
      .throw(new ServerError(mockError500))
      .put(resetDocument())
      .next()
      .put(showUnknownError(new ServerError(mockError500)))
      .next();
  });

  it('Should call abort error if task is cancelled', async () => {
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
      .select(selectUser)
      .next(user)
      .call(ensureTokenRefreshed, httpConnection)
      .next()
      .put(setAbortController({ controller: mockAbortController }))
      .next()
      .spawn([api, api.createDocument], {
        customerId: user.id,
        document,
        abortSignal: mockAbortController.signal,
      }) // <- Utilisez cette syntaxe pour spécifier le contexte.
      .throw(new DOMException('The operation was aborted.', 'AbortError'))
      .put(resetDocument())
      .next()
      .cancel();
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
      .select(selectUser)
      .next(user)
      .call(ensureTokenRefreshed, httpConnection)
      .next()
      .put(setAbortController({ controller: mockAbortController }))
      .next()
      .spawn([api, api.createDocument], {
        customerId: user.id,
        document,
        abortSignal: mockAbortController.signal,
      }) // <- Utilisez cette syntaxe pour spécifier le contexte.
      .throw(new Error('unexpected error'))
      .put(resetDocument())
      .next()
      .put(showUnknownError(new Error('unexpected error')))
      .next();
  });
});
