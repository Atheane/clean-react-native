/* eslint-disable  @typescript-eslint/no-explicit-any */
import { takeEvery } from 'redux-saga/effects';
import { testSaga } from 'redux-saga-test-plan';

import { DomainEventManager } from '@clean-rn/ddd';
import { Customer, IStepStatus, IStepTypes, KYC_EVENTS } from '@clean-rn/kyc/domain';
import { HttpConnection } from '@clean-rn/shared/infrastructure';
import { KycApi } from '@clean-rn/kyc/infrastructure';
import { AccountApi } from '@clean-rn/account/infrastructure';
import { TransactionApi } from '@clean-rn/transaction/infrastructure';

import { createMockHttpConnection, mockInfrastructure } from '../helpers/setup';
import {
  mockUserKYCNone,
  mockAccount,
  mockTransaction,
  mockUserKYCNoneRevenues,
  mockIDDocument,
  mockW9Document,
  mockUserKYCW9None,
} from '../fixtures/mock-data';
import { checkCustomerStatusGenerator, checkCustomerStatusSaga } from '../../usecases/customer';
import { ICustomerTypes, initializeCustomer } from '../../commands';

import { showUnknownError } from '../../../../shared/application/commands/manage-global-errors';

describe('CheckKYC - usecase', () => {
  let httpConnection: HttpConnection;
  const domainManagerInstance = DomainEventManager.getInstance();

  beforeEach(() => {
    httpConnection = createMockHttpConnection();
    mockInfrastructure();
    jest.spyOn(domainManagerInstance, 'emit').mockImplementation((eventName: string, data: Customer) => {
      return true;
    });
  });

  afterEach(() => {
    jest.resetAllMocks();
    jest.clearAllMocks();
  });

  it('Should wait for CHECK_CUSTOMER_STATUS action', () => {
    const genObject = checkCustomerStatusSaga(httpConnection);
    expect(genObject.next().value).toEqual(
      takeEvery(ICustomerTypes.CHECK_CUSTOMER_STATUS, checkCustomerStatusGenerator, httpConnection),
    );
    expect(genObject.next().done).toBeTruthy();
  });

  it('Should check if user has no KYC', async () => {
    testSaga(checkCustomerStatusGenerator, httpConnection, {
      type: ICustomerTypes.CHECK_CUSTOMER_STATUS,
      payload: {
        user: mockUserKYCNone,
      },
    })
      .next()
      .call([AccountApi.getInstance(httpConnection), 'getAccounts'])
      .next([mockAccount])
      .call([TransactionApi.getInstance(httpConnection), 'getTransactions'], mockAccount.accountId)
      .next([])
      .call([KycApi.getInstance(httpConnection), 'getDocuments'])
      .next([]);

    // Vérifier que tous les événements attendus ont été émis
    expect(domainManagerInstance.emit).toHaveBeenCalledWith(KYC_EVENTS.CUSTOMER_CREATED, expect.any(Object));
    expect(domainManagerInstance.emit).toHaveBeenCalledWith(
      KYC_EVENTS.KYC_STATUS_CHECKED,
      expect.any(Object),
    );
    expect(domainManagerInstance.emit).toHaveBeenCalledWith(KYC_EVENTS.REVENUES_CHECKED, expect.any(Object));
    expect(domainManagerInstance.emit).toHaveBeenCalledWith(KYC_EVENTS.SCT_CHECKED, expect.any(Object));
    expect(domainManagerInstance.emit).toHaveBeenCalledWith(
      KYC_EVENTS.ID_CHECKED,
      expect.objectContaining({
        id: mockUserKYCNone.id,
        properties: expect.objectContaining({
          numberOfSteps: 3,
          status: 0,
          steps: {
            [IStepTypes.W9]: undefined,
            [IStepTypes.ID]: IStepStatus.INIT,
            [IStepTypes.INFORMATIONS]: IStepStatus.INIT,
            [IStepTypes.SCT]: IStepStatus.INIT,
          },
        }),
      }),
    );
  });

  it('Should check if user has SCT VAIDATED', async () => {
    testSaga(checkCustomerStatusGenerator, httpConnection, {
      type: ICustomerTypes.CHECK_CUSTOMER_STATUS,
      payload: {
        user: mockUserKYCNone,
      },
    })
      .next()
      .call([AccountApi.getInstance(httpConnection), 'getAccounts'])
      .next([mockAccount])
      .call([TransactionApi.getInstance(httpConnection), 'getTransactions'], mockAccount.accountId)
      .next([mockTransaction])
      .call([KycApi.getInstance(httpConnection), 'getDocuments'])
      .next([]);

    // Vérifier que les événements sont émis dans le bon ordre
    expect(domainManagerInstance.emit).toHaveBeenCalledWith(KYC_EVENTS.CUSTOMER_CREATED, expect.any(Object));
    expect(domainManagerInstance.emit).toHaveBeenCalledWith(
      KYC_EVENTS.KYC_STATUS_CHECKED,
      expect.any(Object),
    );
    expect(domainManagerInstance.emit).toHaveBeenCalledWith(KYC_EVENTS.REVENUES_CHECKED, expect.any(Object));
    expect(domainManagerInstance.emit).toHaveBeenCalledWith(KYC_EVENTS.SCT_CHECKED, expect.any(Object));
    expect(domainManagerInstance.emit).toHaveBeenCalledWith(
      KYC_EVENTS.ID_CHECKED,
      expect.objectContaining({
        id: mockUserKYCNone.id,
        properties: expect.objectContaining({
          numberOfSteps: 3,
          status: 0,
          steps: {
            [IStepTypes.W9]: undefined,
            [IStepTypes.ID]: IStepStatus.INIT,
            [IStepTypes.INFORMATIONS]: IStepStatus.INIT,
            [IStepTypes.SCT]: IStepStatus.VALIDATED,
          },
        }),
      }),
    );
  });

  it('Should check if user has INFORMATIONS VALIDATED', async () => {
    testSaga(checkCustomerStatusGenerator, httpConnection, {
      type: ICustomerTypes.CHECK_CUSTOMER_STATUS,
      payload: {
        user: mockUserKYCNoneRevenues,
      },
    })
      .next()
      .call([AccountApi.getInstance(httpConnection), 'getAccounts'])
      .next([mockAccount])
      .call([TransactionApi.getInstance(httpConnection), 'getTransactions'], mockAccount.accountId)
      .next([])
      .call([KycApi.getInstance(httpConnection), 'getDocuments'])
      .next([]);

    // Vérifier que les événements sont émis dans le bon ordre
    expect(domainManagerInstance.emit).toHaveBeenCalledWith(KYC_EVENTS.CUSTOMER_CREATED, expect.any(Object));
    expect(domainManagerInstance.emit).toHaveBeenCalledWith(
      KYC_EVENTS.KYC_STATUS_CHECKED,
      expect.any(Object),
    );
    expect(domainManagerInstance.emit).toHaveBeenCalledWith(KYC_EVENTS.REVENUES_CHECKED, expect.any(Object));
    expect(domainManagerInstance.emit).toHaveBeenCalledWith(KYC_EVENTS.SCT_CHECKED, expect.any(Object));
    expect(domainManagerInstance.emit).toHaveBeenCalledWith(
      KYC_EVENTS.ID_CHECKED,
      expect.objectContaining({
        id: mockUserKYCNone.id,
        properties: expect.objectContaining({
          numberOfSteps: 3,
          status: 0,
          steps: {
            [IStepTypes.W9]: undefined,
            [IStepTypes.ID]: IStepStatus.INIT,
            [IStepTypes.INFORMATIONS]: IStepStatus.VALIDATED,
            [IStepTypes.SCT]: IStepStatus.INIT,
          },
        }),
      }),
    );
  });

  it('Should check if user has ID PENDING', async () => {
    testSaga(checkCustomerStatusGenerator, httpConnection, {
      type: ICustomerTypes.CHECK_CUSTOMER_STATUS,
      payload: {
        user: mockUserKYCNone,
      },
    })
      .next()
      .call([AccountApi.getInstance(httpConnection), 'getAccounts'])
      .next([mockAccount])
      .call([TransactionApi.getInstance(httpConnection), 'getTransactions'], mockAccount.accountId)
      .next([])
      .call([KycApi.getInstance(httpConnection), 'getDocuments'])
      .next([mockIDDocument]);

    // Vérifier que les événements sont émis dans le bon ordre
    expect(domainManagerInstance.emit).toHaveBeenCalledWith(KYC_EVENTS.CUSTOMER_CREATED, expect.any(Object));
    expect(domainManagerInstance.emit).toHaveBeenCalledWith(
      KYC_EVENTS.KYC_STATUS_CHECKED,
      expect.any(Object),
    );
    expect(domainManagerInstance.emit).toHaveBeenCalledWith(KYC_EVENTS.REVENUES_CHECKED, expect.any(Object));
    expect(domainManagerInstance.emit).toHaveBeenCalledWith(KYC_EVENTS.SCT_CHECKED, expect.any(Object));
    expect(domainManagerInstance.emit).toHaveBeenCalledWith(
      KYC_EVENTS.ID_CHECKED,
      expect.objectContaining({
        id: mockUserKYCNone.id,
        properties: expect.objectContaining({
          numberOfSteps: 3,
          status: 0,
          steps: {
            [IStepTypes.W9]: undefined,
            [IStepTypes.ID]: IStepStatus.PENDING,
            [IStepTypes.INFORMATIONS]: IStepStatus.INIT,
            [IStepTypes.SCT]: IStepStatus.INIT,
          },
        }),
      }),
    );
  });

  it('Should check if user has W9 PENDING', async () => {
    testSaga(checkCustomerStatusGenerator, httpConnection, {
      type: ICustomerTypes.CHECK_CUSTOMER_STATUS,
      payload: {
        user: mockUserKYCW9None,
      },
    })
      .next()
      .call([AccountApi.getInstance(httpConnection), 'getAccounts'])
      .next([mockAccount])
      .call([TransactionApi.getInstance(httpConnection), 'getTransactions'], mockAccount.accountId)
      .next([])
      .call([KycApi.getInstance(httpConnection), 'getDocuments'])
      .next([mockW9Document]);

    // Vérifier que les événements sont émis dans le bon ordre
    expect(domainManagerInstance.emit).toHaveBeenCalledWith(KYC_EVENTS.CUSTOMER_CREATED, expect.any(Object));
    expect(domainManagerInstance.emit).toHaveBeenCalledWith(
      KYC_EVENTS.KYC_STATUS_CHECKED,
      expect.any(Object),
    );
    expect(domainManagerInstance.emit).toHaveBeenCalledWith(KYC_EVENTS.REVENUES_CHECKED, expect.any(Object));
    expect(domainManagerInstance.emit).toHaveBeenCalledWith(KYC_EVENTS.SCT_CHECKED, expect.any(Object));
    expect(domainManagerInstance.emit).toHaveBeenCalledWith(KYC_EVENTS.ID_CHECKED, expect.any(Object));
    expect(domainManagerInstance.emit).toHaveBeenCalledWith(
      KYC_EVENTS.W9_CHECKED,
      expect.objectContaining({
        id: mockUserKYCNone.id,
        properties: expect.objectContaining({
          numberOfSteps: 4,
          status: 0,
          steps: {
            [IStepTypes.W9]: IStepStatus.PENDING,
            [IStepTypes.ID]: IStepStatus.INIT,
            [IStepTypes.INFORMATIONS]: IStepStatus.INIT,
            [IStepTypes.SCT]: IStepStatus.INIT,
          },
        }),
      }),
    );
  });

  it('Should call showUnknownError action if unknown error', () => {
    testSaga(checkCustomerStatusGenerator, httpConnection, {
      type: ICustomerTypes.CHECK_CUSTOMER_STATUS,
      payload: {
        user: mockUserKYCNone,
      },
    })
      .next()
      .throw(new Error('unknown error'))
      .put(initializeCustomer())
      .next()
      .put(showUnknownError(new Error('unknown error')))
      .next();
  });
});
