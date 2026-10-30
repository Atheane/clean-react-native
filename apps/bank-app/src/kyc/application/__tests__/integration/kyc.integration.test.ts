/* eslint-disable  @typescript-eslint/no-explicit-any */
import SagaTester from 'redux-saga-tester';

import {
  Customer,
  DocumentVO,
  IKycSteps,
  IDocumentProperties,
  IDocumentStatus,
  IDocumentStatusCode,
} from '@clean-rn/kyc/domain';

import { HttpConnection } from '@clean-rn/shared/infrastructure';

import { IKycStackPages } from '../../../../shared/presentation/types';
import { checkCustomerStatusSaga } from '../../usecases/customer';
import {
  ICustomerTypes,
  checkCustomerStatus,
  customerDocumentsUpdated,
  customerStatusChecked,
  initializeKyc,
} from '../../commands/customer';
import { ICustomerState, customerReducer } from '../../state-management';
import { KYC_REVIEW, User } from '@clean-rn/user/domain';

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

describe('KYC - integration', () => {
  let sagaTester: SagaTester;
  let httpConnection: HttpConnection;

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
    const initialState: ICustomerState = {
      pending: false,
      customer: null,
      initRoute: IKycStackPages.INIT,
    };
    sagaTester = new SagaTester({
      initialState,
      reducers: customerReducer,
    });
    httpConnection = {
      baseUrl: 'http://mock-api.com',
      options: jest.fn(),
      handleError: jest.fn(),
      getDefaultHeaders: jest.fn(),
      attachBearerToken: jest.fn(),
    };
    HttpConnection.getInstance.mockReturnValue(httpConnection);
    global.fetch = jest.fn();
  });

  afterEach(() => {
    jest.resetAllMocks();
    jest.clearAllMocks();
  });

  it('Should store correct initial state if not initial state is provided', () => {
    const newState = customerReducer(undefined, {
      type: ICustomerTypes.CHECK_CUSTOMER_STATUS,
      payload: { user: User.Create({ id: 123, properties: { USPerson: false } }) },
    });

    expect(newState).toEqual({
      pending: true,
      customer: null,
      initRoute: IKycStackPages.INIT,
    });
  });

  it('Should store correct state if CUSTOMER_STATUS_CHECKED', () => {
    const user = User.Create({ id: 123, properties: { USPerson: false } });
    const customer = Customer.Create({
      id: 123,
      properties: { USPerson: false, status: KYC_REVIEW.PENDING, kycReviewComment: '' },
    });
    customer.initKyc(mockResponse, []);
    sagaTester.start(checkCustomerStatusSaga, httpConnection);
    sagaTester.dispatch(checkCustomerStatus({ user }));
    sagaTester.dispatch(
      customerStatusChecked({
        customer,
        initRoute: IKycStackPages.KYC,
      }),
    );

    expect(sagaTester.getState()).toEqual({
      pending: false,
      customer,
      initRoute: IKycStackPages.KYC,
    });
  });

  it('Should store correct state if INITIALIZE_KYC', () => {
    sagaTester.start(checkCustomerStatusSaga, httpConnection);
    sagaTester.dispatch(initializeKyc());
    expect(sagaTester.getState()).toEqual({
      pending: false,
      customer: null,
      initRoute: IKycStackPages.INIT,
    });
  });

  it('Should store correct state if CUSTOMER_DOCUMENTS_UPDATED', () => {
    const customer = Customer.Create({
      id: 123,
      properties: { USPerson: false, status: KYC_REVIEW.PENDING, kycReviewComment: '' },
    });
    customer.initKyc(mockResponse, []);

    const document = new DocumentVO({
      typeId: 9,
      kycStep: IKycSteps.ID,
      status: IDocumentStatus.PENDING,
      name: 'test-mock',
      createdAt: new Date('2023-10-03T13:20:21.303Z'),
      statusCode: IDocumentStatusCode.INITIAL,
    });

    customer.addDocument(document);
    sagaTester.start(checkCustomerStatusSaga, httpConnection);
    sagaTester.dispatch(customerDocumentsUpdated({ customer }));

    expect(sagaTester.getState()).toEqual({
      pending: false,
      customer,
      initRoute: IKycStackPages.INIT,
    });
  });
});
