/* eslint-disable @typescript-eslint/no-explicit-any */
import { call, put, StrictEffect, takeEvery, select, cancel } from 'redux-saga/effects';

import { IAccount } from '@clean-rn/account/domain';
import { ITransaction } from '@clean-rn/transaction/domain';

import { AuthApi } from '@clean-rn/auth/infrastructure';

import { HttpConnection, ServerError } from '@clean-rn/shared/infrastructure';
import { TransactionApi } from '@clean-rn/transaction/infrastructure';

import { selectAuth } from '../../../auth/application/state-management/selectors';
import { refreshSuccess } from '../../../auth/application/commands';

import { navigate } from '../../../shared/presentation/navigation/navigationRef';
import { showUnknownError } from '../../../shared/application/commands/manage-global-errors';
import { IAuthStackPages, ITransactionStackPages } from '../../../shared/presentation/types';

import { accountSelected } from '../../../account/application/commands/accounts';

import { selectTransactions } from '../selectors';
import { transactionsListed, ITransactionsTypes, initializeTransactionsList } from '../commands';

export function* listTransactionsSaga(httpConnection: HttpConnection): Generator<StrictEffect, any, any> {
  yield takeEvery(ITransactionsTypes.LIST_TRANSACTIONS, listTransactionsGenerator, httpConnection);
}

export function* listTransactionsGenerator(
  httpConnection: HttpConnection,
  {
    payload,
  }: {
    type: string;
    payload: {
      account: IAccount;
    };
  },
): Generator<StrictEffect, any, any> {
  try {
    const { transactions: transactionsFromStore } = yield select(selectTransactions);

    let transactions;
    if (transactionsFromStore) {
      transactions = transactionsFromStore;
      yield put(transactionsListed(transactions));
      yield put(accountSelected(payload.account));
      yield call(navigate, {
        route: ITransactionStackPages.MENU,
      });
    } else {
      const authApi = AuthApi.getInstance(httpConnection);
      const authFromStore = yield select(selectAuth);
      const auth = yield call([authApi, authApi.refresh], authFromStore.refreshToken);
      yield put(refreshSuccess({ auth }));

      const api = TransactionApi.getInstance(httpConnection);

      const transactions: ITransaction[] = yield call([api, api.getTransactions], payload.account.accountId);
      yield put(transactionsListed(transactions));
      yield put(accountSelected(payload.account));
      yield call(navigate, {
        route: ITransactionStackPages.MENU,
      });
    }
  } catch (error: unknown) {
    if (error instanceof ServerError && error.statusCode === 401) {
      yield call(navigate, { route: IAuthStackPages.LOGIN });
      yield cancel();
    }
    // Gestion des erreurs non attendues
    yield put(initializeTransactionsList());
    yield put(showUnknownError(error as Error));
  }
}
