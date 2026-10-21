/* eslint-disable  @typescript-eslint/no-explicit-any */
import SagaTester from 'redux-saga-tester';
import Constants from 'expo-constants';

import { IEventCardsTypes, deleteEventCard } from '../../commands/event-cards';
import { IEventCardsState, eventCardsReducer } from '../../state-management';

const expoConstantsMock = {
  name: 'CleanRN BankApp Test',
  slug: 'clean-rn-bank-app-test',
  extra: {
    BASE_URL_API: 'https://fake-api.com',
    NODE_ENV: 'test',
  },
};
jest.mock('expo-constants', () => expoConstantsMock);

describe('DeleteEventCard - integration', () => {
  let sagaTester: SagaTester;

  beforeAll(() => {
    Constants.expoConfig = {
      name: 'CleanRN BankApp Test',
      slug: 'clean-rn-bank-app-test',
      extra: {
        BASE_URL_API: 'https://fake-api.com',
        NODE_ENV: 'test',
      },
    };
  });

  beforeEach(() => {
    const initialState: IEventCardsState = {
      uid: null,
      deletedCards: [],
    };
    sagaTester = new SagaTester({
      initialState,
      reducers: eventCardsReducer,
    });
  });

  it('Should store correct initial state if not initial state is provided', () => {
    const newState = eventCardsReducer(undefined, {
      type: IEventCardsTypes.DELETE_EVENT_CARD,
      payload: {
        uid: 'test1',
      },
    });

    expect(newState).toEqual({
      uid: 'test1',
      deletedCards: ['test1'],
    });
  });

  it('Should store correct state if DELETE_EVENT_CARD', () => {
    sagaTester.dispatch(deleteEventCard({ uid: 'test1' }));
    sagaTester.dispatch(deleteEventCard({ uid: 'test2' }));

    expect(sagaTester.getState()).toEqual({
      uid: 'test2',
      deletedCards: ['test1', 'test2'],
    });
  });
});
