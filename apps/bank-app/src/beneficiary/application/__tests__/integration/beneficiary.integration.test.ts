/* eslint-disable  @typescript-eslint/no-explicit-any */
import SagaTester from 'redux-saga-tester';
import Constants from 'expo-constants';
//
import { HttpConnection, wrapSagaHidingNotFoundError } from '@clean-rn/shared/infrastructure';

import {
  IBeneficiaryTypes,
  listBeneficiaries,
  addBeneficiary,
  deleteBeneficiary,
  initBeneficiary,
  beneficiariesListed,
  beneficiaryAdded,
  beneficiaryAddFailed,
  beneficiaryDeleted,
  beneficiaryDeleteFailed,
} from '../../commands/beneficiary';
import { IBeneficiaryState, beneficiaryReducer } from '../../state-management';

import { addBeneficiarySaga, deleteBeneficiarySaga, listBeneficiarySaga } from '../../usecases/beneficiary';
import { BeneficiaryError } from '@clean-rn/beneficiary/domain';

const expoConstantsMock = {
  name: 'CleanRN BankApp Test',
  slug: 'clean-rn-bank-app-test',
  extra: {
    BASE_URL_API: 'https://fake-api.com',
    NODE_ENV: 'test',
  },
};
jest.mock('expo-constants', () => expoConstantsMock);

describe('Beneficiary - integration', () => {
  let sagaTester: SagaTester;
  let httpConnection: HttpConnection;

  const mockBeneficiaries = [
    {
      beneficiaryId: 4004318954,
      iban: 'FR7616798000010000242599449',
      bic: 'TRZOFR21XXX',
      name: 'MOCKBENEFICIARY',
    },
  ];

  const mockError400 = {
    message: 'Core::BeneficiaryService::Create - Bad Request',
    statusCode: 400,
    response: 'Core::BeneficiaryService::Create - Bad Request',
    timestamp: '2024-01-07T15:28:04.657Z',
    path: '/app/beneficiary',
  };

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
    const initialState: IBeneficiaryState = {
      pending: false,
      beneficiaries: null,
      error: null,
    };
    sagaTester = new SagaTester({
      initialState,
      reducers: beneficiaryReducer,
    });
  });

  it('Should store correct initial state if not initial state is provided', () => {
    const newState = beneficiaryReducer(undefined, {
      type: IBeneficiaryTypes.LIST_BENEFICIARIES,
    });

    expect(newState).toEqual({
      pending: true,
      beneficiaries: null,
      error: null,
    });
  });

  it('Should store correct state if BENEFICIARIES_LISTED', () => {
    sagaTester.start(wrapSagaHidingNotFoundError, listBeneficiarySaga, httpConnection);
    sagaTester.dispatch(listBeneficiaries());
    sagaTester.dispatch(beneficiariesListed(mockBeneficiaries));

    expect(sagaTester.getState()).toEqual({
      pending: false,
      beneficiaries: mockBeneficiaries,
      error: null,
    });
  });

  it('Should store correct state if INIT_BENEFICIARY', () => {
    sagaTester.start(wrapSagaHidingNotFoundError, listBeneficiarySaga, httpConnection);
    sagaTester.dispatch(listBeneficiaries());
    sagaTester.dispatch(beneficiariesListed(mockBeneficiaries));
    sagaTester.dispatch(initBeneficiary());

    expect(sagaTester.getState()).toEqual({
      pending: false,
      beneficiaries: null,
      error: null,
    });
  });

  it('Should store correct state if BENEFICIARY_ADDED', () => {
    const mockRequest = {
      iban: 'FR7616798000010000242599449',
      bic: 'TRZOFR21XXX',
      name: 'BENFMOCK',
    };
    const mockResponse = {
      beneficiaryId: 4004318954,
      iban: 'FR7616798000010000242599449',
      bic: 'TRZOFR21XXX',
      name: 'BENFMOCK',
    };

    sagaTester.start(wrapSagaHidingNotFoundError, addBeneficiarySaga, httpConnection);
    sagaTester.dispatch(addBeneficiary(mockRequest));
    sagaTester.dispatch(beneficiaryAdded(mockResponse));

    expect(sagaTester.getState()).toEqual({
      pending: false,
      beneficiaries: [mockResponse],
      error: null,
    });
  });

  it('Should store correct state if BENEFICIARY_ADDED_FAILED', () => {
    const mockRequest = {
      iban: 'FR7616798000010000242599449',
      bic: 'TRZOFR21XXX',
      name: 'BENFMOCK',
    };

    sagaTester.start(wrapSagaHidingNotFoundError, addBeneficiarySaga, httpConnection);
    sagaTester.dispatch(addBeneficiary(mockRequest));
    sagaTester.dispatch(
      beneficiaryAddFailed(new BeneficiaryError.BeneficiaryAlreadyExists(mockError400.message)),
    );

    expect(sagaTester.getState()).toEqual({
      pending: false,
      beneficiaries: null,
      error: new BeneficiaryError.BeneficiaryAlreadyExists(mockError400.message),
    });
  });

  it('Should store correct state if BENEFICIARY_DELETED', () => {
    const mockRequest = {
      beneficiaryId: 4004318954,
    };
    const mockResponse = {
      beneficiaryId: 4004318954,
      iban: 'FR7616798000010000242599449',
      bic: 'TRZOFR21XXX',
      name: 'BENFMOCK',
    };

    sagaTester.start(wrapSagaHidingNotFoundError, deleteBeneficiarySaga, httpConnection);
    sagaTester.dispatch(beneficiariesListed(mockBeneficiaries));
    sagaTester.dispatch(deleteBeneficiary(mockRequest));
    sagaTester.dispatch(beneficiaryDeleted(mockResponse));

    expect(sagaTester.getState()).toEqual({
      pending: false,
      beneficiaries: [],
      error: null,
    });
  });

  it('Should store correct state if BENEFICIARY_DELETED_FAILED', () => {
    const mockRequest = {
      beneficiaryId: 4004318954,
    };

    sagaTester.start(wrapSagaHidingNotFoundError, deleteBeneficiarySaga, httpConnection);
    sagaTester.dispatch(beneficiariesListed(mockBeneficiaries));
    sagaTester.dispatch(deleteBeneficiary(mockRequest));
    sagaTester.dispatch(
      beneficiaryDeleteFailed(new BeneficiaryError.BeneficiaryUnknown(mockError400.message)),
    );

    expect(sagaTester.getState()).toEqual({
      pending: false,
      beneficiaries: mockBeneficiaries,
      error: new BeneficiaryError.BeneficiaryUnknown(mockError400.message),
    });
  });
});
