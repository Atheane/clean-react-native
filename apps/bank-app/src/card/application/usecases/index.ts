/* eslint-disable @typescript-eslint/no-explicit-any */
import { call, put, StrictEffect, takeEvery, select, cancel } from 'redux-saga/effects';

import {
  CardError,
  IChangeCardLimitsCommand,
  IToggleCardLockCommand,
  IChangeCardPINCommand,
} from '@clean-rn/card/domain';
import { AuthApi } from '@clean-rn/auth/infrastructure';

import { HttpConnection, ServerError } from '@clean-rn/shared/infrastructure';
import { CardApi } from '@clean-rn/card/infrastructure';

import {
  cardLimitsChanged,
  initCard,
  ICardTypes,
  cardLockToggled,
  cardPINChanged,
  cardPINChangedFailed,
} from '../commands';
import { IAuthStackPages, ICardStackPages } from '../../../shared/presentation/types';
import { navigate } from '../../../shared/presentation/navigation/navigationRef';
import { showUnknownError } from '../../../shared/application/commands/manage-global-errors';
import { selectAuth } from '../../../auth/application/state-management/selectors';
import { refreshSuccess } from '../../../auth/application/commands';
import { selectCard } from '../state-management/selectors';

export function* changeCardPINSaga(httpConnection: HttpConnection): Generator<StrictEffect, any, any> {
  yield takeEvery(ICardTypes.FETCH_CHANGE_CARD_PIN, changeCardPINGenerator, httpConnection);
}

export function* changeCardPINGenerator(
  httpConnection: HttpConnection,
  {
    payload,
  }: {
    type: string;
    payload: IChangeCardPINCommand;
  },
): Generator<StrictEffect, any, any> {
  try {
    const authApi = AuthApi.getInstance(httpConnection);
    const authFromStore = yield select(selectAuth);
    const auth = yield call([authApi, authApi.refresh], authFromStore.refreshToken);
    yield put(refreshSuccess({ auth }));
    const cardFromStore = yield select(selectCard);
    const cardApi = CardApi.getInstance(httpConnection);
    const card = yield call([cardApi, cardApi.changeCardPIN], cardFromStore, payload);
    yield put(cardPINChanged(card));
    yield call(navigate, { route: ICardStackPages.CHANGE_PIN_SUCCESS });
  } catch (error: unknown) {
    if (error instanceof ServerError && error.statusCode === 401) {
      yield call(navigate, { route: IAuthStackPages.LOGIN });
      yield cancel();
    }
    if (error instanceof ServerError && error.statusCode === 403) {
      yield put(cardPINChangedFailed(new CardError.MaxNumberOfPinChangesReached()));
      yield cancel();
    }
    yield put(initCard());
    // Gestion des erreurs non attendues
    yield put(showUnknownError(error as Error));
  }
}

export function* changeCardLimitsSaga(httpConnection: HttpConnection): Generator<StrictEffect, any, any> {
  yield takeEvery(ICardTypes.FETCH_CHANGE_CARD_LIMITS, changeCardLimitsGenerator, httpConnection);
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
    const cardFromStore = yield select(selectCard);
    const cardApi = CardApi.getInstance(httpConnection);
    const card = yield call([cardApi, cardApi.changeCardLimits], cardFromStore, payload);
    yield put(cardLimitsChanged(card));
    yield call(navigate, { route: ICardStackPages.CARD });
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

export function* toggleCardLockSaga(httpConnection: HttpConnection): Generator<StrictEffect, any, any> {
  yield takeEvery(ICardTypes.FETCH_TOGGLE_LOCK, toggleCardLockGenerator, httpConnection);
}

export function* toggleCardLockGenerator(
  httpConnection: HttpConnection,
  {
    payload,
  }: {
    type: string;
    payload: IToggleCardLockCommand;
  },
): Generator<StrictEffect, any, any> {
  try {
    const authApi = AuthApi.getInstance(httpConnection);
    const authFromStore = yield select(selectAuth);
    const auth = yield call([authApi, authApi.refresh], authFromStore.refreshToken);
    yield put(refreshSuccess({ auth }));
    const cardFromStore = yield select(selectCard);
    const cardApi = CardApi.getInstance(httpConnection);
    const card = yield call([cardApi, cardApi.toggleCardLock], cardFromStore, payload);
    yield put(cardLockToggled(card));
    yield call(navigate, { route: ICardStackPages.LOCK_CARD_SUCCESS });
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
