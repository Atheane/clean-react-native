/* eslint-disable  @typescript-eslint/no-explicit-any */
import { takeEvery } from 'redux-saga/effects';
import { testSaga } from 'redux-saga-test-plan';
import dayjs from 'dayjs';

import {
  Customer,
  IDocumentProperties,
  IDocumentCategory,
  IDocumentStatus,
  IDocumentStatusCode,
  IDocumentType,
} from '@clean-rn/kyc/domain';

import { HttpConnection, ServerError } from '@clean-rn/shared/infrastructure';
import { KycApi } from '@clean-rn/kyc/infrastructure';
import { Phone } from '@clean-rn/contact/domain';
import { BirthDay, User, IGender, Country, KYC_REVIEW } from '@clean-rn/user/domain';
import { Email } from '@clean-rn/auth/domain';

import { IKycStackPages } from '../../../../shared/presentation/types';
import { showUnknownError } from '../../../../shared/application/commands/manage-global-errors';

import { checkCustomerStatusGenerator, checkCustomerStatusSaga } from '../../usecases/customer';
import { ICustomerTypes, customerStatusChecked, initializeKyc } from '../../commands/customer';

describe('KYC - CheckCustomerStatus - usecase', () => {
  const httpConnection = HttpConnection.getInstance(process.env.EXPO_PUBLIC_BASE_URL_API || '');

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
  const mockResponseIncomplete: IDocumentProperties[] = [
    {
      typeId: IDocumentType.RESIDENT_PERMIT,
      category: IDocumentCategory.ID,
      status: IDocumentStatus.PENDING,
      name: 'test-mock-recto',
      createdAt: new Date('2023-10-03T13:20:21.303Z'),
      statusCode: IDocumentStatusCode.INITIAL,
    },
    {
      typeId: IDocumentType.RESIDENT_PERMIT,
      category: IDocumentCategory.ID,
      status: IDocumentStatus.PENDING,
      name: 'test-mock-verso',
      createdAt: new Date('2023-10-03T13:20:22.303Z'),
      statusCode: IDocumentStatusCode.INITIAL,
    },
  ];

  const mockResponsePending: IDocumentProperties[] = [
    {
      typeId: IDocumentType.ID,
      category: IDocumentCategory.ID,
      status: IDocumentStatus.VALIDATED,
      name: 'test-mock-recto',
      createdAt: new Date('2023-10-03T13:20:21.303Z'),
      statusCode: IDocumentStatusCode.INITIAL,
    },
    {
      typeId: IDocumentType.ID,
      category: IDocumentCategory.ID,
      status: IDocumentStatus.PENDING,
      name: 'test-mock-verso',
      createdAt: new Date('2023-10-03T13:20:22.303Z'),
      statusCode: IDocumentStatusCode.INITIAL,
    },
    {
      typeId: IDocumentType.PROOF_OF_ADDRESS,
      category: IDocumentCategory.RESIDENCE_PROOF,
      status: IDocumentStatus.PENDING,
      name: 'test-mock-verso',
      createdAt: new Date('2023-10-03T13:20:22.303Z'),
      statusCode: IDocumentStatusCode.INITIAL,
    },
  ];

  const mockResponseDocumentsValidated: IDocumentProperties[] = [
    {
      typeId: IDocumentType.ID,
      category: IDocumentCategory.ID,
      status: IDocumentStatus.VALIDATED,
      name: 'test-mock-recto',
      createdAt: new Date('2023-10-03T13:20:21.303Z'),
      statusCode: IDocumentStatusCode.INITIAL,
    },
    {
      typeId: IDocumentType.ID,
      category: IDocumentCategory.ID,
      status: IDocumentStatus.VALIDATED,
      name: 'test-mock-verso',
      createdAt: new Date('2023-10-03T13:20:22.303Z'),
      statusCode: IDocumentStatusCode.INITIAL,
    },
    {
      typeId: IDocumentType.PROOF_OF_ADDRESS,
      category: IDocumentCategory.RESIDENCE_PROOF,
      status: IDocumentStatus.VALIDATED,
      name: 'test-mock-verso',
      createdAt: new Date('2023-10-03T13:20:22.303Z'),
      statusCode: IDocumentStatusCode.INITIAL,
    },
  ];

  const mockResponseRefused: IDocumentProperties[] = [
    {
      typeId: IDocumentType.PASSPORT,
      category: IDocumentCategory.ID,
      status: IDocumentStatus.REFUSED,
      name: 'test-mock-recto',
      createdAt: new Date('2023-10-03T13:20:21.303Z'),
      statusCode: IDocumentStatusCode.INITIAL,
    },
    {
      typeId: IDocumentType.PROOF_OF_ADDRESS,
      category: IDocumentCategory.RESIDENCE_PROOF,
      status: IDocumentStatus.VALIDATED,
      name: 'test-mock-verso',
      createdAt: new Date('2023-10-03T13:20:22.303Z'),
      statusCode: IDocumentStatusCode.INITIAL,
    },
  ];

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

  it('Should call customerStatusChecked and initRoute INIT if customer kycReview not VALIDATED', async () => {
    const customer = Customer.Create({
      id: 123,
      properties: { USPerson: false },
    });

    customer.checkDocumentsStatus([]);
    testSaga(checkCustomerStatusGenerator, httpConnection, {
      type: ICustomerTypes.CHECK_CUSTOMER_STATUS,
      payload: { user },
    })
      .next()
      .call([kycApi, kycApi.getDocuments]) // <- Utilisez cette syntaxe pour spécifier le contexte.
      .next([])
      .put(
        customerStatusChecked({
          customer,
          initRoute: IKycStackPages.INIT,
        }),
      )
      .next();
  });

  it('Should call customerStatusChecked and initRoute KYC if customer kycReview not VALIDATED and documents incomplete', async () => {
    const customer = Customer.Create({
      id: 123,
      properties: { USPerson: false },
    });

    customer.checkDocumentsStatus(mockResponseIncomplete);
    testSaga(checkCustomerStatusGenerator, httpConnection, {
      type: ICustomerTypes.CHECK_CUSTOMER_STATUS,
      payload: { user },
    })
      .next()
      .call([kycApi, kycApi.getDocuments]) // <- Utilisez cette syntaxe pour spécifier le contexte.
      .next(mockResponseIncomplete)
      .put(
        customerStatusChecked({
          customer,
          initRoute: IKycStackPages.KYC,
        }),
      )
      .next();
  });

  it('Should call customerStatusChecked and initRoute KYC if customer kycReview not VALIDATED and documents pending', async () => {
    const customer = Customer.Create({
      id: 123,
      properties: { USPerson: false },
    });

    customer.checkDocumentsStatus(mockResponsePending);
    testSaga(checkCustomerStatusGenerator, httpConnection, {
      type: ICustomerTypes.CHECK_CUSTOMER_STATUS,
      payload: { user },
    })
      .next()
      .call([kycApi, kycApi.getDocuments]) // <- Utilisez cette syntaxe pour spécifier le contexte.
      .next(mockResponsePending)
      .put(
        customerStatusChecked({
          customer,
          initRoute: IKycStackPages.KYC,
        }),
      )
      .next();
  });

  it('Should call customerStatusChecked and initRoute DOCUMENTS_VALIDATED if customer kycReview not VALIDATED and documents validated', async () => {
    const customer = Customer.Create({
      id: 123,
      properties: { USPerson: false },
    });

    customer.checkDocumentsStatus(mockResponseDocumentsValidated);
    testSaga(checkCustomerStatusGenerator, httpConnection, {
      type: ICustomerTypes.CHECK_CUSTOMER_STATUS,
      payload: { user },
    })
      .next()
      .call([kycApi, kycApi.getDocuments]) // <- Utilisez cette syntaxe pour spécifier le contexte.
      .next(mockResponseDocumentsValidated)
      .put(
        customerStatusChecked({
          customer,
          initRoute: IKycStackPages.DOCUMENTS_VALIDATED,
        }),
      )
      .next();
  });

  it('Should call customerStatusChecked and initRoute KYC if customer kycReview not VALIDATED and documents refused', async () => {
    const customer = Customer.Create({
      id: 123,
      properties: { USPerson: false },
    });

    customer.checkDocumentsStatus(mockResponseRefused);
    testSaga(checkCustomerStatusGenerator, httpConnection, {
      type: ICustomerTypes.CHECK_CUSTOMER_STATUS,
      payload: { user },
    })
      .next()
      .call([kycApi, kycApi.getDocuments]) // <- Utilisez cette syntaxe pour spécifier le contexte.
      .next(mockResponseRefused)
      .put(
        customerStatusChecked({
          customer,
          initRoute: IKycStackPages.KYC,
        }),
      )
      .next();
  });

  it('Should call customerStatusChecked and initRoute SUCCESS but no call to kycAPI if status VALIDATED', async () => {
    const user = User.Create({
      id: 123,
      properties: { kycReview: KYC_REVIEW.VALIDATED, USPerson: false },
    });

    const customer = Customer.Create({
      id: 123,
      properties: { status: KYC_REVIEW.VALIDATED, USPerson: false },
    });

    testSaga(checkCustomerStatusGenerator, httpConnection, {
      type: ICustomerTypes.CHECK_CUSTOMER_STATUS,
      payload: { user },
    })
      .next()
      .put(
        customerStatusChecked({
          customer,
          initRoute: IKycStackPages.SUCCESS,
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
    customer.checkDocumentsStatus(mockResponsePending);

    testSaga(checkCustomerStatusGenerator, httpConnection, {
      type: ICustomerTypes.CHECK_CUSTOMER_STATUS,
      payload: { user },
    })
      .next()
      .call([kycApi, kycApi.getDocuments]) // <- Utilisez cette syntaxe pour spécifier le contexte.
      .next(mockResponsePending)
      .put(
        customerStatusChecked({
          customer,
          initRoute: IKycStackPages.KYC,
        }),
      )
      .next({ customer });
  });

  it('Should call showUnknownError action if 500 from Server', () => {
    const user = User.Create({ id: 123, properties: { USPerson: false } });

    testSaga(checkCustomerStatusGenerator, httpConnection, {
      type: ICustomerTypes.CHECK_CUSTOMER_STATUS,
      payload: { user },
    })
      .next()
      .call([kycApi, kycApi.getDocuments]) // <- Utilisez cette syntaxe pour spécifier le contexte.
      .throw(new ServerError(mockError500))
      .put(initializeKyc())
      .next()
      .put(showUnknownError(new ServerError(mockError500)))
      .next();
  });

  it('Should call showUnknownError action if unknown error', () => {
    const user = User.Create({ id: 123, properties: { USPerson: false } });

    testSaga(checkCustomerStatusGenerator, httpConnection, {
      type: ICustomerTypes.CHECK_CUSTOMER_STATUS,
      payload: { user },
    })
      .next()
      .call([kycApi, kycApi.getDocuments]) // <- Utilisez cette syntaxe pour spécifier le contexte.
      .throw(new Error('unknown error'))
      .put(initializeKyc())
      .next()
      .put(showUnknownError(new Error('unknown error')))
      .next();
  });
});
