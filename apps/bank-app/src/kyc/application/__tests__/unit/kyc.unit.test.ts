/* eslint-disable  @typescript-eslint/no-explicit-any */
import { takeEvery } from 'redux-saga/effects';
import { testSaga } from 'redux-saga-test-plan';
import Constants from 'expo-constants';
import { UserApi } from '@clean-rn/auth/infrastructure';
import dayjs from 'dayjs';

import {
  Customer,
  IDocumentProperties,
  IDocumentCategory,
  IDocumentStatus,
  IDocumentStatusCode,
} from '@clean-rn/kyc/domain';

import { HttpConnection, ServerError } from '@clean-rn/shared/infrastructure';
import { KycApi } from '@clean-rn/kyc/infrastructure';
import { BirthDay, Email, User, Phone, IGender, Country, KYC_REVIEW } from '@clean-rn/auth/domain';

import { showUnknownError } from '../../../../shared/application/commands/manage-global-errors';

import { checkCustomerStatusGenerator, checkCustomerStatusSaga } from '../../usecases/customer';
import {
  ICustomerTypes,
  checkCustomerStatus,
  customerStatusChecked,
  initializeKyc,
} from '../../commands/customer';
import { fetchRefresh } from '../../../../auth/application/commands/login';

describe('KYC - CheckCustomerStatus - usecase', () => {
  const httpConnection = HttpConnection.getInstance(Constants.expoConfig?.extra?.BASE_URL_API);

  const userApi = UserApi.getInstance(httpConnection);
  const kycApi = KycApi.getInstance(httpConnection);
  const genObject = checkCustomerStatusSaga(httpConnection);
  const user = User.Create({
    id: 123,
    properties: {
      kycReview: KYC_REVIEW.NONE,
      USPerson: false,
      birth: {
        birthday: new BirthDay(dayjs('1980-01-01T00:00:00.000Z')),
        nationality: new Country('SE'),
      },
      email: new Email('user1@example.com'),
      identity: {
        firstName: 'aze',
        gender: IGender.NEUTRAL,
        lastName: 'aze',
      },
      phone: new Phone('+46726413201'),
    },
  });
  const mockResponse: IDocumentProperties[] = [
    {
      typeId: 9,
      category: IDocumentCategory.ID,
      status: IDocumentStatus.PENDING,
      name: 'test-mock-recto',
      createdAt: new Date('2023-10-03T13:20:21.303Z'),
      statusCode: IDocumentStatusCode.INITIAL,
    },
    {
      typeId: 9,
      category: IDocumentCategory.ID,
      status: IDocumentStatus.PENDING,
      name: 'test-mock-verso',
      createdAt: new Date('2023-10-03T13:20:22.303Z'),
      statusCode: IDocumentStatusCode.INITIAL,
    },
  ];

  const mockError401 = {
    statusCode: 401,
    message: 'Unauthorized',
    response: {
      statusCode: 401,
      message: 'Unauthorized',
    },
    timestamp: '2023-10-03T13:20:21.303Z',
    path: '/app/document/kyc',
    method: 'GET',
  };

  const mockError500 = {
    message: 'Core::DocumentService::Document - Server Error',
    statusCode: 500,
    response: 'Core::DocumentService::Document - Server Error',
    timestamp: '2023-04-07T15:28:04.657Z',
    path: '/app/document/kyc',
  };

  it('Should wait for CHECK_CUSTOMER_STATUS action and call checkCustomerStatusGenerator, should be done on next iteration', () => {
    expect(genObject.next().value).toEqual(
      takeEvery(ICustomerTypes.CHECK_CUSTOMER_STATUS, checkCustomerStatusGenerator, httpConnection),
    );
    expect(genObject.next().done).toBeTruthy();
  });

  it('Should call customerStatusChecked if status is not cached or not VALIDATED', async () => {
    const customer = Customer.Create({
      id: 123,
      properties: { USPerson: false },
    });

    customer.checkDocumentsStatus(mockResponse);
    testSaga(checkCustomerStatusGenerator, httpConnection)
      .next()
      .call([userApi, userApi.getUser]) // <- Utilisez cette syntaxe pour spécifier le contexte.
      .next(user)
      .call([kycApi, kycApi.getDocuments]) // <- Utilisez cette syntaxe pour spécifier le contexte.
      .next(mockResponse)
      .put(
        customerStatusChecked({
          customer,
        }),
      )
      .next();
  });

  it('Should call customerStatusChecked but no call to kycAPI if status VALIDATED', async () => {
    const user = User.Create({
      id: 123,
      properties: { kycReview: KYC_REVIEW.VALIDATED, USPerson: false },
    });

    const customer = Customer.Create({
      id: 123,
      properties: { status: KYC_REVIEW.VALIDATED, USPerson: false },
    });

    testSaga(checkCustomerStatusGenerator, httpConnection)
      .next()
      .call([userApi, userApi.getUser]) // <- Utilisez cette syntaxe pour spécifier le contexte.
      .next(user)
      .put(
        customerStatusChecked({
          customer,
        }),
      )
      .next({ customer })
      .cancel();
  });

  it('Should call customerStatusChecked if status PENDING and kycComment', async () => {
    const user = User.Create({
      id: 123,
      properties: { kycReview: KYC_REVIEW.PENDING, USPerson: false, kycReviewComment: 'test' },
    });

    const customer = Customer.Create({
      id: 123,
      properties: { status: KYC_REVIEW.PENDING, USPerson: false, kycReviewComment: 'test' },
    });
    customer.addKycReviewComment('test');
    customer.checkDocumentsStatus(mockResponse);

    testSaga(checkCustomerStatusGenerator, httpConnection)
      .next()
      .call([userApi, userApi.getUser]) // <- Utilisez cette syntaxe pour spécifier le contexte.
      .next(user)
      .call([kycApi, kycApi.getDocuments]) // <- Utilisez cette syntaxe pour spécifier le contexte.
      .next(mockResponse)
      .put(
        customerStatusChecked({
          customer,
        }),
      )
      .next({ customer });
  });

  it('Should call navigate to Login modale if 401 from Server', () => {
    const user = User.Create({ id: 123, properties: {} });

    testSaga(checkCustomerStatusGenerator, httpConnection)
      .next()
      .call([userApi, userApi.getUser]) // <- Utilisez cette syntaxe pour spécifier le contexte.
      .next(user)
      .call([kycApi, kycApi.getDocuments]) // <- Utilisez cette syntaxe pour spécifier le contexte.
      .throw(new ServerError(mockError401))
      .put(fetchRefresh())
      .next()
      .put(checkCustomerStatus())
      .next()
      .cancel();
  });

  it('Should call showUnknownError action if 500 from Server', () => {
    const user = User.Create({ id: 123, properties: {} });

    testSaga(checkCustomerStatusGenerator, httpConnection)
      .next()
      .call([userApi, userApi.getUser]) // <- Utilisez cette syntaxe pour spécifier le contexte.
      .next(user)
      .call([kycApi, kycApi.getDocuments]) // <- Utilisez cette syntaxe pour spécifier le contexte.
      .throw(new ServerError(mockError500))
      .put(initializeKyc())
      .next()
      .put(showUnknownError(new ServerError(mockError500)))
      .next();
  });

  it('Should call showUnknownError action if unknown error', () => {
    const user = User.Create({ id: 123, properties: {} });

    testSaga(checkCustomerStatusGenerator, httpConnection)
      .next()
      .call([userApi, userApi.getUser]) // <- Utilisez cette syntaxe pour spécifier le contexte.
      .next(user)
      .call([kycApi, kycApi.getDocuments]) // <- Utilisez cette syntaxe pour spécifier le contexte.
      .throw(new Error('unknown error'))
      .put(initializeKyc())
      .next()
      .put(showUnknownError(new Error('unknown error')))
      .next();
  });
});
