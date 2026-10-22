/* eslint-disable  @typescript-eslint/no-explicit-any */
import { takeEvery } from 'redux-saga/effects';
import { testSaga } from 'redux-saga-test-plan';
import Constants from 'expo-constants';

import { HttpConnection, ServerError } from '@clean-rn/shared/infrastructure';
import { AuthApi } from '@clean-rn/auth/infrastructure';
import { CardApi } from '@clean-rn/card/infrastructure';
import { Customer } from '@clean-rn/kyc/domain';
import { Card, CardError, ICardStatuses } from '@clean-rn/card/domain';

import { showUnknownError } from '../../../../shared/application/commands/manage-global-errors';
import { IAuthStackPages, ICardStackPages } from '../../../../shared/presentation/types';
import { navigate } from '../../../../shared/presentation/navigation/navigationRef';

import { getCardGenerator, getCardSaga } from '../../usecases';
import { ICardTypes, cardGetSuccess, cardNotFound, initCard } from '../../commands';
import { selectAuth } from '../../../../auth/application/state-management/selectors';
import { refreshSuccess } from '../../../../auth/application/commands';
import { selectCustomer } from '../../../../kyc/application/state-management/selectors';
import { KYC_REVIEW } from '@clean-rn/user/domain';

describe('GetCard - usecase', () => {
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
    path: '/app/card/999826250/limits',
    method: 'PUT',
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

  const genObject = getCardSaga(httpConnection);

  it('Should wait for FETCH_GET_CARD action and call getCardGenerator, should be done on next iteration', () => {
    expect(genObject.next().value).toEqual(
      takeEvery(ICardTypes.FETCH_GET_CARD, getCardGenerator, httpConnection),
    );
    expect(genObject.next().done).toBeTruthy();
  });

  it('Should call cardGetSuccess', async () => {
    testSaga(getCardGenerator, httpConnection)
      .next()
      .select(selectAuth)
      .next(mockToken)
      .call([authApi, authApi.refresh], mockToken.refreshToken)
      .next(mockToken)
      .put(refreshSuccess({ auth: mockToken }))
      .next({ auth: mockToken })
      .call([api, api.getCard])
      .next(card)
      .put(cardGetSuccess(card))
      .next()
      .call(navigate, { route: ICardStackPages.MENU })
      .next();
  });

  it('Should call cardNotFound and navigate to KYC_MISSING if kyc NOT validated', async () => {
    const customer = Customer.Create({
      id: 123,
      properties: { USPerson: false },
    });

    customer.checkDocumentsStatus([]);
    testSaga(getCardGenerator, httpConnection)
      .next()
      .select(selectAuth)
      .next(mockToken)
      .call([authApi, authApi.refresh], mockToken.refreshToken)
      .next(mockToken)
      .put(refreshSuccess({ auth: mockToken }))
      .next({ auth: mockToken })
      .call([api, api.getCard])
      .throw(new CardError.NotFound())
      .put(cardNotFound(new CardError.NotFound()))
      .next()
      .select(selectCustomer)
      .next({ customer })
      .call(navigate, {
        route: ICardStackPages.MENU,
        params: { screen: ICardStackPages.KYC_MISSING },
      })
      .next()
      .cancel();
  });

  it('Should call cardNotFound and navigate to KYC_MISSING if kyc VALIDATED', async () => {
    const customer = Customer.Create({
      id: 123,
      properties: { USPerson: false, status: KYC_REVIEW.VALIDATED },
    });

    customer.checkDocumentsStatus([]);
    testSaga(getCardGenerator, httpConnection)
      .next()
      .select(selectAuth)
      .next(mockToken)
      .call([authApi, authApi.refresh], mockToken.refreshToken)
      .next(mockToken)
      .put(refreshSuccess({ auth: mockToken }))
      .next({ auth: mockToken })
      .call([api, api.getCard])
      .throw(new CardError.NotFound())
      .put(cardNotFound(new CardError.NotFound()))
      .next()
      .select(selectCustomer)
      .next({ customer })
      .call(navigate, {
        route: ICardStackPages.MENU,
        params: { screen: ICardStackPages.WAITING_CARD },
      })
      .next()
      .cancel();
  });

  it('Should call navigate to Login modale if 401 from Server', () => {
    testSaga(getCardGenerator, httpConnection)
      .next()
      .select(selectAuth)
      .next(mockToken)
      .call([authApi, authApi.refresh], mockToken.refreshToken)
      .throw(new ServerError(mockError401))
      .call(navigate, { route: IAuthStackPages.LOGIN })
      .next()
      .cancel();
  });

  it('Should call showUnknownError action if 500 from Server', () => {
    testSaga(getCardGenerator, httpConnection)
      .next()
      .select(selectAuth)
      .next(mockToken)
      .call([authApi, authApi.refresh], mockToken.refreshToken)
      .next(mockToken)
      .put(refreshSuccess({ auth: mockToken }))
      .next({ auth: mockToken })
      .call([api, api.getCard])
      .throw(new ServerError(mockError500))
      .put(initCard())
      .next()
      .put(showUnknownError(new ServerError(mockError500)))
      .next();
  });

  it('Should call showUnknownError action if unknown error', () => {
    testSaga(getCardGenerator, httpConnection)
      .next()
      .select(selectAuth)
      .next(mockToken)
      .call([authApi, authApi.refresh], mockToken.refreshToken)
      .next(mockToken)
      .put(refreshSuccess({ auth: mockToken }))
      .next({ auth: mockToken })
      .call([api, api.getCard])
      .throw(new Error('unknown error'))
      .put(initCard())
      .next()
      .put(showUnknownError(new Error('unknown error')))
      .next();
  });
});
