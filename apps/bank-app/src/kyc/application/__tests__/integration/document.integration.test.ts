/* eslint-disable  @typescript-eslint/no-explicit-any */
import SagaTester from 'redux-saga-tester';
import Constants from 'expo-constants';

import { DocumentVO, IDocumentCategory, IDocumentProperties, IDocumentStatus } from '@clean-rn/kyc/domain';

import {
  IDocumentTypes,
  addPage,
  uploadDocument,
  documentInitialized,
  pageAdded,
  documentUploaded,
  initializeDocument,
} from '../../commands/document';
import { IDocumentState, documentReducer } from '../../state-management';

const expoConstantsMock = {
  name: 'CleanRN BankApp Test',
  slug: 'clean-rn-bank-app-test',
  extra: {
    BASE_URL_API: 'https://fake-api.com',
    NODE_ENV: 'test',
  },
};
jest.mock('expo-constants', () => expoConstantsMock);

describe('Document - integration', () => {
  let sagaTester: SagaTester;

  const mockResponse: IDocumentProperties[] = [
    {
      typeId: 9,
      category: IDocumentCategory.FIRST_ID,
      status: IDocumentStatus.PENDING,
      name: 'test-mock',
      createdAt: new Date('2023-10-03T13:20:21.303Z'),
    },
  ];

  beforeAll(() => {
    Constants.expoConfig = {
      name: 'CleanRN BankApp Test',
      slug: 'clean-rn-bank-app-test',
      extra: {
        BASE_URL_API: 'https://fake-api.com',
        NODE_ENV: 'test',
      },
    };
  });

  beforeEach(() => {
    const initialState: IDocumentState = {
      pending: false,
      document: null,
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
    });
  });

  it('Should store correct state if DOCUMENT_INITIALIZED', () => {
    const document = new DocumentVO(mockResponse[0]);
    sagaTester.dispatch(documentInitialized({ document }));

    expect(sagaTester.getState()).toEqual({
      pending: false,
      document,
    });
  });

  it('Should store correct state if ADD_PAGE', () => {
    sagaTester.dispatch(addPage({ base64: 'base64 string' }));
    expect(sagaTester.getState()).toEqual({
      pending: false,
      document: null,
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
    });
  });

  it('Should store correct state if UPLOAD_DOCUMENT', () => {
    const document = new DocumentVO(mockResponse[0]);
    document.addPage('base64 string');

    sagaTester.dispatch(uploadDocument({ document }));
    expect(sagaTester.getState()).toEqual({
      pending: true,
      document: null,
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
    });
  });
});
