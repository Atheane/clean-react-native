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

//export function* addContactSaga(): Generator<StrictEffect, any, any> {
//  yield takeEvery(IContactTypes.CONTACT_ADD, addContactGenerator, null);
//}

export function* listContactSaga(): Generator<StrictEffect, any, any> {
  console.log('LIST CONTACT SAGA');
  yield takeEvery(IContactTypes.CONTACT_LIST, listContactGenerator);
}

export function* listContactGenerator(): Generator<StrictEffect, any, any> {
  console.log('LIST CONTACT GENERATOR');
  try {
    const { contacts: contactsFromStore } = yield select(selectContact);
    if (contactsFromStore) {
      yield put(contactListed(contactsFromStore));
      yield call(navigate, { route: IHomeStackPages.BENEFICIARY_LIST });
    } else {
      console.log('LIST CONTACT GENERATOR - GET INSTANCE');
      const api = ExpoContact.getInstance();
      const contacts: IContact[] = yield call([api, api.getContact]);
      console.log('LIST CONTACT ', contacts);
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
