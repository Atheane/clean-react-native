/* eslint-disable @typescript-eslint/no-explicit-any */
import { call, put, StrictEffect, takeEvery, select, cancel } from 'redux-saga/effects';

import { HttpConnection, ServerError } from '@clean-rn/shared/infrastructure';
import { IAccount } from '@clean-rn/account/domain';
import { AccountApi } from '@clean-rn/account/infrastructure';

import { IAuthStackPages, ISharedStackPages } from '../../../shared/presentation/types';
import { navigate } from '../../../shared/presentation/navigation/navigationRef';
import { showUnknownError } from '../../../shared/application/commands/manage-global-errors';

import { accountsListed, IAccountsTypes, initializeAccountsList } from '../commands/accounts';

export function* listAccountsSaga(httpConnection: HttpConnection): Generator<StrictEffect, any, any> {
  yield takeEvery(IAccountsTypes.LIST_ACCOUNTS, listAccountsGenerator, httpConnection);
}

export function* listAccountsGenerator(httpConnection: HttpConnection): Generator<StrictEffect, any, any> {
  try {
    const api = AccountApi.getInstance(httpConnection);
    const accounts: IAccount[] = yield call([api, api.getAccounts]);

    yield put(accountsListed(accounts));
    yield call(navigate, { route: ISharedStackPages.HOME });
  } catch (error: unknown) {
    if (error instanceof ServerError && error.statusCode === 401) {
      yield call(navigate, { route: IAuthStackPages.LOGIN });
      yield cancel();
    }
    // Gestion des erreurs non attendues
    yield put(initializeAccountsList());
    yield put(showUnknownError(error as Error));
  }
}
