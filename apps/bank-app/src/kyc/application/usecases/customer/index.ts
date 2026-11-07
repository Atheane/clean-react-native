/* eslint-disable @typescript-eslint/no-explicit-any */
import { put, StrictEffect, takeEvery, call, select, spawn, join } from 'redux-saga/effects';
import { HttpConnection } from '@clean-rn/shared/infrastructure';
import { Customer, IStepTypes, IDocumentProperties, DocumentVO } from '@clean-rn/kyc/domain';
import { KYC_REVIEW, User } from '@clean-rn/user/domain';
import { IAccount, IAccountType } from '@clean-rn/account/domain';
import { ITransaction } from '@clean-rn/transaction/domain';
import { AccountApi } from '@clean-rn/account/infrastructure';
import { TransactionApi } from '@clean-rn/transaction/infrastructure';
import { KycApi } from '@clean-rn/kyc/infrastructure';

import { showUnknownError } from '../../../../shared/application/commands/manage-global-errors';
import { selectCustomer } from '../../state-management/selectors';
import { ICustomerTypes, initializeCustomer, sendDocument } from '../../commands';

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
    const customerStatus = user.properties.kycReview as KYC_REVIEW;

    const customer = Customer.Create({
      id: parseInt(user.id),
      properties: {
        USPerson: user.properties.USPerson as boolean,
        reviewComment: user.properties.kycReviewComment || '',
        steps: {
          [IStepTypes.W9]: undefined,
          [IStepTypes.ID]: undefined,
          [IStepTypes.INFORMATIONS]: undefined,
          [IStepTypes.SCT]: undefined,
        },
      },
    });

    customer.checkKYCStatus(customerStatus);

    // if ([KYC_REVIEW.NONE, KYC_REVIEW.REFUSED, KYC_REVIEW.REMEDIATION].includes(customerStatus)) {
    customer.checkStepRevenues(user?.properties?.revenues);

    const accountApi = AccountApi.getInstance(httpConnection);
    const accounts = yield call([accountApi, accountApi.getAccounts]);
    const mainAccount = accounts.find((account: IAccount) => account.accountType === IAccountType.MAIN);
    const transactionApi = TransactionApi.getInstance(httpConnection);
    const transactions: ITransaction[] = yield call(
      [transactionApi, transactionApi.getTransactions],
      mainAccount.accountId,
    );
    customer.checkStepSct(transactions);

    const kycApi = KycApi.getInstance(httpConnection);
    const documents = yield call([kycApi, kycApi.getDocuments]);
    customer.checkStepID(documents);

    if (user.properties.USPerson) {
      customer.checkStepW9(documents);
    }
    // }
  } catch (error: unknown) {
    yield put(initializeCustomer());
    yield put(showUnknownError(error as Error));
  }
}

export function* createDocumentSaga(): Generator<StrictEffect, any, any> {
  yield takeEvery(ICustomerTypes.CREATE_DOCUMENT, createDocumentSagaGenerator);
}

export function* createDocumentSagaGenerator({
  payload,
}: {
  type: string;
  payload: {
    documentProperties: IDocumentProperties;
  };
}): Generator<StrictEffect, any, any> {
  try {
    const document = new DocumentVO(payload.documentProperties);
    const customerFromRedux = yield select(selectCustomer);
    const customer = Customer.Create(customerFromRedux);
    customer.createDocument(document);
  } catch (error: unknown) {
    // once app is well tested, delete this part and let onError hook manage unexpected errors
    yield put(showUnknownError(error as Error));
  }
}

export function* addPageSaga(httpConnection: HttpConnection): Generator<StrictEffect, any, any> {
  yield takeEvery(ICustomerTypes.ADD_PAGE, addPageSagaGenerator, httpConnection);
}

export function* addPageSagaGenerator(
  httpConnection: HttpConnection,
  {
    payload,
  }: {
    type: string;
    payload: {
      base64: string;
    };
  },
): Generator<StrictEffect, any, any> {
  try {
    // redux get rid of instance methods such as addPage, isReady...
    // so we need to instanciate a new instance so as to make use of these methods
    // bouhhh redux on that one
    const customerFromRedux = yield select(selectCustomer);
    const customer = Customer.Create(customerFromRedux);

    customer.addPage(payload.base64);

    const document = customer.properties.currentDocument as DocumentVO;
    if (document.isReady) {
      yield put(sendDocument());
      const api = KycApi.getInstance(httpConnection);

      const createDocumentTask = yield spawn([api, api.createDocument], {
        customerId: customer.id,
        document,
      });
      yield join(createDocumentTask);
      customer.sendDocument();
    }
  } catch (error: unknown) {
    // once app is well tested, delete this part and let onError hook manage unexpected errors
    yield put(showUnknownError(error as Error));
  }
}
