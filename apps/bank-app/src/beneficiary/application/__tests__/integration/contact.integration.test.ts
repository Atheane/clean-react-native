/* eslint-disable  @typescript-eslint/no-explicit-any */
import SagaTester from 'redux-saga-tester';
import Constants from 'expo-constants';
//
import { ContactError } from '@clean-rn/contact/domain';

import {
  IContactTypes,
  listContacts,
  addContact,
  initContact,
  contactsListed,
  contactAdded,
  contactAddedFailed,
} from '../../commands/contact';
import { IContactState, contactReducer } from '../../state-management';

describe('Contact - integration', () => {
  let sagaTester: SagaTester;

  const mockContacts = [
    {
      name: 'John Doe',
      phone: '+33607080910',
    },
    {
      name: 'Jane Doe',
      phone: '+33607080911',
    },
  ];

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
    const initialState: IContactState = {
      pending: false,
      contacts: null,
      error: null,
    };
    sagaTester = new SagaTester({
      initialState,
      reducers: contactReducer,
    });
  });

  it('Should store correct initial state if not initial state is provided', () => {
    const newState = contactReducer(undefined, {
      type: IContactTypes.LIST_CONTACTS,
    });

    expect(newState).toEqual({
      pending: true,
      contacts: null,
      error: null,
    });
  });

  it('Should store correct state if CONTACTS_LISTED', () => {
    sagaTester.dispatch(listContacts());
    sagaTester.dispatch(contactsListed(mockContacts));

    expect(sagaTester.getState()).toEqual({
      pending: false,
      contacts: mockContacts,
      error: null,
    });
  });

  it('Should store correct state if INIT_CONTACT', () => {
    sagaTester.dispatch(listContacts());
    sagaTester.dispatch(contactsListed(mockContacts));
    sagaTester.dispatch(initContact());

    expect(sagaTester.getState()).toEqual({
      pending: false,
      contacts: null,
      error: null,
    });
  });

  it('Should store correct state if CONTACT_ADDED', () => {
    const mockRequest = {
      firstname: 'John',
      lastname: 'Doe',
      phone: '0607080910',
      countryCode: 'FR',
    };

    const mockResponse = {
      name: 'John Doe',
      phone: '+33607080910',
    };

    sagaTester.dispatch(addContact(mockRequest));
    sagaTester.dispatch(contactAdded(mockResponse));

    expect(sagaTester.getState()).toEqual({
      pending: false,
      contacts: [mockResponse],
      error: null,
    });
  });

  it('Should store correct state if CONTACT_ADDED_FAILED', () => {
    const mockRequest = {
      firstname: 'John',
      lastname: 'Doe',
      phone: '0607080910',
      countryCode: 'FR',
    };

    sagaTester.dispatch(addContact(mockRequest));
    sagaTester.dispatch(contactAddedFailed(new ContactError.ContactAlreadyExists()));

    expect(sagaTester.getState()).toEqual({
      pending: false,
      contacts: null,
      error: new ContactError.ContactAlreadyExists(),
    });
  });
});
