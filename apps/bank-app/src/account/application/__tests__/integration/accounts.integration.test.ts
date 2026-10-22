/* eslint-disable  @typescript-eslint/no-explicit-any */
import SagaTester from 'redux-saga-tester';
import Constants from 'expo-constants';

import { Bic, IAccountType, Iban } from '@clean-rn/account/domain';

import { HttpConnection, wrapSagaHidingNotFoundError } from '@clean-rn/shared/infrastructure';

import {
  IAccountsTypes,
  listAccounts,
  accountsListed,
  initializeAccountsList,
} from '../../commands/accounts';
import { IAccountsState, accountsReducer } from '../../state-management';

import { listAccountsSaga } from '../../usecases';

const expoConstantsMock = {
  name: 'CleanRN BankApp Test',
  slug: 'clean-rn-bank-app-test',
  extra: {
    BASE_URL_API: 'https://fake-api.com',
    NODE_ENV: 'test',
  },
};
jest.mock('expo-constants', () => expoConstantsMock);

describe('Accounts - integration', () => {
  let sagaTester: SagaTester;
  let httpConnection: HttpConnection;

  const mockResponse = [
    {
      accountId: 4004318954,
      accountType: IAccountType.MAIN,
      authorizedBalance: 0,
      iban: new Iban('FR7616798000010000242599449'),
      bic: new Bic('TRZOFR21XXX'),
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
    const initialState: IAccountsState = {
      pending: false,
      accounts: null,
    };
    sagaTester = new SagaTester({
      initialState,
      reducers: accountsReducer,
    });
  });

  it('Should store correct initial state if not initial state is provided', () => {
    const newState = accountsReducer(undefined, {
      type: IAccountsTypes.LIST_ACCOUNTS,
    });

    expect(newState).toEqual({
      pending: true,
      accounts: null,
    });
  });

  it('Should store correct state if ACCOUNTS_LISTED', () => {
    sagaTester.start(wrapSagaHidingNotFoundError, listAccountsSaga, httpConnection);
    sagaTester.dispatch(listAccounts());
    sagaTester.dispatch(accountsListed(mockResponse));

    expect(sagaTester.getState()).toEqual({
      pending: false,
      accounts: mockResponse,
    });
  });

  it('Should store correct state if INITIALIZE_LIST_ACCOUNTS', () => {
    sagaTester.start(wrapSagaHidingNotFoundError, listAccountsSaga, httpConnection);
    sagaTester.dispatch(initializeAccountsList());

    expect(sagaTester.getState()).toEqual({
      pending: false,
      accounts: null,
    });
  });
});
