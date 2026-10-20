/* eslint-disable  @typescript-eslint/no-explicit-any */
import SagaTester from 'redux-saga-tester';
import Constants from 'expo-constants';

import { Customer, IDocument, DOCUMENT_STATUS } from '@clean-rn/kyc/domain';

import { HttpConnection, wrapSagaHidingNotFoundError } from '@clean-rn/shared/infrastructure';

import { IKycTypes, checkCustomerStatus, customerStatusChecked, initializeKyc } from '../../commands';
import { IKycState, kycReducer } from '../../state-management';

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

describe('ListAccounts - integration', () => {
  let sagaTester: SagaTester;
  let httpConnection: HttpConnection;

  const mockResponse: IDocument[] = [
    {
      typeId: 6,
      status: DOCUMENT_STATUS.PENDING,
      name: 'test-mock',
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
    const initialState: IKycState = {
      pending: false,
      customer: null,
    };
    sagaTester = new SagaTester({
      initialState,
      reducers: kycReducer,
    });
  });

  it('Should store correct initial state if not initial state is provided', () => {
    const newState = kycReducer(undefined, {
      type: IKycTypes.CHECK_CUSTOMER_STATUS,
    });

    expect(newState).toEqual({
      pending: true,
      customer: null,
    });
  });

  it('Should store correct state if CUSTOMER_STATUS_CHECKED', () => {
    const customer = Customer.Create({ id: 123, properties: { documents: mockResponse, status: 'PENDING' } });
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
});
