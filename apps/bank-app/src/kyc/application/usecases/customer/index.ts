/* eslint-disable @typescript-eslint/no-explicit-any */
import { call, put, StrictEffect, takeEvery, cancel } from 'redux-saga/effects';

import { HttpConnection } from '@clean-rn/shared/infrastructure';
import { Customer, IDocumentProperties, IKycState } from '@clean-rn/kyc/domain';
import { KycApi } from '@clean-rn/kyc/infrastructure';
import { KYC_REVIEW, User } from '@clean-rn/user/domain';

import { showUnknownError } from '../../../../shared/application/commands/manage-global-errors';
import { IKycStackPages } from '../../../../shared/presentation/types';

import { customerStatusChecked, initializeKyc, ICustomerTypes } from '../../commands/customer';

export function* checkCustomerStatusSaga(httpConnection: HttpConnection): Generator<StrictEffect, any, any> {
  yield takeEvery(ICustomerTypes.CHECK_CUSTOMER_STATUS, checkCustomerStatusGenerator, httpConnection);
}

export function* checkCustomerStatusGenerator(
  httpConnection: HttpConnection,
  {
    payload,
  }: {
    type: string;
    payload: {
      user: User;
    };
  },
): Generator<StrictEffect, any, any> {
  try {
    const { user } = payload;
    const customerStatus = user.properties.kycReview;
    if (customerStatus && customerStatus === KYC_REVIEW.VALIDATED) {
      const customer = Customer.Create({
        id: parseInt(user.id),
        properties: { status: customerStatus, USPerson: user.properties.USPerson as boolean },
      });
      yield put(customerStatusChecked({ customer, initRoute: IKycStackPages.SUCCESS }));
      yield cancel();
    }

    const api = KycApi.getInstance(httpConnection);
    const documents: IDocumentProperties[] = yield call([api, api.getDocuments]);
    const customer = Customer.Create({
      id: parseInt(user.id),
      properties: { status: customerStatus, USPerson: user.properties.USPerson as boolean },
    });
    if (user.properties.kycReviewComment && user.properties.kycReviewComment.length > 0) {
      customer.addKycReviewComment(user.properties.kycReviewComment);
    }
    customer.checkDocumentsStatus(documents);

    if (customerStatus) customer.setState(customerStatus); // if KYC refused but all docs are validated, we should show last SCT step

    let initRoute: IKycStackPages;
    if (customer.properties.kyc?.state === IKycState.INIT) {
      initRoute = IKycStackPages.INIT;
    } else if (customer.properties.kyc?.state === IKycState.DOCUMENTS_VALIDATED) {
      initRoute = IKycStackPages.DOCUMENTS_VALIDATED;
    } else {
      // state = INCOMPLETE, PENDING or REFUSED
      initRoute = IKycStackPages.KYC;
    }

    yield put(customerStatusChecked({ customer, initRoute }));
  } catch (error: unknown) {
    // once app is well tested, delete this part and let onError hook manage unexpected errors
    yield put(initializeKyc());
    yield put(showUnknownError(error as Error));
  }
}
