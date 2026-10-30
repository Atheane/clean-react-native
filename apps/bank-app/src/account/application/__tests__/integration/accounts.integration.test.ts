/* eslint-disable  @typescript-eslint/no-explicit-any */
import SagaTester from 'redux-saga-tester';

import { Bic, IAccountType, Iban } from '@clean-rn/account/domain';

import {
  IAccountsTypes,
  listAccounts,
  accountsListed,
  initializeAccounts,
  accountSelected,
} from '../../commands/accounts';
import { IAccountsState, accountsReducer } from '../../state-management';

import { listAccountsSaga } from '../../usecases';

describe('Accounts - integration', () => {
  let sagaTester: SagaTester;

  const mockResponse = [
    {
      accountId: 4004318954,
      accountType: IAccountType.MAIN,
      authorizedBalance: 0,
      iban: new Iban('FR7616798000010000242599449'),
      bic: new Bic('TRZOFR21XXX'),
    },
  ];

  beforeEach(() => {
    const initialState: IAccountsState = {
      pending: false,
      accounts: null,
      selectedAccount: null,
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
      selectedAccount: null,
    });
  });

  it('Should store correct state if ACCOUNTS_LISTED', () => {
    sagaTester.start(listAccountsSaga);
    sagaTester.dispatch(listAccounts());
    sagaTester.dispatch(accountsListed(mockResponse));

    expect(sagaTester.getState()).toEqual({
      pending: false,
      accounts: mockResponse,
      selectedAccount: null,
    });
  });

  it('Should store correct state if INITIALIZE_ACCOUNTS', () => {
    sagaTester.start(listAccountsSaga);
    sagaTester.dispatch(initializeAccounts());

    expect(sagaTester.getState()).toEqual({
      pending: false,
      accounts: null,
      selectedAccount: null,
    });
  });

  it('Should store correct state if ACCOUNT_SELECTED', () => {
    sagaTester.start(listAccountsSaga);
    sagaTester.dispatch(accountSelected(mockResponse[0]));

    expect(sagaTester.getState()).toEqual({
      pending: false,
      accounts: null,
      selectedAccount: mockResponse[0],
    });
  });
});
