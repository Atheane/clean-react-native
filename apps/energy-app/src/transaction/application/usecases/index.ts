/* eslint-disable @typescript-eslint/no-explicit-any */
import { call, put, StrictEffect, takeEvery } from 'redux-saga/effects';

import { IAccount } from '@clean-rn/account/domain';
import { ITransaction } from '@clean-rn/transaction/domain';

import { HttpConnection } from '@clean-rn/shared/infrastructure';
import { TransactionApi } from '@clean-rn/transaction/infrastructure';

import { showUnknownError } from '../../../shared/application/commands/manage-global-errors';

import { accountSelected } from '../../../account/application/commands/accounts';

import { transactionsListed, ITransactionsTypes, initializeTransactionsList } from '../commands';
import { ensureTokenRefreshed } from '../../../shared/application/usecases/ensureTokenRefreshed';

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
    yield call(ensureTokenRefreshed, httpConnection);
    const api = TransactionApi.getInstance(httpConnection);
    const transactions: ITransaction[] = yield call([api, api.getTransactions], payload.account.accountId);
    yield put(transactionsListed(transactions));
    yield put(accountSelected(payload.account));
  } catch (error: unknown) {
    // Gestion des erreurs non attendues
    yield put(initializeTransactionsList());
    yield put(showUnknownError(error as Error));
  }
}
