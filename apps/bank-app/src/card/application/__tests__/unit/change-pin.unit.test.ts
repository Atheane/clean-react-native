/* eslint-disable  @typescript-eslint/no-explicit-any */
import { takeEvery } from 'redux-saga/effects';
import { testSaga } from 'redux-saga-test-plan';

import { HttpConnection, ServerError } from '@clean-rn/shared/infrastructure';
import { Card, CardError, CardPinCode, ICardStatuses, IChangeCardPINCommand } from '@clean-rn/card/domain';
import { CardApi } from '@clean-rn/card/infrastructure';

import { showUnknownError } from '../../../../shared/application/commands/manage-global-errors';
import { ICardStackPages } from '../../../../shared/presentation/types';
import { navigate } from '../../../../shared/presentation/navigation/navigationRef';

import { changeCardPINGenerator, changeCardPINSaga } from '../../usecases';
import { ICardTypes, cardPINChanged, cardPINChangedFailed, resetError } from '../../commands';
import { selectCard } from '../../state-management/selectors';
import { ensureTokenRefreshed } from '../../../../shared/application/usecases/ensureTokenRefreshed';

jest.mock('@clean-rn/shared/infrastructure', () => ({
  HttpConnection: {
    getInstance: jest.fn(),
  },
  ServerError: jest.fn().mockImplementation(function (error) {
    this.message = error.message;
    this.name = 'ServerError';
    this.statusCode = error.statusCode;
    this.codeError = error.codeError;
    this.cause = error.response;
  }),
}));

describe('ChangePIN - usecase', () => {
  let httpConnection: HttpConnection;
  let api: CardApi;

  beforeEach(() => {
    httpConnection = {
      baseUrl: 'http://mock-api.com',
      options: jest.fn(),
      handleError: jest.fn(),
      getDefaultHeaders: jest.fn(),
      attachBearerToken: jest.fn(),
    };
    HttpConnection.getInstance.mockReturnValue(httpConnection);
    global.fetch = jest.fn();
    api = CardApi.getInstance(httpConnection);
  });

  afterEach(() => {
    jest.resetAllMocks();
    jest.clearAllMocks();
  });

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

  it('Should wait for FETCH_CHANGE_CARD_PIN action and call changeCardPINGenerator, should be done on next iteration', () => {
    const genObject = changeCardPINSaga(httpConnection);

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
      .call(ensureTokenRefreshed, httpConnection)
      .next()
      .select(selectCard)
      .next(card)
      .call([api, api.changeCardPIN], card, changeCardPINCmd) // <- Utilisez cette syntaxe pour spécifier le contexte.
      .next(card)
      .put(cardPINChanged(card))
      .next()
      .call(navigate, { route: ICardStackPages.CHANGE_PIN_SUCCESS })
      .next();
  });

  it('Should call cardForbidden action if 403 from Server', () => {
    const serverError = new ServerError(mockError403);
    serverError.statusCode = 403;

    testSaga(changeCardPINGenerator, httpConnection, {
      type: ICardTypes.FETCH_CHANGE_CARD_LIMITS,
      payload: changeCardPINCmd,
    })
      .next()
      .call(ensureTokenRefreshed, httpConnection)
      .next()
      .select(selectCard)
      .next(card)
      .call([api, api.changeCardPIN], card, changeCardPINCmd)
      .throw(serverError)
      .put(resetError())
      .next()
      .put(cardPINChangedFailed(new CardError.MaxNumberOfPinChangesReached(serverError)))
      .next();
  });

  it('Should call showUnknownError action if 500 from Server', () => {
    testSaga(changeCardPINGenerator, httpConnection, {
      type: ICardTypes.FETCH_CHANGE_CARD_LIMITS,
      payload: changeCardPINCmd,
    })
      .next()
      .call(ensureTokenRefreshed, httpConnection)
      .next()
      .select(selectCard)
      .next(card)
      .call([api, api.changeCardPIN], card, changeCardPINCmd)
      .throw(new ServerError(mockError500))
      .put(resetError())
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
      .call(ensureTokenRefreshed, httpConnection)
      .next()
      .select(selectCard)
      .next(card)
      .call([api, api.changeCardPIN], card, changeCardPINCmd)
      .throw(new Error('unknown error'))
      .put(resetError())
      .next()
      .put(showUnknownError(new Error('unknown error')))
      .next();
  });
});
