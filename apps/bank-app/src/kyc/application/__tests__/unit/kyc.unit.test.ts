/* eslint-disable  @typescript-eslint/no-explicit-any */
import { takeEvery } from 'redux-saga/effects';
import { testSaga } from 'redux-saga-test-plan';
import dayjs from 'dayjs';

import {
  Customer,
  IDocumentProperties,
  IKycSteps,
  IDocumentStatus,
  IDocumentStatusCode,
  IDocumentType,
} from '@clean-rn/kyc/domain';

import { HttpConnection, ServerError } from '@clean-rn/shared/infrastructure';
import { KycApi } from '@clean-rn/kyc/infrastructure';
import { Phone } from '@clean-rn/contact/domain';
import { BirthDay, User, IGender, Country, KYC_REVIEW } from '@clean-rn/user/domain';
import { Email } from '@clean-rn/auth/domain';
import { IAccountType, Bic, Iban, IAccount } from '@clean-rn/account/domain';
import { Amount, ITransaction, ITransactionType, TransactionCategory } from '@clean-rn/transaction/domain';
import { AccountApi } from '@clean-rn/account/infrastructure';
import { ITransactionServer, TransactionApi } from '@clean-rn/transaction/infrastructure';

import { IKycStackPages } from '../../../../shared/presentation/types';
import { showUnknownError } from '../../../../shared/application/commands/manage-global-errors';

import { checkCustomerStatusGenerator, checkCustomerStatusSaga } from '../../usecases/customer';
import { ICustomerTypes, customerStatusChecked, initializeKyc } from '../../commands/customer';

jest.mock('@clean-rn/shared/infrastructure', () => ({
  HttpConnection: {
    getInstance: jest.fn(),
  },
  ServerError: jest.fn().mockImplementation(function (error) {
    this.message = error.message;
    this.name = 'ServerError';
    this.statusCode = error.statusCode;
    this.codeError = error.codeError;
    this.cause = error.response;
  }),
}));

