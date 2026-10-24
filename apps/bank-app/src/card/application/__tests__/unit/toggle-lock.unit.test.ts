/* eslint-disable  @typescript-eslint/no-explicit-any */
import { takeEvery } from 'redux-saga/effects';
import { testSaga } from 'redux-saga-test-plan';

import { HttpConnection, ServerError } from '@clean-rn/shared/infrastructure';
import { CardApi } from '@clean-rn/card/infrastructure';
import { Card, ICardStatuses } from '@clean-rn/card/domain';

import { showUnknownError } from '../../../../shared/application/commands/manage-global-errors';
import { ICardStackPages } from '../../../../shared/presentation/types';
import { navigate } from '../../../../shared/presentation/navigation/navigationRef';

import { toggleCardLockSaga, toggleCardLockGenerator } from '../../usecases';
import { ICardTypes, cardLockToggled, resetError } from '../../commands';
import { selectCard } from '../../state-management/selectors';
import { ensureTokenRefreshed } from '../../../../shared/application/usecases/ensureTokenRefreshed';

describe('Toggle Card lock - usecase', () => {
  const httpConnection = HttpConnection.getInstance(process.env.EXPO_PUBLIC_BASE_URL_API || '');
  const api = CardApi.getInstance(httpConnection);

  const mockCardServeur = {
    cardId: 999826250,
    userId: 100087408,
    publicToken: '100310268',
    statusCode: ICardStatuses.UNLOCK,
    isLive: false,
    pin: '6666',
    pinChange: 0,
    pinTryExceeds: false,
    expiryDate: '2027-01-31T00:00:00.000Z',
    limitPaymentYear: 30000,
    limitPaymentMonth: 9000,
    limitPaymentWeek: 6000,
    limitPaymentDay: 3000,
  };

  const card = Card.Create({
    cardId: mockCardServeur.cardId,
    statusCode: mockCardServeur.statusCode,
    pinString: mockCardServeur.pin,
    pinChange: mockCardServeur.pinChange,
    expiryDate: new Date(mockCardServeur.expiryDate),
    limitPaymentYear: mockCardServeur.limitPaymentYear,
    limitPaymentMonth: mockCardServeur.limitPaymentMonth,
    limitPaymentWeek: mockCardServeur.limitPaymentWeek,
    limitPaymentDay: mockCardServeur.limitPaymentDay,
  });

  const mockToken = {
    accessToken: 'fake-access-token',
    refreshToken: 'fake-refresh-token',
  };

  const mockError500 = {
    statusCode: 500,
    message: "Cannot read properties of null (reading 'cardId')",
    response: '',
    timestamp: '2024-01-30T16:44:14.795Z',
    path: '/app/card/99982625/limits',
    method: 'PUT',
    body: {
      limitPaymentDay: 300,
      limitPaymentWeek: 2500,
      limitPaymentMonth: 5000,
    },
  };

  const genObject = toggleCardLockSaga(httpConnection);

  it('Should wait for FETCH_TOGGLE_LOCK action and call fetchToggleLock, should be done on next iteration', () => {
    expect(genObject.next().value).toEqual(
      takeEvery(ICardTypes.FETCH_TOGGLE_LOCK, toggleCardLockGenerator, httpConnection),
    );
    expect(genObject.next().done).toBeTruthy();
  });

  it('Should call cardLockToggled', async () => {
    testSaga(toggleCardLockGenerator, httpConnection, {
      type: ICardTypes.FETCH_TOGGLE_LOCK,
      payload: {
        lock: true,
      },
    })
      .next()
      .call(ensureTokenRefreshed, httpConnection)
      .next()
      .select(selectCard)
      .next(card)
      .call([api, api.toggleCardLock], card, { lock: true })
      .next(card)
      .put(cardLockToggled(card))
      .next()
      .call(navigate, { route: ICardStackPages.LOCK_CARD_SUCCESS })
      .next();
  });

  it('Should call showUnknownError action if 500 from Server', () => {
    testSaga(toggleCardLockGenerator, httpConnection, {
      type: ICardTypes.FETCH_TOGGLE_LOCK,
      payload: {
        lock: true,
      },
    })
      .next()
      .call(ensureTokenRefreshed, httpConnection)
      .next()
      .select(selectCard)
      .next(card)
      .call([api, api.toggleCardLock], card, { lock: true })
      .throw(new ServerError(mockError500))
      .put(resetError())
      .next()
      .put(showUnknownError(new ServerError(mockError500)))
      .next();
  });

  it('Should call showUnknownError action if unknown error', () => {
    testSaga(toggleCardLockGenerator, httpConnection, {
      type: ICardTypes.FETCH_TOGGLE_LOCK,
      payload: {
        lock: true,
      },
    })
      .next()
      .call(ensureTokenRefreshed, httpConnection)
      .next()
      .select(selectCard)
      .next(card)
      .call([api, api.toggleCardLock], card, { lock: true })
      .throw(new Error('unknown error'))
      .put(resetError())
      .next()
      .put(showUnknownError(new Error('unknown error')))
      .next();
  });
});
