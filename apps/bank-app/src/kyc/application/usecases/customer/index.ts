/* eslint-disable @typescript-eslint/no-explicit-any */
import { call, put, StrictEffect, takeEvery, cancel, select } from 'redux-saga/effects';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { HttpConnection, ServerError } from '@clean-rn/shared/infrastructure';
import { Customer, IDocumentProperties } from '@clean-rn/kyc/domain';
import { KycApi } from '@clean-rn/kyc/infrastructure';

import { IAuthStackPages } from '../../../../shared/presentation/types';
import { navigate } from '../../../../shared/presentation/navigation/navigationRef';
import { showUnknownError } from '../../../../shared/application/commands/manage-global-errors';
import { IStoreKey } from '../../../../shared/application/types';
import { selectUserFromLogin } from '../../state-management/selectors';

import { customerStatusChecked, initializeKyc, IKycTypes } from '../../commands/customer';

export function* checkCustomerStatusSaga(httpConnection: HttpConnection): Generator<StrictEffect, any, any> {
  yield takeEvery(IKycTypes.CHECK_CUSTOMER_STATUS, checkCustomerStatusGenerator, httpConnection);
}

export function* checkCustomerStatusGenerator(
  httpConnection: HttpConnection,
): Generator<StrictEffect, any, any> {
  try {
    //todo check customer status in async storage, if VALIDATED, do not call api to avoid one api call
    const user = yield select(selectUserFromLogin);
    const customerStatus = yield call(AsyncStorage.getItem, IStoreKey.CUSTOMER_STATUS);
    if (customerStatus && ['VALIDATED', 'CANCELED'].includes(customerStatus)) {
      const customer = Customer.Create({
        id: user.id,
        properties: { status: customerStatus, USPerson: user.properties.USPerson },
      });
      customer.checkCustomerStatus(); // should keep the status customerStatus
      yield put(customerStatusChecked({ customer }));
      yield cancel();
    }

    const api = KycApi.getInstance(httpConnection);
    const documents: IDocumentProperties[] = yield call([api, api.getDocuments]);

    const customer = Customer.Create({
      id: user.id,
      properties: { USPerson: user.properties.USPerson },
    });
    customer.checkDocumentsStatus(documents);
    customer.checkCustomerStatus();

    yield put(customerStatusChecked({ customer }));
    // customer.properties.status cannot be undefined, default value : 'PENDING' so ignore eslint warning
    yield call(AsyncStorage.setItem, IStoreKey.CUSTOMER_STATUS, customer.properties.status);
  } catch (error: unknown) {
    // https://redux-saga.js.org/docs/basics/ErrorHandling/ expected error must be managed at the saga level
    if (error instanceof ServerError && error.statusCode === 401) {
      yield call(navigate, { route: IAuthStackPages.LOGIN });
      yield cancel();
    }
    // once app is well tested, delete this part and let onError hook manage unexpected errors
    yield put(initializeKyc());
    yield put(showUnknownError(error as Error));
  }
}
