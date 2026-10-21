/* eslint-disable  @typescript-eslint/no-explicit-any */
import SagaTester from 'redux-saga-tester';
import Constants from 'expo-constants';

import {
  Customer,
  DocumentVO,
  IDocumentCategory,
  IDocumentProperties,
  IDocumentStatus,
  IDocumentStatusCode,
} from '@clean-rn/kyc/domain';

import { HttpConnection, wrapSagaHidingNotFoundError } from '@clean-rn/shared/infrastructure';

import {
  ICustomerTypes,
  checkCustomerStatus,
  customerDocumentsUpdated,
  customerStatusChecked,
  initializeKyc,
} from '../../commands/customer';
import { ICustomerState, customerReducer } from '../../state-management';

import { checkCustomerStatusSaga } from '../../usecases/customer';

const expoConstantsMock = {
  name: 'CleanRN BankApp Test',
  slug: 'clean-rn-bank-app-test',
  extra: {
    BASE_URL_API: 'https://fake-api.com',
    NODE_ENV: 'test',
  },
};
jest.mock('expo-constants', () => expoConstantsMock);

describe('KYC - integration', () => {
  let sagaTester: SagaTester;
  let httpConnection: HttpConnection;

  const mockResponse: IDocumentProperties[] = [
    {
      typeId: 9,
      category: IDocumentCategory.ID,
      status: IDocumentStatus.PENDING,
      name: 'test-mock',
      createdAt: new Date('2023-10-03T13:20:21.303Z'),
      statusCode: IDocumentStatusCode.INITIAL,
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
    httpConnection = HttpConnection.getInstance(Constants.expoConfig?.extra?.BASE_URL_API);
  });

  beforeEach(() => {
    const initialState: ICustomerState = {
      pending: false,
      customer: null,
    };
    sagaTester = new SagaTester({
      initialState,
      reducers: customerReducer,
    });
  });

  it('Should store correct initial state if not initial state is provided', () => {
    const newState = customerReducer(undefined, {
      type: ICustomerTypes.CHECK_CUSTOMER_STATUS,
    });

    expect(newState).toEqual({
      pending: true,
      customer: null,
    });
  });

  it('Should store correct state if CUSTOMER_STATUS_CHECKED', () => {
    const customer = Customer.Create({ id: 123, properties: { USPerson: false } });
    customer.checkDocumentsStatus(mockResponse);
    sagaTester.start(wrapSagaHidingNotFoundError, checkCustomerStatusSaga, httpConnection);
    sagaTester.dispatch(checkCustomerStatus());
    sagaTester.dispatch(
      customerStatusChecked({
        customer,
      }),
    );

    expect(sagaTester.getState()).toEqual({
      pending: false,
      customer,
    });
  });

  it('Should store correct state if INITIALIZE_KYC', () => {
    sagaTester.start(wrapSagaHidingNotFoundError, checkCustomerStatusSaga, httpConnection);
    sagaTester.dispatch(initializeKyc());
    expect(sagaTester.getState()).toEqual({
      pending: false,
      customer: null,
    });
  });

  it('Should store correct state if CUSTOMER_DOCUMENTS_UPDATED', () => {
    const customer = Customer.Create({ id: 123, properties: { USPerson: false } });
    customer.checkDocumentsStatus(mockResponse);

    const document = new DocumentVO({
      typeId: 9,
      category: IDocumentCategory.ID,
      status: IDocumentStatus.PENDING,
      name: 'test-mock',
      createdAt: new Date('2023-10-03T13:20:21.303Z'),
      statusCode: IDocumentStatusCode.INITIAL,
    });

    customer.addDocument(document);
    sagaTester.start(wrapSagaHidingNotFoundError, checkCustomerStatusSaga, httpConnection);
    sagaTester.dispatch(customerDocumentsUpdated({ customer }));

    expect(sagaTester.getState()).toEqual({
      pending: false,
      customer,
    });
  });
});
