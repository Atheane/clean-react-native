/* eslint-disable  @typescript-eslint/no-explicit-any */
import SagaTester from 'redux-saga-tester';
//
import { HttpConnection } from '@clean-rn/shared/infrastructure';

import {
  ICardTypes,
  fetchChangeCardLimits,
  cardLimitsChanged,
  initCard,
  cardGetSuccess,
  cardNotFound,
  cardForbidden,
  fetchToggleLock,
  cardLockToggled,
  fetchChangePIN,
  cardPINChanged,
  cardPINChangedFailed,
  resetError,
} from '../../commands';
import { ICardState, cardReducer } from '../../state-management';

import { changeCardLimitsSaga, changeCardPINSaga, toggleCardLockSaga } from '../../usecases';
import {
  Card,
  CardError,
  CardPinCode,
  ICardStatuses,
  IChangeCardLimitsCommand,
  IChangeCardPINCommand,
  IToggleCardLockCommand,
} from '@clean-rn/card/domain';

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

describe('Card - integration', () => {
  let sagaTester: SagaTester;
  let httpConnection: HttpConnection;

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

  let card: Card;

  beforeEach(() => {
    const initialState: ICardState = {
      pending: false,
      card: null,
      error: null,
    };
    sagaTester = new SagaTester({
      initialState,
      reducers: cardReducer,
    });
    card = Card.Create({
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
    httpConnection = {
      baseUrl: 'http://mock-api.com',
      options: jest.fn(),
      handleError: jest.fn(),
      getDefaultHeaders: jest.fn(),
      attachBearerToken: jest.fn(),
    };
    HttpConnection.getInstance.mockReturnValue(httpConnection);
    global.fetch = jest.fn();
  });

  afterEach(() => {
    jest.resetAllMocks();
    jest.clearAllMocks();
  });

  it('Should store correct initial state if FETCH_CHANGE_CARD_LIMITS', () => {
    const changeCardLimitsCmd: IChangeCardLimitsCommand = {
      limits: {
        month: 8000,
        week: 500,
        day: 200,
      },
    };

    const newState = cardReducer(undefined, {
      type: ICardTypes.FETCH_CHANGE_CARD_LIMITS,
      payload: changeCardLimitsCmd,
    });

    expect(newState).toEqual({
      pending: true,
      card: null,
      error: null,
    });
  });

  it('Should store correct initial state if FETCH_TOGGLE_LOCK', () => {
    const isLocked: IToggleCardLockCommand = {
      lock: true,
    };

    const newState = cardReducer(undefined, {
      type: ICardTypes.FETCH_TOGGLE_LOCK,
      payload: isLocked,
    });

    expect(newState).toEqual({
      pending: true,
      card: null,
      error: null,
    });
  });

  it('Should store correct initial state if FETCH_CHANGE_CARD_PIN', () => {
    const pin: IChangeCardPINCommand = {
      pin: new CardPinCode('1234'),
    };

    const newState = cardReducer(undefined, {
      type: ICardTypes.FETCH_CHANGE_CARD_PIN,
      payload: pin,
    });

    expect(newState).toEqual({
      pending: true,
      card: null,
      error: null,
    });
  });

  it('Should store correct state if CARD_GET_SUCCESS', () => {
    sagaTester.start(changeCardLimitsSaga, httpConnection);
    sagaTester.dispatch(cardGetSuccess(card));

    expect(sagaTester.getState()).toEqual({
      pending: false,
      card,
      error: null,
    });
  });

  it('Should store correct state if CARD_NOT_FOUND', () => {
    sagaTester.start(changeCardLimitsSaga, httpConnection);
    sagaTester.dispatch(cardNotFound(new CardError.NotFound()));

    expect(sagaTester.getState()).toEqual({
      pending: false,
      card: null,
      error: new CardError.NotFound(),
    });
  });

  it('Should store correct state if CARD_FORBIDDEN', () => {
    sagaTester.start(changeCardLimitsSaga, httpConnection);
    sagaTester.dispatch(cardForbidden(new CardError.Forbidden()));

    expect(sagaTester.getState()).toEqual({
      pending: false,
      card: null,
      error: new CardError.Forbidden(),
    });
  });

  it('Should store correct state if CARD_PIN_CHANGED_FAILED', () => {
    sagaTester.start(changeCardPINSaga, httpConnection);
    sagaTester.dispatch(fetchChangePIN({ pin: new CardPinCode('1234') }));
    sagaTester.dispatch(cardPINChangedFailed(new CardError.MaxNumberOfPinChangesReached()));

    expect(sagaTester.getState()).toEqual({
      pending: false,
      card: null,
      error: new CardError.MaxNumberOfPinChangesReached(),
    });
  });

  it('Should store correct state if CARD_LIMITS_CHANGED', () => {
    const changeCardLimitsCmd: IChangeCardLimitsCommand = {
      limits: {
        month: 8000,
        week: 500,
        day: 200,
      },
    };

    sagaTester.start(changeCardLimitsSaga, httpConnection);
    sagaTester.dispatch(fetchChangeCardLimits(changeCardLimitsCmd));
    card.changeCardLimits(changeCardLimitsCmd.limits);
    sagaTester.dispatch(cardLimitsChanged(card));

    expect(sagaTester.getState()).toEqual({
      pending: false,
      card,
      error: null,
    });
  });

  it('Should store correct state if CARD_LOCK_TOGGLED', () => {
    sagaTester.start(toggleCardLockSaga, httpConnection);
    sagaTester.dispatch(fetchToggleLock({ lock: true }));
    card.updateStatus(ICardStatuses.LOCK);
    sagaTester.dispatch(cardLockToggled(card));
    expect(sagaTester.getState()).toEqual({
      pending: false,
      card,
      error: null,
    });
  });

  it('Should store correct state if CARD_PIN_CHANGED', () => {
    sagaTester.start(changeCardPINSaga, httpConnection);
    sagaTester.dispatch(fetchChangePIN({ pin: new CardPinCode('1234') }));
    card.updatePin('1234', 1);
    sagaTester.dispatch(cardPINChanged(card));
    expect(sagaTester.getState()).toEqual({
      pending: false,
      card,
      error: null,
    });
  });

  it('Should store correct state if INIT_CARD', () => {
    const changeCardLimitsCmd: IChangeCardLimitsCommand = {
      limits: {
        month: 8000,
        week: 500,
        day: 200,
      },
    };
    sagaTester.start(changeCardLimitsSaga, httpConnection);
    sagaTester.dispatch(fetchChangeCardLimits(changeCardLimitsCmd));
    card.changeCardLimits(changeCardLimitsCmd.limits);
    sagaTester.dispatch(cardLimitsChanged(card));
    sagaTester.dispatch(initCard());

    expect(sagaTester.getState()).toEqual({
      pending: false,
      card: null,
      error: null,
    });
  });

  it('Should store correct state if RESET_ERROR', () => {
    const changeCardLimitsCmd: IChangeCardLimitsCommand = {
      limits: {
        month: 8000,
        week: 500,
        day: 200,
      },
    };
    sagaTester.start(changeCardLimitsSaga, httpConnection);
    sagaTester.dispatch(fetchChangeCardLimits(changeCardLimitsCmd));
    card.changeCardLimits(changeCardLimitsCmd.limits);
    sagaTester.dispatch(cardLimitsChanged(card));
    sagaTester.dispatch(resetError());

    expect(sagaTester.getState()).toEqual({
      pending: false,
      card,
      error: null,
    });
  });
});
