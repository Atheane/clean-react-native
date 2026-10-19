/* eslint-disable @typescript-eslint/no-explicit-any */
import { call, put, StrictEffect, takeEvery, select, cancel } from 'redux-saga/effects';

import { IAccount, ITransaction, IStatementsPeriod } from '@clean-rn/account/domain';

import { HttpConnection, ServerError } from '@clean-rn/shared/infrastructure';
import { TransactionApi } from '@clean-rn/account/infrastructure';

import {
  transactionsListed,
  ITransactionsTypes,
  initializeTransactionsList,
  statementsDownloaded,
} from '../../commands/transactions';
import { IHomeStackPages } from '../../../../shared/presentation/types';
import { navigate } from '../../../../shared/presentation/navigation/navigationRef';
import { showUnknownError } from '../../../../shared/application/commands/manage-global-errors';
import { selectTransactions } from '../../state-management/selectors';
import { userUnauthenticated } from '../../../../auth/application/commands/login';
import { AuthError } from '@clean-rn/auth/domain';

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
    // https://redux-saga.js.org/docs/basics/ErrorHandling/ expected error must be managed at the saga level
    if (error instanceof ServerError && error.statusCode === 401) {
      yield put(userUnauthenticated(new AuthError.UserUnauthenticated()));
      yield cancel();
    }
    // once app is well tested, delete this part and let onError hook manage unexpected errors
    yield put(initializeTransactionsList());
    yield put(showUnknownError(error as Error));
  }
}

export function* downloadStatementsSaga(httpConnection: HttpConnection): Generator<StrictEffect, any, any> {
  yield takeEvery(ITransactionsTypes.DOWNLOAD_STATEMENTS, downloadStatementsGenerator, httpConnection);
}

export function* downloadStatementsGenerator(
  httpConnection: HttpConnection,
  {
    payload,
  }: {
    type: string;
    payload: {
      account: IAccount;
      period: IStatementsPeriod;
    };
  },
): Generator<StrictEffect, any, any> {
  try {
    // const { statements: statementsFromStore } = yield select(selectTransactions);
    // let statements;
    // if (statementsFromStore[payload.period] && statementsFromStore[payload.period].length > 0) {
    //   statements = statementsFromStore;
    //   yield put(statementsDownloaded({ buffer: statements[payload.period], period: payload.period }));
    //   yield call(navigate, {
    //     route: IHomeStackPages.ACCOUNT_STATEMENTS_PDF,
    //     params: { period: payload.period },
    //   });
    // } else {
    const api = TransactionApi.getInstance(httpConnection);

    const buffer: ArrayBuffer = yield call(
      [api, api.getStatements],
      payload.account.accountId,
      payload.period,
    );
    console.log('>>>>>>>>buffer', buffer);
    yield put(statementsDownloaded({ buffer, period: payload.period }));
    yield call(navigate, {
      route: IHomeStackPages.ACCOUNT_STATEMENTS_PDF,
      params: { period: payload.period },
    });
    // }
  } catch (error: unknown) {
    console.log(error);
    // https://redux-saga.js.org/docs/basics/ErrorHandling/ expected error must be managed at the saga level
    if (error instanceof ServerError && error.statusCode === 401) {
      yield put(userUnauthenticated(new AuthError.UserUnauthenticated()));
      yield cancel();
    }
    // once app is well tested, delete this part and let onError hook manage unexpected errors
    yield put(initializeTransactionsList());
    yield put(showUnknownError(error as Error));
  }
}
