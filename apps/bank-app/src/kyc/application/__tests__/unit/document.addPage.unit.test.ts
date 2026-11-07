/* eslint-disable  @typescript-eslint/no-explicit-any */
import { takeEvery } from 'redux-saga/effects';
import { testSaga } from 'redux-saga-test-plan';
import { createMockTask } from '@redux-saga/testing-utils';

import { DomainEventManager } from '@clean-rn/ddd';
import { HttpConnection } from '@clean-rn/shared/infrastructure';
import {
  KYC_EVENTS,
  DocumentVO,
  IStepStatus,
  IStepTypes,
  IDocumentStatusCode,
  IDocumentType,
} from '@clean-rn/kyc/domain';

import { showUnknownError } from '../../../../shared/application/commands/manage-global-errors';
import { IKycStackPages } from '../../../../shared/presentation/types';
import { navigate } from '../../../../shared/presentation/navigation/navigationRef';

import { IDCardRecto } from '../../../presentation/assets/images';
import { shortBase64 } from '../fixtures/mock-data';
import { createMockHttpConnection, mockInfrastructure } from '../helpers/setup';
import { selectCustomer } from '../../state-management/selectors';
import { addPageSaga, addPageSagaGenerator } from '../../usecases';
import { ICustomerTypes, sendDocument } from '../../commands';
import {
  mockCustomerKYCNoneEmptyDocumentCreated,
  mockCustomerKYCNoneDocumentWithRectoPageCreated,
} from '../fixtures/mock-data';
import { KycApi } from '@clean-rn/kyc/infrastructure';
import { send } from 'process';

describe('Document - addPage - usecases', () => {
  let httpConnection: HttpConnection;
  const domainManagerInstance = DomainEventManager.getInstance();

  beforeEach(() => {
    httpConnection = createMockHttpConnection();
    mockInfrastructure();
    jest.spyOn(domainManagerInstance, 'emit').mockImplementation(() => true);
  });

  afterEach(() => {
    jest.resetAllMocks();
    jest.clearAllMocks();
  });

  it('Should wait for ADD_PAGE action and call addPageSagaGenerator, should be done on next iteration', () => {
    const genObject = addPageSaga(httpConnection);
    expect(genObject.next().value).toEqual(
      takeEvery(ICustomerTypes.ADD_PAGE, addPageSagaGenerator, httpConnection),
    );
    expect(genObject.next().done).toBeTruthy();
  });

  it('Should add first page for ID document', async () => {
    const document = new DocumentVO({
      typeId: IDocumentType.ID,
      status: IStepStatus.PENDING,
      statusCode: IDocumentStatusCode.INITIAL,
      createdAt: new Date(),
      context: IStepTypes.ID,
      name: 'first-id.id.recto',
    });

    const nextRouteParams = {
      instruction: 'instruction',
      imageSource: IDCardRecto,
    };

    testSaga(addPageSagaGenerator, httpConnection, {
      type: ICustomerTypes.ADD_PAGE,
      payload: {
        base64: shortBase64,
        nextRouteParams,
      },
    })
      .next()
      .select(selectCustomer)
      .next(mockCustomerKYCNoneEmptyDocumentCreated);

    document.addPage(shortBase64);

    expect(domainManagerInstance.emit).toHaveBeenNthCalledWith(
      1,
      KYC_EVENTS.CUSTOMER_CREATED,
      expect.any(Object),
    );
    expect(domainManagerInstance.emit).toHaveBeenNthCalledWith(
      2,
      KYC_EVENTS.DOCUMENT_PAGE_ADDED,
      expect.objectContaining({
        id: mockCustomerKYCNoneEmptyDocumentCreated.id,
        properties: expect.objectContaining({
          currentDocument: expect.objectContaining({
            context: IStepTypes.ID,
            name: 'first-id.id.recto',
            status: IStepStatus.PENDING,
            statusCode: IDocumentStatusCode.INITIAL,
            typeId: IDocumentType.ID,
            recto: shortBase64,
          }),
        }),
      }),
    );
  });

  it('Should add second page for ID document', async () => {
    const nextRouteParams = {
      instruction: 'instruction',
      imageSource: IDCardRecto,
    };

    const mockTask = createMockTask();

    testSaga(addPageSagaGenerator, httpConnection, {
      type: ICustomerTypes.ADD_PAGE,
      payload: {
        base64: shortBase64,
        nextRouteParams,
      },
    })
      .next()
      .select(selectCustomer)
      .next(mockCustomerKYCNoneDocumentWithRectoPageCreated)
      .put(sendDocument())
      .next()
      .spawn([KycApi.getInstance(httpConnection), 'createDocument'], {
        customerId: mockCustomerKYCNoneDocumentWithRectoPageCreated.id,
        document: mockCustomerKYCNoneDocumentWithRectoPageCreated.properties.currentDocument,
      })
      .next(mockTask)
      .join(mockTask)
      .next();

    expect(domainManagerInstance.emit).toHaveBeenNthCalledWith(
      1,
      KYC_EVENTS.CUSTOMER_CREATED,
      expect.any(Object),
    );
    expect(domainManagerInstance.emit).toHaveBeenNthCalledWith(
      2,
      KYC_EVENTS.DOCUMENT_PAGE_ADDED,
      expect.any(Object),
    );
    expect(domainManagerInstance.emit).toHaveBeenNthCalledWith(
      3,
      KYC_EVENTS.DOCUMENT_SENT,
      expect.objectContaining({
        id: mockCustomerKYCNoneDocumentWithRectoPageCreated.id,
        properties: expect.objectContaining({
          currentDocument: undefined,
          steps: expect.any(Object),
          USPerson: false,
          reviewComment: '',
          numberOfSteps: expect.any(Number),
        }),
      }),
    );
  });

  it('Should call showUnknownError action if unknown error', () => {
    testSaga(addPageSagaGenerator, httpConnection, {
      type: ICustomerTypes.ADD_PAGE,
      payload: {
        base64: shortBase64,
      },
    })
      .next()
      .throw(new Error('unknown error'))
      .put(showUnknownError(new Error('unknown error')))
      .next();
  });
});
