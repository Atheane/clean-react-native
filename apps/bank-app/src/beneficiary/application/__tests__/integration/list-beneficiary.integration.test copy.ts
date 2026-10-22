/* eslint-disable  @typescript-eslint/no-explicit-any */
import SagaTester from 'redux-saga-tester';
import Constants from 'expo-constants';
//
import { HttpConnection, wrapSagaHidingNotFoundError } from '@clean-rn/shared/infrastructure';

import {
  IBeneficiaryTypes,
  beneficiaryList,
  beneficiaryListed,
  beneficiaryListInit,
} from '../../commands/beneficiary';
import { IBeneficiaryState, beneficiaryReducer } from '../../state-management';

import { listBeneficiarySaga } from '../../usecases/beneficiary';

const expoConstantsMock = {
  name: 'CleanRN BankApp Test',
  slug: 'clean-rn-bank-app-test',
  extra: {
    BASE_URL_API: 'https://fake-api.com',
    NODE_ENV: 'test',
  },
};
jest.mock('expo-constants', () => expoConstantsMock);

describe('ListBeneficiary - integration', () => {
  let sagaTester: SagaTester;
  let httpConnection: HttpConnection;

  const mockResponse = [
    {
      beneficiaryId: 4004318954,
      iban: 'FR7616798000010000242599449',
      bic: 'TRZOFR21XXX',
      name: 'MOCKBENEFICIARY',
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
      type: IBeneficiaryTypes.BENEFICIARY_LIST,
    });

    expect(newState).toEqual({
      pending: true,
      beneficiaries: null,
      error: null,
    });
  });

  it('Should store correct state if BENEFICIARY_LISTED', () => {
    sagaTester.start(wrapSagaHidingNotFoundError, listBeneficiarySaga, httpConnection);
    sagaTester.dispatch(beneficiaryList());
    sagaTester.dispatch(beneficiaryListed(mockResponse));

    expect(sagaTester.getState()).toEqual({
      pending: false,
      beneficiaries: mockResponse,
      error: null,
    });
  });

  it('Should store correct state if INITIALIZE_LIST_BENEFICIARY', () => {
    sagaTester.start(wrapSagaHidingNotFoundError, listBeneficiarySaga, httpConnection);
    sagaTester.dispatch(beneficiaryListInit());

    expect(sagaTester.getState()).toEqual({
      pending: false,
      beneficiaries: null,
      error: null,
    });
  });
});
