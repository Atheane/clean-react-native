/* eslint-disable  @typescript-eslint/no-explicit-any */
import SagaTester from 'redux-saga-tester';

import {
  DocumentVO,
  IKycSteps,
  IDocumentProperties,
  IDocumentStatus,
  IDocumentStatusCode,
} from '@clean-rn/kyc/domain';

import {
  IDocumentTypes,
  addPage,
  uploadDocument,
  documentInitialized,
  pageAdded,
  documentUploaded,
  initializeDocument,
  resetDocument,
  cancelUpload,
  setAbortController,
} from '../../commands/document';
import { IDocumentState, documentReducer } from '../../state-management';

describe('Document - integration', () => {
  let sagaTester: SagaTester;

  const mockResponse: IDocumentProperties[] = [
    {
      typeId: 9,
      kycStep: IKycSteps.ID,
      status: IDocumentStatus.PENDING,
      name: 'test-mock',
      createdAt: new Date('2023-10-03T13:20:21.303Z'),
      statusCode: IDocumentStatusCode.INITIAL,
    },
  ];

  beforeEach(() => {
    const initialState: IDocumentState = {
      pending: false,
      document: null,
      abortController: null,
    };
    sagaTester = new SagaTester({
      initialState,
      reducers: documentReducer,
    });
  });

  it('Should store correct initial state if not initial state is provided', () => {
    const newState = documentReducer(undefined, {
      type: IDocumentTypes.INITIALIZE_DOCUMENT,
      payload: {
        documentProperties: mockResponse[0],
      },
    });
    sagaTester.dispatch(initializeDocument({ documentProperties: mockResponse[0] }));

    expect(newState).toEqual({
      pending: false,
      document: null,
      abortController: null,
    });
  });

  it('Should store correct state if DOCUMENT_INITIALIZED', () => {
    const document = new DocumentVO(mockResponse[0]);
    sagaTester.dispatch(documentInitialized({ document }));

    expect(sagaTester.getState()).toEqual({
      pending: false,
      document,
      abortController: null,
    });
  });

  it('Should store correct state if ADD_PAGE', () => {
    sagaTester.dispatch(addPage({ base64: 'base64 string' }));
    expect(sagaTester.getState()).toEqual({
      pending: false,
      document: null,
      abortController: null,
    });
  });

  it('Should store correct state if PAGE_ADDED', () => {
    const document = new DocumentVO(mockResponse[0]);
    document.addPage('base64 string');
    sagaTester.dispatch(addPage({ base64: 'base64 string' }));
    sagaTester.dispatch(pageAdded({ document }));

    expect(sagaTester.getState()).toEqual({
      pending: false,
      document,
      abortController: null,
    });
  });

  it('Should store correct state if CANCEL_UPLOAD', () => {
    const document = new DocumentVO(mockResponse[0]);
    sagaTester.dispatch(documentInitialized({ document }));
    sagaTester.dispatch(cancelUpload());
    expect(sagaTester.getState()).toEqual({
      pending: false,
      document: null,
      abortController: null,
    });
  });

  it('Should store correct state if RESET_DOCUMENT', () => {
    const document = new DocumentVO(mockResponse[0]);
    sagaTester.dispatch(documentInitialized({ document }));
    sagaTester.dispatch(resetDocument());
    expect(sagaTester.getState()).toEqual({
      pending: false,
      document: null,
      abortController: null,
    });
  });

  it('Should store correct state if UPLOAD_DOCUMENT', () => {
    const document = new DocumentVO(mockResponse[0]);
    sagaTester.dispatch(documentInitialized({ document }));
    document.addPage('base64 string');
    sagaTester.dispatch(pageAdded({ document }));
    sagaTester.dispatch(uploadDocument({ document }));
    expect(sagaTester.getState()).toEqual({
      pending: true,
      document,
      abortController: null,
    });
  });

  it('Should store correct state if DOCUMENT_UPLOADED', () => {
    const document = new DocumentVO(mockResponse[0]);
    document.addPage('base64 string');
    sagaTester.dispatch(uploadDocument({ document }));
    sagaTester.dispatch(documentUploaded({ document }));

    expect(sagaTester.getState()).toEqual({
      pending: false,
      document,
      abortController: null,
    });
  });

  it('Should store correct state if SET_ABORT_CONTROLLER', () => {
    const document = new DocumentVO(mockResponse[0]);
    sagaTester.dispatch(documentInitialized({ document }));
    const abortController = new AbortController();
    sagaTester.dispatch(setAbortController({ controller: abortController }));
    expect(sagaTester.getState()).toEqual({
      pending: false,
      document,
      abortController,
    });
  });
});
