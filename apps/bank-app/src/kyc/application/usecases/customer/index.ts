/* eslint-disable @typescript-eslint/no-explicit-any */
import { call, put, StrictEffect, takeEvery, cancel } from 'redux-saga/effects';

import { HttpConnection, ServerError } from '@clean-rn/shared/infrastructure';
import { AccountApi } from '@clean-rn/account/infrastructure';

import { customerStatusChecked, initializeKyc, IKycTypes } from '../../commands/customer';
import { IAuthStackPages } from '../../../../shared/presentation/types';
import { navigate } from '../../../../shared/presentation/navigation/navigationRef';
import { showUnknownError } from '../../../../shared/application/commands/manage-global-errors';
import { Customer, IDocument } from '@clean-rn/kyc/domain';
import AsyncStorage from '@react-native-async-storage/async-storage';

export function* checkCustomerStatusSaga(httpConnection: HttpConnection): Generator<StrictEffect, any, any> {
  yield takeEvery(IKycTypes.CHECK_CUSTOMER_STATUS, checkCustomerStatusGenerator, httpConnection);
}

export function* checkCustomerStatusGenerator(
  httpConnection: HttpConnection,
): Generator<StrictEffect, any, any> {
  try {
    //todo check customer status in async storage to avoid one api call

    const api = AccountApi.getInstance(httpConnection);

    const customerDocuments: IDocument[] = yield call([api, api.getDocuments]);
    const customer = Customer.Create({ properties: { documents: customerDocuments } });
    customer.checkCustomerStatus();
    yield put(customerStatusChecked({ customer }));
    yield call(AsyncStorage.setItem, 'customerStatus', JSON.stringify(customer.properties.status));
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
