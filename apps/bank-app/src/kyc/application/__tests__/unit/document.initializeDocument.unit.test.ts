/* eslint-disable  @typescript-eslint/no-explicit-any */
import { takeEvery } from 'redux-saga/effects';
import { testSaga } from 'redux-saga-test-plan';

import { DocumentVO, IKycSteps, IDocumentStatus, IDocumentStatusCode } from '@clean-rn/kyc/domain';

import { showUnknownError } from '../../../../shared/application/commands/manage-global-errors';

import { initializeDocumentSaga, initializeDocumentSagaGenerator } from '../../usecases/document';
import { IDocumentTypes, documentInitialized } from '../../commands/document';

describe('Document - initializeDocument - usecases', () => {
  const documentProperties = {
    typeId: 9,
    kycStep: IKycSteps.ID as IKycSteps.W9 | IKycSteps.ID,
    status: IDocumentStatus.PENDING,
    name: 'test-mock',
    createdAt: new Date('2023-10-03T13:20:21.303Z'),
    statusCode: IDocumentStatusCode.INITIAL,
  };

  const genObject = initializeDocumentSaga();

  it('Should wait for INITIALIZE_DOCUMENT action and call initializeDocumentSagaGenerator, should be done on next iteration', () => {
    expect(genObject.next().value).toEqual(
      takeEvery(IDocumentTypes.INITIALIZE_DOCUMENT, initializeDocumentSagaGenerator),
    );
    expect(genObject.next().done).toBeTruthy();
  });

  it('Should call documentInitialized', async () => {
    const document = new DocumentVO(documentProperties);
    testSaga(initializeDocumentSagaGenerator, {
      type: IDocumentTypes.INITIALIZE_DOCUMENT,
      payload: {
        documentProperties,
      },
    })
      .next()
      .put(
        documentInitialized({
          document,
        }),
      );
  });

  it('Should call showUnknownError action if unknown error', () => {
    testSaga(initializeDocumentSagaGenerator, {
      type: IDocumentTypes.INITIALIZE_DOCUMENT,
      payload: {
        documentProperties: {
          typeId: 9,
          kycStep: IKycSteps.W9,
          status: IDocumentStatus.PENDING,
          name: 'test-mock',
          createdAt: new Date('2023-10-03T13:20:21.303Z'),
          statusCode: IDocumentStatusCode.INITIAL,
        },
      },
    })
      .next()
      .throw(new Error('unknown error'))
      .put(showUnknownError(new Error('unknown error')))
      .next();
  });
});
