/* eslint-disable  @typescript-eslint/no-explicit-any */
import { takeEvery } from 'redux-saga/effects';
import { testSaga } from 'redux-saga-test-plan';
import Constants from 'expo-constants';

import { User } from '@clean-rn/auth/domain';
import { DocumentError, DocumentVO, IDocumentCategory, IDocumentStatus } from '@clean-rn/kyc/domain';

import { HttpConnection, ServerError } from '@clean-rn/shared/infrastructure';
import { KycApi } from '@clean-rn/kyc/infrastructure';

import { uploadDocumentSaga, uploadDocumentSagaGenerator } from '../../usecases/document';
import { IDocumentTypes, documentUploaded, uploadDocument } from '../../commands/document';
import { selectDocument, selectUserFromLogin } from '../../state-management/selectors';
import { showUnknownError } from '../../../../shared/application/commands/manage-global-errors';

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

  it('Should wait for UPLOAD_DOCUMENT action and call uploadDocumentSagaGenerator, should be done on next iteration', () => {
    expect(genObject.next().value).toEqual(
      takeEvery(IDocumentTypes.UPLOAD_DOCUMENT, uploadDocumentSagaGenerator, httpConnection),
    );
    expect(genObject.next().done).toBeTruthy();
  });

  it('Should call unknown error if document not ready', async () => {
    const user = User.Create({ id: 123, properties: { USPerson: false } });
    const document = new DocumentVO(documentProperties);
    document.addPage('base64-fake');

    testSaga(uploadDocumentSagaGenerator, httpConnection, {
      type: IDocumentTypes.UPLOAD_DOCUMENT,
      payload: {
        document,
      },
    })
      .next()
      .select(selectUserFromLogin)
      .next(user)
      .call([api, api.createDocument]) // <- Utilisez cette syntaxe pour spécifier le contexte.
      .next(document)
      .put(showUnknownError(new DocumentError.DocumentNotReady()))
      .next();
  });

  it('Should call documentUploaded', async () => {
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
      .call([api, api.createDocument]) // <- Utilisez cette syntaxe pour spécifier le contexte.
      .next({
        customerId: user.id,
        document,
      })
      .put(
        documentUploaded({
          document,
        }),
      );
  });

  it('Should call uploadDocument if document ready', async () => {
    const documentBefore = new DocumentVO(documentProperties);
    documentBefore.addPage('base64-fake-recto');

    const documentAfter = new DocumentVO(documentProperties);
    documentAfter.addPage('base64-fake-recto');
    documentAfter.addPage('base64-fake-verso');

    testSaga(addPageSagaGenerator, {
      type: IDocumentTypes.ADD_PAGE,
      payload: {
        base64: 'base64-fake-verso',
      },
    })
      .next()
      .select(selectDocument)
      .next({ document: documentBefore })
      .put(
        uploadDocument({
          document: documentAfter,
        }),
      )
      .next(documentAfter)
      .cancel();
  });

  it('Should call showUnknownError action if unknown error', () => {
    testSaga(addPageSagaGenerator, {
      type: IDocumentTypes.ADD_PAGE,
      payload: {
        base64: 'base64-fake',
      },
    })
      .next()
      .throw(new Error('unknown error'))
      .put(showUnknownError(new Error('unknown error')))
      .next();
  });
});
