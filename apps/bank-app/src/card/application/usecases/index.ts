/* eslint-disable @typescript-eslint/no-explicit-any */
import { call, put, StrictEffect, takeEvery, select, cancel } from 'redux-saga/effects';

import {
  CardError,
  Card,
  IChangeCardLimitsCommand,
  ICreateCardCommand,
  ILimits,
  IToggleCardLockCommand,
} from '@clean-rn/card/domain';
import { Customer } from '@clean-rn/kyc/domain';
import { KYC_REVIEW } from '@clean-rn/user/domain';
import { AuthApi } from '@clean-rn/auth/infrastructure';

import { HttpConnection, ServerError } from '@clean-rn/shared/infrastructure';
import { CardApi } from '@clean-rn/card/infrastructure';

import {
  cardLimitsChanged,
  initCard,
  ICardTypes,
  cardGetSuccess,
  cardNotFound,
  cardForbidden,
  cardLockToggled,
} from '../commands';
import { IAuthStackPages, ICardStackPages } from '../../../shared/presentation/types';
import { navigate } from '../../../shared/presentation/navigation/navigationRef';
import { showUnknownError } from '../../../shared/application/commands/manage-global-errors';
import { selectAuth } from '../../../auth/application/state-management/selectors';
import { refreshSuccess } from '../../../auth/application/commands';
import { selectCustomer } from '../../../kyc/application/state-management/selectors';
import { selectCard } from '../state-management/selectors';

export function* getCardSaga(httpConnection: HttpConnection): Generator<StrictEffect, any, any> {
  yield takeEvery(ICardTypes.FETCH_GET_CARD, getCardGenerator, httpConnection);
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
    if (error instanceof CardError.NotFound) {
      yield put(cardNotFound(error));
      const { customer: customerFromRedux } = yield select(selectCustomer);
      const customer = Customer.Create(customerFromRedux);
      if (customer.properties.status !== KYC_REVIEW.VALIDATED) {
        yield call(navigate, {
          route: ICardStackPages.MENU,
          params: { screen: ICardStackPages.KYC_MISSING },
        });
        yield cancel();
      }
      yield call(navigate, { route: ICardStackPages.MENU, params: { screen: ICardStackPages.WAITING_CARD } });
      yield cancel();
    }
    if (error instanceof ServerError && error.statusCode === 403) {
      yield put(cardForbidden(new CardError.Forbidden()));
      yield call(navigate, { route: ICardStackPages.MENU });
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
    console.log('cardFromStore', cardFromStore);
    const cardApi = CardApi.getInstance(httpConnection);
    const card = yield call([cardApi, cardApi.toggleLock], cardFromStore, payload);
    console.log('card', card);
    yield put(cardLockToggled(card));
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
