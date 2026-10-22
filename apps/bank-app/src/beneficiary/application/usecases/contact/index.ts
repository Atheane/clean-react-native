/* eslint-disable @typescript-eslint/no-explicit-any */
import { call, put, StrictEffect, takeEvery, select, cancel } from 'redux-saga/effects';

import { ContactError, IContact, IContactAddCommand } from '@clean-rn/contact/domain';

import { ServerError } from '@clean-rn/shared/infrastructure';
import { ExpoContact } from '@clean-rn/contact/infrastructure';

import {
  contactListed,
  IContactTypes,
  contactListInit,
  contactAdd,
  contactAddFailure,
} from '../../commands/contact';
import { IAuthStackPages, IHomeStackPages } from '../../../../shared/presentation/types';
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
  yield takeEvery(IContactTypes.CONTACT_ADD, addContactGenerator);
}

export function* listContactSaga(): Generator<StrictEffect, any, any> {
  yield takeEvery(IContactTypes.CONTACT_LIST, listContactGenerator);
}

export function* addContactGenerator({
  payload,
}: {
  type: string;
  payload: IContactAddCommand;
}): Generator<StrictEffect, any, any> {
  try {
    // api call - add contact
    const api = ExpoContact.getInstance();
    const contact = yield call([api, api.addContact], payload);

    // update store
    const { contacts: contactsFromStore } = yield select(selectContact);
    if (contactsFromStore) {
      contactsFromStore.push(contact);
      // Sort
      // TODO do binary insertion to optimize
      sortByName(contactsFromStore);
      yield put(contactListed(contactsFromStore));
    } else {
      yield put(contactListed([contact]));
    }

    // nav back to contact list
    yield call(navigate, { route: IHomeStackPages.BENEFICIARY_LIST });
  } catch (error: unknown) {
    // https://redux-saga.js.org/docs/basics/ErrorHandling/ expected error must be managed at the saga level
    if (error instanceof ServerError && error.statusCode === 401) {
      yield call(navigate, { route: IAuthStackPages.LOGIN });
      yield cancel();
    }
    // once app is well tested, delete this part and let onError hook manage unexpected errors
    yield put(contactAdd(payload));
    yield put(showUnknownError(error as Error));
  }
}

export function* listContactGenerator(): Generator<StrictEffect, any, any> {
  try {
    const { contacts: contactsFromStore } = yield select(selectContact);
    if (contactsFromStore) {
      yield put(contactListed(contactsFromStore));
      yield call(navigate, { route: IHomeStackPages.BENEFICIARY_LIST });
    } else {
      const api = ExpoContact.getInstance();
      const contacts: IContact[] = yield call([api, api.getContact]);
      sortByName(contacts);
      yield put(contactListed(contacts));
      yield call(navigate, { route: IHomeStackPages.BENEFICIARY_LIST });
    }
  } catch (error: unknown) {
    // https://redux-saga.js.org/docs/basics/ErrorHandling/ expected error must be managed at the saga level
    if (error instanceof ServerError && error.statusCode === 401) {
      yield call(navigate, { route: IAuthStackPages.LOGIN });
      yield cancel();
    }
    // once app is well tested, delete this part and let onError hook manage unexpected errors
    yield put(contactListInit());
    yield put(showUnknownError(error as Error));
  }
}
