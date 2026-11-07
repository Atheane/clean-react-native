/* eslint-disable  @typescript-eslint/no-explicit-any */
import { takeEvery } from 'redux-saga/effects';
import { testSaga } from 'redux-saga-test-plan';
import { DomainEventManager } from '@clean-rn/ddd';

import {
  IStepTypes,
  IDocumentStatusCode,
  IStepStatus,
  IDocumentType,
  KYC_EVENTS,
} from '@clean-rn/kyc/domain';

import { showUnknownError } from '../../../../shared/application/commands/manage-global-errors';

import { createDocumentSaga, createDocumentSagaGenerator } from '../../usecases';
import { ICustomerTypes } from '../../commands';
import { mockCustomerKYCNone } from '../fixtures/mock-data';
import { mockInfrastructure } from '../helpers/setup';
import { selectCustomer } from '../../state-management/selectors';

describe('Document - createDocument - usecases', () => {
  const documentIDProperties = {
    typeId: IDocumentType.ID,
    status: IStepStatus.PENDING,
    statusCode: IDocumentStatusCode.INITIAL,
    createdAt: new Date(),
    context: IStepTypes.ID,
    name: 'first-id.id.recto',
  };
  const domainManagerInstance = DomainEventManager.getInstance();

  beforeEach(() => {
    mockInfrastructure();
    jest.spyOn(domainManagerInstance, 'emit').mockImplementation(() => true);
  });

  afterEach(() => {
    jest.resetAllMocks();
    jest.clearAllMocks();
  });

  it('Should wait for CREATE_DOCUMENT action', () => {
    const genObject = createDocumentSaga();
    expect(genObject.next().value).toEqual(
      takeEvery(ICustomerTypes.CREATE_DOCUMENT, createDocumentSagaGenerator),
    );
    expect(genObject.next().done).toBeTruthy();
  });

  it('Should create document', () => {
    testSaga(createDocumentSagaGenerator, {
      type: ICustomerTypes.CREATE_DOCUMENT,
      payload: {
        documentProperties: documentIDProperties,
      },
    })
      .next()
      .select(selectCustomer)
      .next(mockCustomerKYCNone)
      .isDone();
    expect(domainManagerInstance.emit).toHaveBeenCalledWith(KYC_EVENTS.CUSTOMER_CREATED, expect.any(Object));
    expect(domainManagerInstance.emit).toHaveBeenCalledWith(
      KYC_EVENTS.DOCUMENT_CREATED,
      expect.objectContaining({
        id: mockCustomerKYCNone.id,
        properties: expect.objectContaining({
          USPerson: false,
          numberOfSteps: 3,
          status: 0,
          reviewComment: '',
          steps: {
            [IStepTypes.W9]: undefined,
            [IStepTypes.ID]: IStepStatus.INIT,
            [IStepTypes.INFORMATIONS]: IStepStatus.INIT,
            [IStepTypes.SCT]: IStepStatus.INIT,
          },
          currentDocument: expect.objectContaining({
            typeId: IDocumentType.ID,
            status: IStepStatus.PENDING,
            statusCode: IDocumentStatusCode.INITIAL,
            createdAt: expect.any(Date),
            context: IStepTypes.ID,
            name: 'first-id.id.recto',
            expectedPageCount: 2,
          }),
        }),
      }),
    );
  });

  it('Should call showUnknownError action if unknown error', () => {
    testSaga(createDocumentSagaGenerator, {
      type: ICustomerTypes.CREATE_DOCUMENT,
      payload: {
        documentProperties: documentIDProperties,
      },
    })
      .next()
      .throw(new Error('unknown error'))
      .put(showUnknownError(new Error('unknown error')))
      .next();
  });
});
