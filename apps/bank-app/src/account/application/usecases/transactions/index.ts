/* eslint-disable @typescript-eslint/no-explicit-any */
import { call, put, StrictEffect, takeEvery, select, cancel } from 'redux-saga/effects';

import { IAccount, ITransaction } from '@clean-rn/account/domain';

import { HttpConnection, ServerError } from '@clean-rn/shared/infrastructure';
import { TransactionApi } from '@clean-rn/account/infrastructure';

import { IHomeStackPages } from '../../../../shared/presentation/types';
import { navigate } from '../../../../shared/presentation/navigation/navigationRef';
import { showUnknownError } from '../../../../shared/application/commands/manage-global-errors';
import { selectTransactions } from '../../state-management/selectors';

import { fetchRefresh } from '../../../../auth/application/commands/login';

import {
  listTransactions,
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
      const api = TransactionApi.getInstance(httpConnection);

      const transactions: ITransaction[] = yield call([api, api.getTransactions], payload.account.accountId);
      yield put(transactionsListed(transactions));
      yield call(navigate, { route: IHomeStackPages.TRANSACTIONS, params: { account: payload.account } });
    }
  } catch (error: unknown) {
    if (error instanceof ServerError && error.statusCode === 401) {
      yield put(fetchRefresh());
      yield put(listTransactions(payload));
      yield cancel();
    }
    // Gestion des erreurs non attendues
    yield put(initializeTransactionsList());
    yield put(showUnknownError(error as Error));
  }
}
