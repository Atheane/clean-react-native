/* eslint-disable  @typescript-eslint/no-explicit-any */
import { takeEvery } from 'redux-saga/effects';
import { testSaga } from 'redux-saga-test-plan';
import Constants from 'expo-constants';

import { HttpConnection, ServerError } from '@clean-rn/shared/infrastructure';
import { AuthApi } from '@clean-rn/auth/infrastructure';
import { Card, CardError, CardPinCode, ICardStatuses, IChangeCardPINCommand } from '@clean-rn/card/domain';

import { showUnknownError } from '../../../../shared/application/commands/manage-global-errors';
import { IAuthStackPages, ICardStackPages } from '../../../../shared/presentation/types';
import { navigate } from '../../../../shared/presentation/navigation/navigationRef';

import { changeCardPINGenerator, changeCardPINSaga } from '../../usecases';
import { ICardTypes, cardForbidden, cardPINChanged, initCard } from '../../commands';
import { selectAuth } from '../../../../auth/application/state-management/selectors';
import { refreshSuccess } from '../../../../auth/application/commands';
import { CardApi } from '@clean-rn/card/infrastructure';
import { selectCard } from '../../state-management/selectors';

describe('ChangePIN - usecase', () => {
  const httpConnection = HttpConnection.getInstance(Constants.expoConfig?.extra?.BASE_URL_API);
  const api = CardApi.getInstance(httpConnection);
  const authApi = AuthApi.getInstance(httpConnection);

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

  const changeCardPINCmd: IChangeCardPINCommand = {
    pin: new CardPinCode('1234'),
  };

  const mockToken = {
    accessToken: 'fake-access-token',
    refreshToken: 'fake-refresh-token',
  };

  const mockError401 = {
    statusCode: 401,
    message: 'Unauthorized',
    response: {
      message: 'Unauthorized',
      statusCode: 401,
    },
    timestamp: '2024-01-30T16:43:19.792Z',
    path: '/app/card/999826250/changePIN',
    method: 'PUT',
  };

  const mockError403 = {
    statusCode: 403,
    message: 'Forbidden',
    response: {
      message: 'Forbidden',
      statusCode: 403,
    },
    timestamp: '2024-01-30T16:43:19.792Z',
    path: '/app/card/999826250/changePIN',
    method: 'PUT',
  };

  const mockError500 = {
    statusCode: 500,
    message: "Cannot read properties of null (reading 'cardId')",
    response: '',
    timestamp: '2024-01-30T16:44:14.795Z',
    path: '/app/card/99982625/changePIN',
    method: 'PUT',
    body: {
      code: '1234',
    },
  };

  const genObject = changeCardPINSaga(httpConnection);

  it('Should wait for FETCH_CHANGE_CARD_PIN action and call changeCardPINGenerator, should be done on next iteration', () => {
    expect(genObject.next().value).toEqual(
      takeEvery(ICardTypes.FETCH_CHANGE_CARD_PIN, changeCardPINGenerator, httpConnection),
    );
    expect(genObject.next().done).toBeTruthy();
  });

  it('Should call cardPINChanged', async () => {
    testSaga(changeCardPINGenerator, httpConnection, {
      type: ICardTypes.FETCH_CHANGE_CARD_PIN,
      payload: changeCardPINCmd,
    })
      .next()
      .select(selectAuth)
      .next(mockToken)
      .call([authApi, authApi.refresh], mockToken.refreshToken)
      .next(mockToken)
      .put(refreshSuccess({ auth: mockToken }))
      .next({ auth: mockToken })
      .select(selectCard)
      .next(card)
      .call([api, api.changeCardPIN], card, changeCardPINCmd) // <- Utilisez cette syntaxe pour spécifier le contexte.
      .next(card)
      .put(cardPINChanged(card))
      .next()
      .call(navigate, { route: ICardStackPages.CARD })
      .next();
  });

  it('Should call navigate to Login modale if 401 from Server', () => {
    testSaga(changeCardPINGenerator, httpConnection, {
      type: ICardTypes.FETCH_CHANGE_CARD_PIN,
      payload: changeCardPINCmd,
    })
      .next()
      .select(selectAuth)
      .next(mockToken)
      .call([authApi, authApi.refresh], mockToken.refreshToken)
      .throw(new ServerError(mockError401))
      .call(navigate, { route: IAuthStackPages.LOGIN })
      .next()
      .cancel();
  });

  it('Should call cardForbidden action if 403 from Server', () => {
    testSaga(changeCardPINGenerator, httpConnection, {
      type: ICardTypes.FETCH_CHANGE_CARD_LIMITS,
      payload: changeCardPINCmd,
    })
      .next()
      .select(selectAuth)
      .next(mockToken)
      .call([authApi, authApi.refresh], mockToken.refreshToken)
      .next(mockToken)
      .put(refreshSuccess({ auth: mockToken }))
      .next({ auth: mockToken })
      .select(selectCard)
      .next(card)
      .call([api, api.changeCardPIN], card, changeCardPINCmd)
      .throw(new ServerError(mockError403))
      .put(cardForbidden(new CardError.MaxNumberOfPinChangesReached()))
      .next();
  });

  it('Should call showUnknownError action if 500 from Server', () => {
    testSaga(changeCardPINGenerator, httpConnection, {
      type: ICardTypes.FETCH_CHANGE_CARD_LIMITS,
      payload: changeCardPINCmd,
    })
      .next()
      .select(selectAuth)
      .next(mockToken)
      .call([authApi, authApi.refresh], mockToken.refreshToken)
      .next(mockToken)
      .put(refreshSuccess({ auth: mockToken }))
      .next({ auth: mockToken })
      .select(selectCard)
      .next(card)
      .call([api, api.changeCardPIN], card, changeCardPINCmd)
      .throw(new ServerError(mockError500))
      .put(initCard())
      .next()
      .put(showUnknownError(new ServerError(mockError500)))
      .next();
  });

  it('Should call showUnknownError action if unknown error', () => {
    testSaga(changeCardPINGenerator, httpConnection, {
      type: ICardTypes.FETCH_CHANGE_CARD_PIN,
      payload: changeCardPINCmd,
    })
      .next()
      .select(selectAuth)
      .next(mockToken)
      .call([authApi, authApi.refresh], mockToken.refreshToken)
      .next(mockToken)
      .put(refreshSuccess({ auth: mockToken }))
      .next({ auth: mockToken })
      .select(selectCard)
      .next(card)
      .call([api, api.changeCardPIN], card, changeCardPINCmd)
      .throw(new Error('unknown error'))
      .put(initCard())
      .next()
      .put(showUnknownError(new Error('unknown error')))
      .next();
  });
});