describe('KYC - CheckCustomerStatus - usecase', () => {
  let httpConnection: HttpConnection;
  let kycApi: KycApi;
  let accountApi: AccountApi;
  let transactionApi: TransactionApi;

  beforeEach(() => {
    httpConnection = {
      baseUrl: 'http://mock-api.com',
      options: jest.fn(),
      handleError: jest.fn(),
      getDefaultHeaders: jest.fn(),
      attachBearerToken: jest.fn(),
    };
    HttpConnection.getInstance.mockReturnValue(httpConnection);
    global.fetch = jest.fn();
    kycApi = KycApi.getInstance(httpConnection);
    accountApi = AccountApi.getInstance(httpConnection);
    transactionApi = TransactionApi.getInstance(httpConnection);
  });

  afterEach(() => {
    jest.resetAllMocks();
    jest.clearAllMocks();
  });

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
      typeId: IDocumentType.ID,
      kycStep: IKycSteps.ID,
      status: IDocumentStatus.PENDING,
      name: 'test-mock-recto',
      createdAt: new Date('2023-10-03T13:20:21.303Z'),
      statusCode: IDocumentStatusCode.INITIAL,
    },
    {
      typeId: IDocumentType.ID,
      kycStep: IKycSteps.ID,
      status: IDocumentStatus.PENDING,
      name: 'test-mock-verso',
      createdAt: new Date('2023-10-03T13:20:22.303Z'),
      statusCode: IDocumentStatusCode.INITIAL,
    },
  ];

  const mockResponsePending: IDocumentProperties[] = [
    {
      typeId: IDocumentType.ID,
      kycStep: IKycSteps.ID,
      status: IDocumentStatus.VALIDATED,
      name: 'test-mock-recto',
      createdAt: new Date('2023-10-03T13:20:21.303Z'),
      statusCode: IDocumentStatusCode.INITIAL,
    },
    {
      typeId: IDocumentType.ID,
      kycStep: IKycSteps.ID,
      status: IDocumentStatus.PENDING,
      name: 'test-mock-verso',
      createdAt: new Date('2023-10-03T13:20:22.303Z'),
      statusCode: IDocumentStatusCode.INITIAL,
    },
  ];

  const mockResponseRefused: IDocumentProperties[] = [
    {
      typeId: IDocumentType.PASSPORT,
      kycStep: IKycSteps.ID,
      status: IDocumentStatus.REFUSED,
      name: 'test-mock-recto',
      createdAt: new Date('2023-10-03T13:20:21.303Z'),
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

  const mockedAccounts: IAccount[] = [
    {
      accountId: 4004318954,
      accountType: IAccountType.MAIN,
      authorizedBalance: 0,
      iban: new Iban('FR7616798000010000242599449'),
      bic: new Bic('TRZOFR21XXX'),
    },
  ];

  const mockedTransactions: ITransaction[] = [
    {
      amount: 0.25,
      updatedAt: '2023-06-15T07:38:09.217Z',
      label: 'Payin Generated from UTs on User Test',
      transactionId: 1686814688829,
      transactionType: ITransactionType.PAYIN,
    },
    {
      amount: 244.99,
      updatedAt: '2023-05-23T06:47:10.000Z',
      label: 'GASCOVERT AUC',
      mccCode: 5992,
      transactionId: 1686814773049,
      transactionType: ITransactionType.CARD_TRANSACTION,
    },
  ].map((item: ITransactionServer) => ({
    id: item.transactionId,
    amount: new Amount(item.amount.toString(), item.transactionType as ITransactionType),
    label: item.label,
    category: item.mccCode
      ? new TransactionCategory(item.transactionType as ITransactionType, item.mccCode)
      : new TransactionCategory(item.transactionType as ITransactionType),
    date: new Date(item.updatedAt),
    type: item.transactionType as ITransactionType, //todo: maybe delete this, and make use of category only, easier to map, and this is all we need to know in the app
  }));

  it('Should wait for CHECK_CUSTOMER_STATUS action and call checkCustomerStatusGenerator, should be done on next iteration', () => {
    const genObject = checkCustomerStatusSaga(httpConnection);
    expect(genObject.next().value).toEqual(
      takeEvery(ICustomerTypes.CHECK_CUSTOMER_STATUS, checkCustomerStatusGenerator, httpConnection),
    );
    expect(genObject.next().done).toBeTruthy();
  });

  it('Should call customerStatusChecked and initRoute INIT', async () => {
    const customer = Customer.Create({
      id: 123,
      properties: { USPerson: false, status: 0, kycReviewComment: '' },
    });

    customer.initKyc([], []);
    testSaga(checkCustomerStatusGenerator, httpConnection, {
      type: ICustomerTypes.CHECK_CUSTOMER_STATUS,
      payload: { user },
    })
      .next()
      .call([kycApi, kycApi.getDocuments])
      .next([])
      .call([accountApi, accountApi.getAccounts])
      .next(mockedAccounts)
      .call([transactionApi, transactionApi.getTransactions], mockedAccounts[0].accountId)
      .next([])
      .put(
        customerStatusChecked({
          customer,
          initRoute: IKycStackPages.INIT,
        }),
      )
      .next();
  });

  it('Should call customerStatusChecked and initRoute KYC if ID PENDING and SCT not active', async () => {
    const customer = Customer.Create({
      id: 123,
      properties: { USPerson: false, status: KYC_REVIEW.PENDING, kycReviewComment: '' },
    });

    user.properties.kycReview = KYC_REVIEW.PENDING;
    customer.initKyc(mockResponseIncomplete, []);

    testSaga(checkCustomerStatusGenerator, httpConnection, {
      type: ICustomerTypes.CHECK_CUSTOMER_STATUS,
      payload: { user },
    })
      .next()
      .call([kycApi, kycApi.getDocuments]) // <- Utilisez cette syntaxe pour spécifier le contexte.
      .next(mockResponseIncomplete)
      .call([accountApi, accountApi.getAccounts])
      .next(mockedAccounts)
      .call([transactionApi, transactionApi.getTransactions], mockedAccounts[0].accountId)
      .next([])
      .put(
        customerStatusChecked({
          customer,
          initRoute: IKycStackPages.KYC,
        }),
      )
      .next();
  });

  it('Should call customerStatusChecked and initRoute KYC if ID PENDING and SCT active', async () => {
    const customer = Customer.Create({
      id: 123,
      properties: { USPerson: false, status: KYC_REVIEW.PENDING, kycReviewComment: '' },
    });

    user.properties.kycReview = KYC_REVIEW.PENDING;
    customer.initKyc(mockResponseIncomplete, mockedTransactions);
    testSaga(checkCustomerStatusGenerator, httpConnection, {
      type: ICustomerTypes.CHECK_CUSTOMER_STATUS,
      payload: { user },
    })
      .next()
      .call([kycApi, kycApi.getDocuments]) // <- Utilisez cette syntaxe pour spécifier le contexte.
      .next(mockResponseIncomplete)
      .call([accountApi, accountApi.getAccounts])
      .next(mockedAccounts)
      .call([transactionApi, transactionApi.getTransactions], mockedAccounts[0].accountId)
      .next(mockedTransactions)
      .put(
        customerStatusChecked({
          customer,
          initRoute: IKycStackPages.KYC,
        }),
      )
      .next();
  });

  it('Should call customerStatusChecked and initRoute KYC if documents pending and SCT not active', async () => {
    const customer = Customer.Create({
      id: 123,
      properties: { USPerson: false, status: KYC_REVIEW.PENDING, kycReviewComment: '' },
    });

    user.properties.kycReview = KYC_REVIEW.PENDING;
    customer.initKyc(mockResponseIncomplete, []);
    testSaga(checkCustomerStatusGenerator, httpConnection, {
      type: ICustomerTypes.CHECK_CUSTOMER_STATUS,
      payload: { user },
    })
      .next()
      .call([kycApi, kycApi.getDocuments]) // <- Utilisez cette syntaxe pour spécifier le contexte.
      .next(mockResponsePending)
      .call([accountApi, accountApi.getAccounts])
      .next(mockedAccounts)
      .call([transactionApi, transactionApi.getTransactions], mockedAccounts[0].accountId)
      .next([])
      .put(
        customerStatusChecked({
          customer,
          initRoute: IKycStackPages.KYC,
        }),
      )
      .next();
  });

  it('Should call customerStatusChecked and initRoute KYC if ID refused', async () => {
    const customer = Customer.Create({
      id: 123,
      properties: { USPerson: false, status: KYC_REVIEW.REFUSED, kycReviewComment: '' },
    });
    user.properties.kycReview = KYC_REVIEW.REFUSED;
    customer.initKyc(mockResponseRefused, mockedTransactions);
    testSaga(checkCustomerStatusGenerator, httpConnection, {
      type: ICustomerTypes.CHECK_CUSTOMER_STATUS,
      payload: { user },
    })
      .next()
      .call([kycApi, kycApi.getDocuments]) // <- Utilisez cette syntaxe pour spécifier le contexte.
      .next(mockResponseRefused)
      .call([accountApi, accountApi.getAccounts])
      .next(mockedAccounts)
      .call([transactionApi, transactionApi.getTransactions], mockedAccounts[0].accountId)
      .next(mockedTransactions)
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
      properties: { status: KYC_REVIEW.VALIDATED, USPerson: false, kycReviewComment: '' },
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
    customer.initKyc(mockResponsePending, mockedTransactions);

    testSaga(checkCustomerStatusGenerator, httpConnection, {
      type: ICustomerTypes.CHECK_CUSTOMER_STATUS,
      payload: { user },
    })
      .next()
      .call([kycApi, kycApi.getDocuments]) // <- Utilisez cette syntaxe pour spécifier le contexte.
      .next(mockResponsePending)
      .call([accountApi, accountApi.getAccounts])
      .next(mockedAccounts)
      .call([transactionApi, transactionApi.getTransactions], mockedAccounts[0].accountId)
      .next(mockedTransactions)
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
