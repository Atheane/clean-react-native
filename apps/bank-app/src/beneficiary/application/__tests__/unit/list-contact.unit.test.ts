/* eslint-disable  @typescript-eslint/no-explicit-any */
import { takeEvery } from 'redux-saga/effects';
import { testSaga } from 'redux-saga-test-plan';

import { showUnknownError } from '../../../../shared/application/commands/manage-global-errors';

import { listContactGenerator, listContactSaga } from '../../usecases/contact';
import { IContactTypes, contactsListed, initContact } from '../../commands/contact';
import { ExpoContact } from '@clean-rn/contact/infrastructure';
import { selectContact } from '../../state-management';

describe('ListContact - usecase', () => {
  const api = ExpoContact.getInstance();

  const mockResponse = [
    {
      name: 'John Doe',
      phone: '+33607080910',
    },
    {
      name: 'Jane Doe',
      phone: '+33607080911',
    },
  ];

  const genObject = listContactSaga();

  it('Should wait for LIST_CONTACT action and call listAccountsGenerator, should be done on next iteration', () => {
    expect(genObject.next().value).toEqual(takeEvery(IContactTypes.LIST_CONTACTS, listContactGenerator));
    expect(genObject.next().done).toBeTruthy();
  });

  it('Should call contactListed if data not cached', async () => {
    testSaga(listContactGenerator)
      .next()
      .select(selectContact)
      .next({ contacts: null })
      .call([api, api.getContacts])
      .next(mockResponse)
      .put(contactsListed(mockResponse))
      .next();
  });

  it('Should call contactListed if data cached', async () => {
    testSaga(listContactGenerator)
      .next()
      .select(selectContact)
      .next({ contacts: mockResponse })
      .put(contactsListed(mockResponse))
      .next();
  });

  it('Should call showUnknownError action if unknown error', () => {
    testSaga(listContactGenerator)
      .next()
      .select(selectContact)
      .next({ contacts: null })
      .call([api, api.getContacts])
      .throw(new Error('unknown error'))
      .put(initContact())
      .next()
      .put(showUnknownError(new Error('unknown error')))
      .next();
  });
});
