/* eslint-disable @typescript-eslint/no-explicit-any */
import { call, put, StrictEffect, takeEvery, select, cancel } from 'redux-saga/effects';

import { IAccount } from '@clean-rn/account/domain';

import { HttpConnection, ServerError } from '@clean-rn/shared/infrastructure';
import { AccountApi } from '@clean-rn/account/infrastructure';

import { accountsListed, IAccountsTypes, initializeAccountsList } from '../../commands/account';
import { IHomeStackPages } from '../../../../shared/presentation/types';
import { navigate } from '../../../../shared/presentation/navigation/navigationRef';
import { showUnknownError } from '../../../../shared/application/commands/manage-global-errors';
import { selectAccounts } from '../../state-management/selectors';
import { userUnauthenticated } from '../../../../auth/application/commands/login';
import { AuthError } from '@clean-rn/auth/domain';

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
      yield call(navigate, { route: IHomeStackPages.MENU });
    } else {
      const api = AccountApi.getInstance(httpConnection);

      const accounts: IAccount[] = yield call([api, api.getAccounts]);

      yield put(accountsListed(accounts));
      yield call(navigate, { route: IHomeStackPages.MENU });
    }
  } catch (error: unknown) {
    // https://redux-saga.js.org/docs/basics/ErrorHandling/ expected error must be managed at the saga level
    if (error instanceof ServerError && error.statusCode === 401) {
      yield put(userUnauthenticated(new AuthError.UserUnauthenticated()));
      yield cancel();
    }
    // once app is well tested, delete this part and let onError hook manage unexpected errors
    yield put(initializeAccountsList());
    yield put(showUnknownError(error as Error));
  }
}
