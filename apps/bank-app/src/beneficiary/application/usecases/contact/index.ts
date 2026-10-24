/* eslint-disable @typescript-eslint/no-explicit-any */
import { call, put, StrictEffect, takeEvery, select, cancel } from 'redux-saga/effects';

import { IContact, IAddContactCommand, ContactError } from '@clean-rn/contact/domain';

import { ExpoContact } from '@clean-rn/contact/infrastructure';

import {
  contactsListed,
  IContactTypes,
  contactAdded,
  contactAddedFailed,
  resetError,
} from '../../commands/contact';
import { IBeneficiaryStackPages } from '../../../../shared/presentation/types';
import { navigate } from '../../../../shared/presentation/navigation/navigationRef';
import { showUnknownError } from '../../../../shared/application/commands/manage-global-errors';
import { selectContact } from '../../state-management/selectors';

export function* addContactSaga(): Generator<StrictEffect, any, any> {
  yield takeEvery(IContactTypes.ADD_CONTACT, addContactGenerator);
}

export function* listContactSaga(): Generator<StrictEffect, any, any> {
  yield takeEvery(IContactTypes.LIST_CONTACTS, listContactGenerator);
}

export function* addContactGenerator({
  payload,
}: {
  type: string;
  payload: IAddContactCommand;
}): Generator<StrictEffect, any, any> {
  try {
    // api call - add contact
    const api = ExpoContact.getInstance();
    const contact = yield call([api, api.addContact], payload);

    yield put(contactAdded(contact));

    const params = {
      phoneNumber: contact.phone.valueInternational,
      beneficiaryName: contact.name,
    };
    yield call(navigate, { route: IBeneficiaryStackPages.TRANSFER, params });
    // nav back to contact list
  } catch (error: unknown) {
    yield put(resetError());
    if (error instanceof ContactError.ContactAlreadyExists) {
      yield put(contactAddedFailed(error));
      yield cancel();
    }
    yield put(showUnknownError(error as Error));
  }
}

export function* listContactGenerator(): Generator<StrictEffect, any, any> {
  try {
    const { contacts: contactsFromStore } = yield select(selectContact);
    if (contactsFromStore) {
      yield put(contactsListed(contactsFromStore));
    } else {
      const api = ExpoContact.getInstance();
      const contacts: IContact[] = yield call([api, api.getContacts]);
      yield put(contactsListed(contacts));
    }
  } catch (error: unknown) {
    // once app is well tested, delete this part and let onError hook manage unexpected errors
    yield put(resetError());
    yield put(showUnknownError(error as Error));
  }
}
