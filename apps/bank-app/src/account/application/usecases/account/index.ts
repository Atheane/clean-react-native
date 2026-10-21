/* eslint-disable @typescript-eslint/no-explicit-any */
import { call, put, StrictEffect, takeEvery, select, cancel } from 'redux-saga/effects';

import { HttpConnection, ServerError } from '@clean-rn/shared/infrastructure';
import { IAccount } from '@clean-rn/account/domain';
import { AccountApi } from '@clean-rn/account/infrastructure';

import {
  listAccounts,
  accountsListed,
  IAccountsTypes,
  initializeAccountsList,
} from '../../commands/accounts';
import { IHomeStackPages } from '../../../../shared/presentation/types';
import { navigate } from '../../../../shared/presentation/navigation/navigationRef';
import { showUnknownError } from '../../../../shared/application/commands/manage-global-errors';

import { fetchRefresh } from '../../../../auth/application/commands/login';

import { selectAccounts } from '../../state-management/selectors';

export function* listAccountsSaga(httpConnection: HttpConnection): Generator<StrictEffect, any, any> {
  yield takeEvery(IAccountsTypes.LIST_ACCOUNTS, listAccountsGenerator, httpConnection);
}

export function* listAccountsGenerator(httpConnection: HttpConnection): Generator<StrictEffect, any, any> {
  try {
    const { accounts: accountsFromStore } = yield select(selectAccounts);
    let accounts;
    if (accountsFromStore) {
      accounts = accountsFromStore;
      yield put(accountsListed(accounts));
      yield call(navigate, { route: IHomeStackPages.ACCOUNTS });
    } else {
      const api = AccountApi.getInstance(httpConnection);

      const accounts: IAccount[] = yield call([api, api.getAccounts]);

      yield put(accountsListed(accounts));
      yield call(navigate, { route: IHomeStackPages.ACCOUNTS });
    }
  } catch (error: unknown) {
    if (error instanceof ServerError && error.statusCode === 401) {
      yield put(fetchRefresh());
      yield put(listAccounts());
      yield cancel();
    }
    // Gestion des erreurs non attendues
    yield put(initializeAccountsList());
    yield put(showUnknownError(error as Error));
  }
}
