/* eslint-disable @typescript-eslint/no-explicit-any */
import { call, put, StrictEffect, takeEvery, cancel, select } from 'redux-saga/effects';

import { HttpConnection, ServerError } from '@clean-rn/shared/infrastructure';
import { Customer, IDocumentProperties } from '@clean-rn/kyc/domain';
import { KycApi } from '@clean-rn/kyc/infrastructure';
import { AuthApi, UserApi } from '@clean-rn/auth/infrastructure';
import { KYC_REVIEW } from '@clean-rn/auth/domain';

import { showUnknownError } from '../../../../shared/application/commands/manage-global-errors';
import { selectAuthFromLogin } from '../../../../auth/application/state-management/selectors';
import { IAuthStackPages } from '../../../../shared/presentation/types';
import { navigate } from '../../../../shared/presentation/navigation/navigationRef';

import { refreshSuccess } from '../../../../auth/application/commands/login';

import { customerStatusChecked, initializeKyc, ICustomerTypes } from '../../commands/customer';

export function* checkCustomerStatusSaga(httpConnection: HttpConnection): Generator<StrictEffect, any, any> {
  yield takeEvery(ICustomerTypes.CHECK_CUSTOMER_STATUS, checkCustomerStatusGenerator, httpConnection);
}

export function* checkCustomerStatusGenerator(
  httpConnection: HttpConnection,
): Generator<StrictEffect, any, any> {
  try {
    const authApi = AuthApi.getInstance(httpConnection);
    const authFromStore = yield select(selectAuthFromLogin);
    const refreshedAuth = yield call([authApi, authApi.refresh], authFromStore.refreshToken);
    yield put(refreshSuccess({ auth: refreshedAuth }));

    const userApi = UserApi.getInstance(httpConnection);
    const user = yield call([userApi, userApi.getUser]);
    const customerStatus = user.properties.kycReview;
    if (customerStatus && customerStatus === KYC_REVIEW.VALIDATED) {
      const customer = Customer.Create({
        id: user.id.toString(),
        properties: { status: customerStatus, USPerson: user.properties.USPerson },
      });
      yield put(customerStatusChecked({ customer }));
      yield cancel();
    }

    const auth = yield call([authApi, authApi.refresh], authFromStore.refreshToken);
    yield put(refreshSuccess({ auth }));
    const api = KycApi.getInstance(httpConnection);
    const documents: IDocumentProperties[] = yield call([api, api.getDocuments]);
    const customer = Customer.Create({
      id: user.id.toString(),
      properties: { status: customerStatus, USPerson: user.properties.USPerson },
    });
    if (user.properties.kycReviewComment && user.properties.kycReviewComment.length > 0) {
      customer.addKycReviewComment(user.properties.kycReviewComment);
    }
    customer.checkDocumentsStatus(documents);
    yield put(customerStatusChecked({ customer }));
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
