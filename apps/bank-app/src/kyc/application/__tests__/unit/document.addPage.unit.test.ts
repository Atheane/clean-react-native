/* eslint-disable  @typescript-eslint/no-explicit-any */
import { takeEvery } from 'redux-saga/effects';
import { testSaga } from 'redux-saga-test-plan';

import { DocumentVO, IDocumentCategory, IDocumentStatus, IDocumentStatusCode } from '@clean-rn/kyc/domain';

import { addPageSaga, addPageSagaGenerator } from '../../usecases/document';
import { IDocumentTypes, pageAdded, uploadDocument } from '../../commands/document';
import { selectDocument } from '../../state-management/selectors';
import { showUnknownError } from '../../../../shared/application/commands/manage-global-errors';
import { IKycStackPages } from '../../../../shared/presentation/types';
import { navigate } from '../../../../shared/presentation/navigation/navigationRef';
import { IDCardVerso } from '../../../presentation/assets/images';

describe('Document - addPage - usecases', () => {
  const documentProperties = {
    typeId: 9,
    category: IDocumentCategory.ID,
    status: IDocumentStatus.PENDING,
    name: 'test-mock',
    createdAt: new Date('2023-10-03T13:20:21.303Z'),
    statusCode: IDocumentStatusCode.INITIAL,
  };

  const genObject = addPageSaga();

  it('Should wait for ADD_PAGE action and call addPageSagaGenerator, should be done on next iteration', () => {
    expect(genObject.next().value).toEqual(takeEvery(IDocumentTypes.ADD_PAGE, addPageSagaGenerator));
    expect(genObject.next().done).toBeTruthy();
  });

  it('Should call pageAdded if document not ready', async () => {
    const documentBefore = new DocumentVO(documentProperties);

    const documentAfter = new DocumentVO(documentProperties);
    documentAfter.addPage('base64-fake-recto');

    const nextRouteParams = {
      instruction: 'instruction',
      imageSource: IDCardVerso,
    };

    testSaga(addPageSagaGenerator, {
      type: IDocumentTypes.ADD_PAGE,
      payload: {
        base64: 'base64-fake-recto',
        nextRouteParams,
      },
    })
      .next()
      .select(selectDocument)
      .next({ document: documentBefore })
      .put(
        pageAdded({
          document: documentAfter,
        }),
      )
      .next(documentAfter)
      .call(navigate, { route: IKycStackPages.UPLOAD_DOCUMENT, params: nextRouteParams })
      .next();
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
      .call(navigate, { route: IKycStackPages.KYC })
      .next()
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
