/* eslint-disable @typescript-eslint/no-explicit-any */
import { call, put, StrictEffect, takeEvery, select } from 'redux-saga/effects';

import { IAccount } from '@clean-rn/account/domain';

import { HttpConnection } from '@clean-rn/shared/infrastructure';
import { AccountApi } from '@clean-rn/account/infrastructure';

import { accountsListed, IAccountsTypes, initializeListAccounts } from '../../commands/list-accounts';
import { IHomeStackPages } from '../../../../shared/presentation/types';
import { navigate } from '../../../../shared/presentation/navigation/navigationRef';
import { showUnknownError } from '../../../../shared/application/commands/manage-global-errors';
import { selectAccounts } from '../../state-management/selectors';

export function* listAccountsSaga(httpConnection: HttpConnection): Generator<StrictEffect, any, any> {
  yield takeEvery(IAccountsTypes.LIST_ACCOUNTS, listAccountsGenerator, httpConnection);
}

export function* listAccountsGenerator(httpConnection: HttpConnection): Generator<StrictEffect, any, any> {
  try {
    const accountsFromStore = yield select(selectAccounts);
    let accounts;
    if (accountsFromStore) {
      accounts = accountsFromStore;
      yield put(accountsListed(accounts));
      yield call(navigate, { route: IHomeStackPages.MENU });
    } else {
      const api = AccountApi.getInstance(httpConnection);

      const accounts: IAccount[] = yield call([api, api.getAccounts]);
      yield put(accountsListed(accounts));
      yield call(navigate, { route: IHomeStackPages.MENU });
    }
  } catch (error: unknown) {
    yield put(initializeListAccounts());
    yield put(showUnknownError(error as Error));
  }
}
