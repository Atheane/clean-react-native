/* eslint-disable @typescript-eslint/no-explicit-any */
import { call, put, StrictEffect, takeEvery, select, cancel } from 'redux-saga/effects';

import {
  CardError,
  Card,
  IChangeCardLimitsCommand,
  ICreateCardCommand,
  ILimits,
} from '@clean-rn/card/domain';

import { AuthApi } from '@clean-rn/auth/infrastructure';

import { HttpConnection, ServerError } from '@clean-rn/shared/infrastructure';
import { CardApi } from '@clean-rn/card/infrastructure';

import { cardLimitsChanged, initCard, ICardTypes, cardGetSuccess } from '../commands';
import { IAuthStackPages, ICardStackPages } from '../../../shared/presentation/types';
import { navigate } from '../../../shared/presentation/navigation/navigationRef';
import { showUnknownError } from '../../../shared/application/commands/manage-global-errors';
import { selectAuth } from '../../../auth/application/state-management/selectors';
import { refreshSuccess } from '../../../auth/application/commands';

export function* getCardSaga(httpConnection: HttpConnection): Generator<StrictEffect, any, any> {
  yield takeEvery(ICardTypes.FETCH_GET_CARD, getCardGenerator, httpConnection);
}

export function* changeCardLimitsSaga(httpConnection: HttpConnection): Generator<StrictEffect, any, any> {
  yield takeEvery(ICardTypes.FETCH_CHANGE_CARD_LIMITS, changeCardLimitsGenerator, httpConnection);
}

export function* getCardGenerator(httpConnection: HttpConnection): Generator<StrictEffect, any, any> {
  try {
    const authApi = AuthApi.getInstance(httpConnection);
    const authFromStore = yield select(selectAuth);
    const auth = yield call([authApi, authApi.refresh], authFromStore.refreshToken);
    yield put(refreshSuccess({ auth }));
    const cardApi = CardApi.getInstance(httpConnection);
    const card = yield call([cardApi, cardApi.getCard]);
    yield put(cardGetSuccess(card));
    yield call(navigate, { route: ICardStackPages.MENU });
  } catch (error: unknown) {
    if (error instanceof ServerError && error.statusCode === 401) {
      yield call(navigate, { route: IAuthStackPages.LOGIN });
      yield cancel();
    }
    yield put(initCard());
    // Gestion des erreurs non attendues
    yield put(showUnknownError(error as Error));
  }
}

export function* changeCardLimitsGenerator(
  httpConnection: HttpConnection,
  {
    payload,
  }: {
    type: string;
    payload: IChangeCardLimitsCommand;
  },
): Generator<StrictEffect, any, any> {
  try {
    const authApi = AuthApi.getInstance(httpConnection);
    const authFromStore = yield select(selectAuth);
    const auth = yield call([authApi, authApi.refresh], authFromStore.refreshToken);
    yield put(refreshSuccess({ auth }));
    const cardApi = CardApi.getInstance(httpConnection);
    const card = yield call([cardApi, cardApi.changeCardLimits], payload);
    yield put(cardLimitsChanged(card));
    yield call(navigate, { route: ICardStackPages.MENU });
  } catch (error: unknown) {
    if (error instanceof ServerError && error.statusCode === 401) {
      yield call(navigate, { route: IAuthStackPages.LOGIN });
      yield cancel();
    }
    yield put(initCard());
    // Gestion des erreurs non attendues
    yield put(showUnknownError(error as Error));
  }
}
