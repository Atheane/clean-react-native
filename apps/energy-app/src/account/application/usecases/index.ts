/* eslint-disable @typescript-eslint/no-explicit-any */
import { call, put, StrictEffect, takeEvery } from 'redux-saga/effects';

import { HttpConnection } from '@clean-rn/shared/infrastructure';
import { IAccount } from '@clean-rn/account/domain';
import { AccountApi } from '@clean-rn/account/infrastructure';
import { ISharedStackPages } from '../../../shared/presentation/types';
import { navigate } from '../../../shared/presentation/navigation/navigationRef';
import { showUnknownError } from '../../../shared/application/commands/manage-global-errors';

import { accountsListed, IAccountsTypes, resetPending } from '../commands/accounts';
import { ensureTokenRefreshed } from '../../../shared/application/usecases/ensureTokenRefreshed';

export function* listAccountsSaga(httpConnection: HttpConnection): Generator<StrictEffect, any, any> {
  yield takeEvery(IAccountsTypes.LIST_ACCOUNTS, listAccountsGenerator, httpConnection);
}

export function* listAccountsGenerator(httpConnection: HttpConnection): Generator<StrictEffect, any, any> {
  try {
    yield call(ensureTokenRefreshed, httpConnection);
    const api = AccountApi.getInstance(httpConnection);
    const accounts: IAccount[] = yield call([api, api.getAccounts]);
    yield put(accountsListed(accounts));
    yield call(navigate, { route: ISharedStackPages.HOME });
  } catch (error: unknown) {
    // Gestion des erreurs non attendues
    yield put(resetPending());
    yield put(showUnknownError(error as Error));
  }
}
