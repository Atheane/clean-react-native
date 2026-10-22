/* eslint-disable  @typescript-eslint/no-explicit-any */
import { takeEvery } from 'redux-saga/effects';
import { testSaga } from 'redux-saga-test-plan';

import { ExpoContact } from '@clean-rn/contact/infrastructure';
import { ContactError } from '@clean-rn/contact/domain';

import { showUnknownError } from '../../../../shared/application/commands/manage-global-errors';

import { addContactGenerator, addContactSaga } from '../../usecases/contact';
import { IContactTypes, contactAdded, contactAddedFailed, initContact } from '../../commands/contact';
import { navigate } from '../../../../shared/presentation/navigation/navigationRef';
import { IBeneficiaryStackPages } from '../../../../shared/presentation/types';

describe('AddContact - usecase', () => {
  const api = ExpoContact.getInstance();

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

  const genObject = addContactSaga();

  it('Should wait for ADD_CONTACT action and call listAccountsGenerator, should be done on next iteration', () => {
    expect(genObject.next().value).toEqual(takeEvery(IContactTypes.ADD_CONTACT, addContactGenerator));
    expect(genObject.next().done).toBeTruthy();
  });

  it('Should call contactAdded', async () => {
    testSaga(addContactGenerator, {
      type: IContactTypes.ADD_CONTACT,
      payload: mockRequest,
    })
      .next()
      .call([api, api.addContact], mockRequest) // <- Utilisez cette syntaxe pour spécifier le contexte.
      .next(mockResponse)
      .put(contactAdded(mockResponse))
      .next()
      .call(navigate, { route: IBeneficiaryStackPages.BENEFICIARY_LIST, params: { idx: 1 } });
  });

  it('Should call contactAddedFailed if contact already exists', () => {
    testSaga(addContactGenerator, {
      type: IContactTypes.ADD_CONTACT,
      payload: mockRequest,
    })
      .next()
      .call([api, api.addContact], mockRequest) // <- Utilisez cette syntaxe pour spécifier le contexte.
      .throw(new ContactError.ContactAlreadyExists())
      .put(contactAddedFailed(new ContactError.ContactAlreadyExists()))
      .next()
      .cancel();
  });

  it('Should call showUnknownError action if unknown error', () => {
    testSaga(addContactGenerator, {
      type: IContactTypes.ADD_CONTACT,
      payload: mockRequest,
    })
      .next()
      .call([api, api.addContact], mockRequest) // <- Utilisez cette syntaxe pour spécifier le contexte.
      .throw(new Error('unknown error'))
      .put(initContact())
      .next()
      .put(showUnknownError(new Error('unknown error')))
      .next();
  });
});
