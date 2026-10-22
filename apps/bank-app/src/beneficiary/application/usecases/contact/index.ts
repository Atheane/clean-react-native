/* eslint-disable @typescript-eslint/no-explicit-any */
import { call, put, StrictEffect, takeEvery, select, cancel } from 'redux-saga/effects';

import { IContact, IAddContactCommand, ContactError } from '@clean-rn/contact/domain';

import { ServerError } from '@clean-rn/shared/infrastructure';
import { ExpoContact } from '@clean-rn/contact/infrastructure';

import {
  contactListed,
  IContactTypes,
  initContact,
  contactAdded,
  contactAddedFailed,
} from '../../commands/contact';
import { IAuthStackPages, IBeneficiaryStackPages } from '../../../../shared/presentation/types';
import { navigate } from '../../../../shared/presentation/navigation/navigationRef';
import { showUnknownError } from '../../../../shared/application/commands/manage-global-errors';
import { selectContact } from '../../state-management/selectors';

const sortByName = (beneficiaries: IContact[]) => {
  beneficiaries.sort((a: IContact, b: IContact) => {
    const nameA = a.name.toLowerCase(); // ignore upper and lowercase
    const nameB = b.name.toLowerCase(); // ignore upper and lowercase
    if (nameA < nameB) return -1;
    if (nameA > nameB) return 1;
    return 0;
  });
};

export function* addContactSaga(): Generator<StrictEffect, any, any> {
  yield takeEvery(IContactTypes.ADD_CONTACT, addContactGenerator);
}

export function* listContactSaga(): Generator<StrictEffect, any, any> {
  yield takeEvery(IContactTypes.LIST_CONTACT, listContactGenerator);
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

    // nav back to contact list
    yield call(navigate, { route: IBeneficiaryStackPages.BENEFICIARY_LIST, params: { idx: 1 } });
  } catch (error: unknown) {
    if (error instanceof ContactError.ContactAlreadyExists) {
      yield put(contactAddedFailed(error));
      yield cancel();
    }
    yield put(initContact());
    yield put(showUnknownError(error as Error));
  }
}

export function* listContactGenerator(): Generator<StrictEffect, any, any> {
  try {
    const { contacts: contactsFromStore } = yield select(selectContact);
    if (contactsFromStore) {
      yield put(contactListed(contactsFromStore));
      yield call(navigate, { route: IBeneficiaryStackPages.BENEFICIARY_LIST, params: { idx: 1 } });
    } else {
      const api = ExpoContact.getInstance();
      const contacts: IContact[] = yield call([api, api.getContacts]);
      sortByName(contacts);
      yield put(contactListed(contacts));
      yield call(navigate, { route: IBeneficiaryStackPages.BENEFICIARY_LIST, params: { idx: 1 } });
    }
  } catch (error: unknown) {
    // https://redux-saga.js.org/docs/basics/ErrorHandling/ expected error must be managed at the saga level
    if (error instanceof ServerError && error.statusCode === 401) {
      yield call(navigate, { route: IAuthStackPages.LOGIN });
      yield cancel();
    }
    // once app is well tested, delete this part and let onError hook manage unexpected errors
    yield put(initContact());
    yield put(showUnknownError(error as Error));
  }
}
