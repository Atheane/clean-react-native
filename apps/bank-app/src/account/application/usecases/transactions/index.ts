/* eslint-disable @typescript-eslint/no-explicit-any */
import { call, put, StrictEffect, takeEvery, select, cancel } from 'redux-saga/effects';

import { IAccount, ITransaction } from '@clean-rn/account/domain';

import { HttpConnection, ServerError } from '@clean-rn/shared/infrastructure';
import { TransactionApi } from '@clean-rn/account/infrastructure';

import { selectAuth } from '../../../../auth/application/state-management/selectors';
import { refreshSuccess } from '../../../../auth/application/commands';

import { navigate } from '../../../../shared/presentation/navigation/navigationRef';
import { showUnknownError } from '../../../../shared/application/commands/manage-global-errors';
import { selectTransactions } from '../../state-management/selectors';

import { AuthApi } from '@clean-rn/auth/infrastructure';

import { IAuthStackPages, IHomeStackPages } from '../../../../shared/presentation/types';

import {
  transactionsListed,
  ITransactionsTypes,
  initializeTransactionsList,
} from '../../commands/transactions';

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
      yield call(navigate, { route: IHomeStackPages.TRANSACTIONS, params: { account: payload.account } });
    } else {
      const authApi = AuthApi.getInstance(httpConnection);
      const authFromStore = yield select(selectAuth);
      const auth = yield call([authApi, authApi.refresh], authFromStore.refreshToken);
      yield put(refreshSuccess({ auth }));

      const api = TransactionApi.getInstance(httpConnection);

      const transactions: ITransaction[] = yield call([api, api.getTransactions], payload.account.accountId);
      yield put(transactionsListed(transactions));
      yield call(navigate, { route: IHomeStackPages.TRANSACTIONS, params: { account: payload.account } });
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
