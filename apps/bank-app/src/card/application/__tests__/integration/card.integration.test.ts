/* eslint-disable  @typescript-eslint/no-explicit-any */
import SagaTester from 'redux-saga-tester';
import Constants from 'expo-constants';
//
import { HttpConnection, wrapSagaHidingNotFoundError } from '@clean-rn/shared/infrastructure';

import {
  ICardTypes,
  fetchChangeCardLimits,
  cardLimitsChanged,
  initCard,
  fetchGetCard,
  cardGetSuccess,
} from '../../commands';
import { ICardState, cardReducer } from '../../state-management';

import { changeCardLimitsSaga } from '../../usecases';
import { Card, ICardStatuses, IChangeCardLimitsCommand } from '@clean-rn/card/domain';

const expoConstantsMock = {
  name: 'CleanRN BankApp Test',
  slug: 'clean-rn-bank-app-test',
  extra: {
    BASE_URL_API: 'https://fake-api.com',
    NODE_ENV: 'test',
  },
};
jest.mock('expo-constants', () => expoConstantsMock);

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

  beforeAll(() => {
    Constants.expoConfig = {
      name: 'CleanRN BankApp Test',
      slug: 'clean-rn-bank-app-test',
      extra: {
        BASE_URL_API: 'https://fake-api.com',
        NODE_ENV: 'test',
      },
    };
    httpConnection = HttpConnection.getInstance(Constants.expoConfig?.extra?.BASE_URL_API);
  });

  beforeEach(() => {
    const initialState: ICardState = {
      pending: false,
      card: null,
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
  });

  it('Should store correct initial state if FETCH_GET_CARD', () => {
    const newState = cardReducer(undefined, {
      type: ICardTypes.FETCH_GET_CARD,
    });

    expect(newState).toEqual({
      pending: true,
      card: null,
    });
  });

  it('Should store correct initial state if FETCH_CHANGE_CARD_LIMITS', () => {
    const changeCardLimitsCmd: IChangeCardLimitsCommand = {
      limits: {
        month: 8000,
        week: 500,
        day: 200,
      },
      card,
    };

    const newState = cardReducer(undefined, {
      type: ICardTypes.FETCH_CHANGE_CARD_LIMITS,
      payload: changeCardLimitsCmd,
    });

    expect(newState).toEqual({
      pending: true,
      card: null,
    });
  });

  it('Should store correct state if CARD_GET_SUCCESS', () => {
    sagaTester.start(wrapSagaHidingNotFoundError, changeCardLimitsSaga, httpConnection);
    sagaTester.dispatch(fetchGetCard());
    sagaTester.dispatch(cardGetSuccess(card));

    expect(sagaTester.getState()).toEqual({
      pending: false,
      card,
    });
  });

  it('Should store correct state if CARD_LIMITS_CHANGED', () => {
    const changeCardLimitsCmd: IChangeCardLimitsCommand = {
      limits: {
        month: 8000,
        week: 500,
        day: 200,
      },
      card,
    };

    sagaTester.start(wrapSagaHidingNotFoundError, changeCardLimitsSaga, httpConnection);
    sagaTester.dispatch(fetchChangeCardLimits(changeCardLimitsCmd));
    card.changeCardLimits(changeCardLimitsCmd.limits);
    sagaTester.dispatch(cardLimitsChanged(card));

    expect(sagaTester.getState()).toEqual({
      pending: false,
      card,
    });
  });

  it('Should store correct state if INIT_CARD', () => {
    const changeCardLimitsCmd: IChangeCardLimitsCommand = {
      limits: {
        month: 8000,
        week: 500,
        day: 200,
      },
      card,
    };
    sagaTester.start(wrapSagaHidingNotFoundError, changeCardLimitsSaga, httpConnection);
    sagaTester.dispatch(fetchChangeCardLimits(changeCardLimitsCmd));
    card.changeCardLimits(changeCardLimitsCmd.limits);
    sagaTester.dispatch(cardLimitsChanged(card));
    sagaTester.dispatch(initCard());

    expect(sagaTester.getState()).toEqual({
      pending: false,
      card: null,
    });
  });
});
