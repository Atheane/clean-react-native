/* eslint-disable @typescript-eslint/no-explicit-any */
import { call, put, StrictEffect, takeEvery, select, cancel } from 'redux-saga/effects';

import { IAccount } from '@clean-rn/account/domain';
import {
  IPayoutCommand,
  ITransaction,
  ITransactionWaitingCommand,
  ITransferCommand,
  TransactionError,
} from '@clean-rn/transaction/domain';

import { AuthApi } from '@clean-rn/auth/infrastructure';

import { HttpConnection, ServerError } from '@clean-rn/shared/infrastructure';
import { TransactionApi } from '@clean-rn/transaction/infrastructure';

import { selectAuth } from '../../../auth/application/state-management/selectors';
import { refreshSuccess } from '../../../auth/application/commands';

import { navigate } from '../../../shared/presentation/navigation/navigationRef';
import { showUnknownError } from '../../../shared/application/commands/manage-global-errors';
import {
  IAuthStackPages,
  ITransactionStackPages,
  IBeneficiaryStackPages,
} from '../../../shared/presentation/types';

import { accountSelected } from '../../../account/application/commands/accounts';

import {
  transactionsListed,
  ITransactionsTypes,
  initializeTransactionsList,
  payoutSucceded,
  transactionFailed,
  initTransaction,
  transferSucceded,
  transactionWaitingSucceded,
} from '../commands';

export function* listTransactionsSaga(httpConnection: HttpConnection): Generator<StrictEffect, any, any> {
  yield takeEvery(ITransactionsTypes.LIST_TRANSACTIONS, listTransactionsGenerator, httpConnection);
}

export function* payoutSaga(httpConnection: HttpConnection): Generator<StrictEffect, any, any> {
  yield takeEvery(ITransactionsTypes.FETCH_PAYOUT, payoutGenerator, httpConnection);
}

export function* transferSaga(httpConnection: HttpConnection): Generator<StrictEffect, any, any> {
  yield takeEvery(ITransactionsTypes.FETCH_TRANSFER, transferGenerator, httpConnection);
}

export function* transactionWaitingSaga(httpConnection: HttpConnection): Generator<StrictEffect, any, any> {
  yield takeEvery(ITransactionsTypes.FETCH_TRANSACTION_WAITING, transactionWaitingGenerator, httpConnection);
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

export function* transactionWaitingGenerator(
  httpConnection: HttpConnection,
  {
    payload,
  }: {
    type: string;
    payload: ITransactionWaitingCommand;
  },
): Generator<StrictEffect, any, any> {
  try {
    const authApi = AuthApi.getInstance(httpConnection);
    const authFromStore = yield select(selectAuth);
    const auth = yield call([authApi, authApi.refresh], authFromStore.refreshToken);
    yield put(refreshSuccess({ auth }));

    const api = TransactionApi.getInstance(httpConnection);
    const transaction: ITransaction = yield call([api, api.sendTransactionWaiting], payload);

    yield put(transactionWaitingSucceded(transaction));
    yield call(navigate, {
      route: IBeneficiaryStackPages.MENU,
      params: { screen: IBeneficiaryStackPages.TRANSFER_SUCCESS },
    });
  } catch (error: unknown) {
    if (error instanceof ServerError && error.statusCode === 401) {
      yield call(navigate, { route: IAuthStackPages.LOGIN });
      yield cancel();
    }
    if (error instanceof ServerError && error.statusCode === 403) {
      yield put(transactionFailed(new TransactionError.TransferAmountTooHigh(error)));
      yield cancel();
    }
    yield put(initTransaction());
    // Gestion des erreurs non attendues
    yield put(showUnknownError(error as Error));
  }
}

export function* payoutGenerator(
  httpConnection: HttpConnection,
  {
    payload,
  }: {
    type: string;
    payload: IPayoutCommand;
  },
): Generator<StrictEffect, any, any> {
  try {
    const authApi = AuthApi.getInstance(httpConnection);
    const authFromStore = yield select(selectAuth);
    const auth = yield call([authApi, authApi.refresh], authFromStore.refreshToken);
    yield put(refreshSuccess({ auth }));

    const api = TransactionApi.getInstance(httpConnection);
    const transaction: ITransaction = yield call([api, api.payout], payload);

    yield put(payoutSucceded(transaction));
    yield call(navigate, {
      route: IBeneficiaryStackPages.MENU,
      params: { screen: IBeneficiaryStackPages.TRANSFER_SUCCESS },
    });
  } catch (error: unknown) {
    if (error instanceof ServerError && error.statusCode === 401) {
      yield call(navigate, { route: IAuthStackPages.LOGIN });
      yield cancel();
    }
    if (error instanceof ServerError && error.statusCode === 403) {
      yield put(transactionFailed(new TransactionError.TransferAmountTooHigh(error)));
      yield cancel();
    }
    yield put(initTransaction());
    // Gestion des erreurs non attendues
    yield put(showUnknownError(error as Error));
  }
}

export function* transferGenerator(
  httpConnection: HttpConnection,
  {
    payload,
  }: {
    type: string;
    payload: ITransferCommand;
  },
): Generator<StrictEffect, any, any> {
  try {
    const authApi = AuthApi.getInstance(httpConnection);
    const authFromStore = yield select(selectAuth);
    const auth = yield call([authApi, authApi.refresh], authFromStore.refreshToken);
    yield put(refreshSuccess({ auth }));

    const api = TransactionApi.getInstance(httpConnection);
    const transaction: ITransaction = yield call([api, api.transfer], payload);

    yield put(transferSucceded(transaction));
    yield call(navigate, {
      route: IBeneficiaryStackPages.MENU,
      params: { screen: IBeneficiaryStackPages.TRANSFER_SUCCESS },
    });
  } catch (error: unknown) {
    if (error instanceof ServerError && error.statusCode === 401) {
      yield call(navigate, { route: IAuthStackPages.LOGIN });
      yield cancel();
    }
    if (error instanceof ServerError && error.statusCode === 403) {
      yield put(transactionFailed(new TransactionError.TransferAmountTooHigh(error)));
      yield cancel();
    }
    yield put(initTransaction());
    // Gestion des erreurs non attendues
    yield put(showUnknownError(error as Error));
  }
}
