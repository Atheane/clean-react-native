/* eslint-disable @typescript-eslint/no-explicit-any */
import { call, put, StrictEffect, takeEvery, select } from 'redux-saga/effects';

import { IAccount } from '@clean-rn/account/domain';
import { HttpConnection } from '@clean-rn/shared/infrastructure';
import { AccountApi } from '@clean-rn/account/infrastructure';

import { accountsListed, IGetAccountsTypes, initializeListAccounts } from '../../commands/list-accounts';
import { IHomeStackPages } from '../../../../shared/presentation/types';
import { IRootState } from '../../../../shared/application/state-management/reducers/root-reducer';
import { navigate } from '../../../../shared/presentation/navigation/navigationRef';
import { showUnknownError } from '../../../../shared/application/commands/manage-global-errors';

export function* listAccountsSaga(httpConnection: HttpConnection): Generator<StrictEffect, any, any> {
  yield takeEvery(IGetAccountsTypes.LIST_ACCOUNTS, listAccountsGenerator, httpConnection);
}

export function* listAccountsGenerator(httpConnection: HttpConnection): Generator<StrictEffect, any, any> {
  try {
    const { accounts: accountsFromStore } = yield select((state: IRootState) => state.account.accounts);

    let accounts;
    if (accountsFromStore && accountsFromStore.length > 0) {
      accounts = accountsFromStore;
      yield put(accountsListed(accounts));
      yield call(navigate, { route: IHomeStackPages.MENU });
    } else {
      const api = AccountApi.getInstance(httpConnection);

      const accounts: IAccount[] = yield call([api, api.getAccounts]);
      console.log('>>>>>>>>>>>>> listAccountsGenerator');
      yield put(accountsListed(accounts));
      yield call(navigate, { route: IHomeStackPages.MENU });
    }
  } catch (error: unknown) {
    yield put(initializeListAccounts());
    yield put(showUnknownError(error as Error));
  }
}
