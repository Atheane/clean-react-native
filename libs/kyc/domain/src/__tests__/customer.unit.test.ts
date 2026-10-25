import { IKycSteps, IDocumentStatus, IDocumentStatusCode, IDocumentType, IKycState } from '../types';
import { Customer } from '../entities';
import { KYC_REVIEW } from '@clean-rn/user/domain';
import { Amount, ITransactionType, TransactionCategory } from '@clean-rn/transaction/domain';
import { ITransactionServer } from '@clean-rn/transaction/infrastructure';

describe('Customer - unit', () => {
  const mockedTransactionsWithPayin = [
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

  const mockedTransactionsNoPayin = [
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

  it('should create a Customer with init status NONE and provided id', () => {
    const customer = Customer.Create({
      id: 1,
      properties: { USPerson: false, status: KYC_REVIEW.NONE, kycReviewComment: '' },
    });
    expect(customer.properties.status).toEqual(KYC_REVIEW.NONE);
    expect(customer.id).toEqual('1');
  });

  it('should set customer as REFUSED if one of teh documents is REFUSED', () => {
    const customer = Customer.Create({
      id: 1,
      properties: { USPerson: true, status: KYC_REVIEW.REFUSED, kycReviewComment: '' },
    });
    customer.initKyc(
      [
        {
          typeId: IDocumentType.ID,
          kycStep: IKycSteps.ID,
          status: IDocumentStatus.REFUSED,
          name: 'test-mock',
          createdAt: new Date('2023-10-01T13:20:21.303Z'),
          statusCode: IDocumentStatusCode.REFUSED,
        },
        {
          typeId: IDocumentType.ID,
          kycStep: IKycSteps.ID,
          status: IDocumentStatus.PENDING,
          name: 'test-mock',
          createdAt: new Date('2023-10-03T13:20:21.303Z'),
          statusCode: IDocumentStatusCode.INITIAL,
        },
        {
          typeId: IDocumentType.TAX_CERTIFICATE,
          kycStep: IKycSteps.W9,
          status: IDocumentStatus.VALIDATED,
          name: 'test-mock',
          createdAt: new Date('2023-10-03T13:20:21.303Z'),
          statusCode: IDocumentStatusCode.VALIDATED,
        },
      ],
      [],
    );
    expect(customer.properties.status).toEqual(KYC_REVIEW.REFUSED);
    expect(customer.properties.kyc?.state).toEqual(IKycState.REFUSED);
    expect(customer.properties.kyc?.steps.W9).toEqual(
      expect.objectContaining({
        expectedPageCount: 1,
        properties: expect.objectContaining({
          typeId: IDocumentType.TAX_CERTIFICATE,
          kycStep: IKycSteps.W9,
          status: IDocumentStatus.VALIDATED,
          name: 'test-mock',
        }),
      }),
    );
    expect(customer.properties.kyc?.steps.ID).toEqual(
      expect.objectContaining({
        expectedPageCount: 2,
        properties: expect.objectContaining({
          typeId: IDocumentType.ID,
          kycStep: IKycSteps.ID,
          status: IDocumentStatus.REFUSED,
          name: 'test-mock',
        }),
      }),
    );
  });

  it('should set customer as PENDING status and steps at INCOMPLETE if customer is USPerson, W9 and ID are VALIDATED, but SCT is not received yet', () => {
    const customer = Customer.Create({
      id: 1,
      properties: { USPerson: true, status: KYC_REVIEW.PENDING, kycReviewComment: '' },
    });
    customer.initKyc(
      [
        {
          typeId: IDocumentType.ID,
          kycStep: IKycSteps.ID,
          status: IDocumentStatus.VALIDATED,
          name: 'test-mock',
          createdAt: new Date('2023-10-01T13:20:21.303Z'),
          statusCode: IDocumentStatusCode.VALIDATED,
        },
        {
          typeId: IDocumentType.ID,
          kycStep: IKycSteps.ID,
          status: IDocumentStatus.VALIDATED,
          name: 'test-mock',
          createdAt: new Date('2023-10-03T13:20:21.303Z'),
          statusCode: IDocumentStatusCode.VALIDATED,
        },
        {
          typeId: IDocumentType.TAX_CERTIFICATE,
          kycStep: IKycSteps.W9,
          status: IDocumentStatus.VALIDATED,
          name: 'test-mock',
          createdAt: new Date('2023-10-03T13:20:21.303Z'),
          statusCode: IDocumentStatusCode.VALIDATED,
        },
      ],
      mockedTransactionsNoPayin,
    );
    expect(customer.properties.status).toEqual(KYC_REVIEW.PENDING);
    expect(customer.properties.kyc?.state).toEqual(IKycState.INCOMPLETE);
    expect(customer.properties.kyc?.steps.W9).toEqual(
      expect.objectContaining({
        expectedPageCount: 1,
        properties: expect.objectContaining({
          typeId: IDocumentType.TAX_CERTIFICATE,
          kycStep: IKycSteps.W9,
          status: IDocumentStatus.VALIDATED,
          name: 'test-mock',
        }),
      }),
    );
    expect(customer.properties.kyc?.steps.ID).toEqual(
      expect.objectContaining({
        expectedPageCount: 2,
        properties: expect.objectContaining({
          typeId: IDocumentType.ID,
          kycStep: IKycSteps.ID,
          status: IDocumentStatus.VALIDATED,
          name: 'test-mock',
        }),
      }),
    );
  });

  it('should set customer as PENDING status and steps at STEPS_COMPLETED if customer is USPerson, W9 and ID are VALIDATED, and SCT ok', () => {
    const customer = Customer.Create({
      id: 1,
      properties: { USPerson: true, status: KYC_REVIEW.PENDING, kycReviewComment: '' },
    });
    customer.initKyc(
      [
        {
          typeId: IDocumentType.ID,
          kycStep: IKycSteps.ID,
          status: IDocumentStatus.VALIDATED,
          name: 'test-mock',
          createdAt: new Date('2023-10-01T13:20:21.303Z'),
          statusCode: IDocumentStatusCode.REFUSED,
        },
        {
          typeId: IDocumentType.ID,
          kycStep: IKycSteps.ID,
          status: IDocumentStatus.VALIDATED,
          name: 'test-mock',
          createdAt: new Date('2023-10-03T13:20:21.303Z'),
          statusCode: IDocumentStatusCode.INITIAL,
        },
        {
          typeId: IDocumentType.TAX_CERTIFICATE,
          kycStep: IKycSteps.W9,
          status: IDocumentStatus.VALIDATED,
          name: 'test-mock',
          createdAt: new Date('2023-10-03T13:20:21.303Z'),
          statusCode: IDocumentStatusCode.INITIAL,
        },
      ],
      mockedTransactionsWithPayin,
    );
    expect(customer.properties.status).toEqual(KYC_REVIEW.PENDING);
    expect(customer.properties.kyc?.state).toEqual(IKycState.STEPS_COMPLETED);
    expect(customer.properties.kyc?.steps.W9).toEqual(
      expect.objectContaining({
        expectedPageCount: 1,
        properties: expect.objectContaining({
          typeId: IDocumentType.TAX_CERTIFICATE,
          kycStep: IKycSteps.W9,
          status: IDocumentStatus.VALIDATED,
          name: 'test-mock',
        }),
      }),
    );
    expect(customer.properties.kyc?.steps.ID).toEqual(
      expect.objectContaining({
        expectedPageCount: 2,
        properties: expect.objectContaining({
          typeId: IDocumentType.ID,
          kycStep: IKycSteps.ID,
          status: IDocumentStatus.VALIDATED,
          name: 'test-mock',
        }),
      }),
    );
  });

  it('should set customer as INCOMPLETE status if missing documents for USPerson', () => {
    const customer = Customer.Create({
      id: 1,
      properties: { USPerson: true, status: KYC_REVIEW.PENDING, kycReviewComment: '' },
    });
    customer.initKyc(
      [
        {
          typeId: IDocumentType.TAX_CERTIFICATE,
          kycStep: IKycSteps.W9,
          status: IDocumentStatus.VALIDATED,
          name: 'test-mock',
          createdAt: new Date('2023-10-03T13:20:21.303Z'),
          statusCode: IDocumentStatusCode.VALIDATED,
        },
      ],
      mockedTransactionsWithPayin,
    );
    expect(customer.properties.status).toEqual(KYC_REVIEW.PENDING);
    expect(customer.properties.kyc?.state).toEqual(IKycState.INCOMPLETE);
    expect(customer.properties.kyc?.steps.W9).toEqual({
      expectedPageCount: 1,
      properties: expect.objectContaining({
        typeId: IDocumentType.TAX_CERTIFICATE,
        kycStep: IKycSteps.W9,
        status: IDocumentStatus.VALIDATED,
        name: 'test-mock',
      }),
    });
  });

  it('should set customer as INCOMPLETE status if missing documents', () => {
    const customer = Customer.Create({
      id: 1,
      properties: { USPerson: false, status: KYC_REVIEW.PENDING, kycReviewComment: '' },
    });
    customer.initKyc([], mockedTransactionsWithPayin);
    expect(customer.properties.status).toEqual(KYC_REVIEW.PENDING);
    expect(customer.properties.kyc?.state).toEqual(IKycState.INCOMPLETE);
    expect(customer.properties.kyc?.steps.W9).toBeUndefined();
    expect(customer.properties.kyc?.steps.ID).toBeUndefined();
  });

  it('should set customer as REFUSED if verso ID is REFUSED', () => {
    const customer = Customer.Create({
      id: 1,
      properties: { status: KYC_REVIEW.REFUSED, USPerson: false, kycReviewComment: '' },
    });
    customer.initKyc(
      [
        {
          typeId: IDocumentType.ID,
          kycStep: IKycSteps.ID,
          status: IDocumentStatus.REFUSED,
          name: 'test-mock',
          createdAt: new Date('2023-10-03T13:20:21.303Z'),
          statusCode: IDocumentStatusCode.INCOHERENT,
        },
        {
          typeId: IDocumentType.ID,
          kycStep: IKycSteps.ID,
          status: IDocumentStatus.PENDING,
          name: 'test-mock',
          createdAt: new Date('2023-10-03T13:20:21.303Z'),
          statusCode: IDocumentStatusCode.INITIAL,
        },
        {
          typeId: IDocumentType.PASSPORT,
          kycStep: IKycSteps.ID,
          status: IDocumentStatus.VALIDATED,
          name: 'test-mock',
          createdAt: new Date('2023-10-01T13:20:21.303Z'),
          statusCode: IDocumentStatusCode.VALIDATED,
        },
      ],
      mockedTransactionsWithPayin,
    );
    expect(customer.properties.status).toEqual(KYC_REVIEW.REFUSED);
    expect(customer.properties.kyc?.state).toEqual(IKycState.REFUSED);
    expect(customer.properties.kyc?.steps?.ID).toEqual({
      expectedPageCount: 2,
      properties: expect.objectContaining({
        typeId: IDocumentType.ID,
        kycStep: IKycSteps.ID,
        status: IDocumentStatus.REFUSED,
        name: 'test-mock',
      }),
    });
  });

  it('should be REFUSED if USPerson, W9 are VALIDATED but ID is REFUSED', () => {
    const customer = Customer.Create({
      id: 1,
      properties: { status: KYC_REVIEW.REFUSED, USPerson: true, kycReviewComment: '' },
    });
    customer.initKyc(
      [
        {
          typeId: IDocumentType.TAX_CERTIFICATE,
          kycStep: IKycSteps.W9,
          status: IDocumentStatus.VALIDATED,
          name: 'test-mock',
          createdAt: new Date('2023-10-03T13:20:21.303Z'),
          statusCode: IDocumentStatusCode.VALIDATED,
        },
        {
          typeId: IDocumentType.RESIDENT_PERMIT,
          kycStep: IKycSteps.ID,
          status: IDocumentStatus.PENDING,
          name: 'test-mock',
          createdAt: new Date('2023-10-03T13:20:21.303Z'),
          statusCode: IDocumentStatusCode.INITIAL,
        },
        {
          typeId: IDocumentType.RESIDENT_PERMIT,
          kycStep: IKycSteps.ID,
          status: IDocumentStatus.REFUSED,
          name: 'test-mock',
          createdAt: new Date('2023-10-01T13:20:21.303Z'),
          statusCode: IDocumentStatusCode.TRUNCATED,
        },
      ],
      mockedTransactionsWithPayin,
    );
    expect(customer.properties.status).toEqual(KYC_REVIEW.REFUSED);
    expect(customer.properties.kyc?.state).toEqual(IKycState.REFUSED);
    expect(customer.properties.kyc?.steps?.W9).toEqual({
      expectedPageCount: 1,
      properties: expect.objectContaining({
        kycStep: IKycSteps.W9,
        typeId: IDocumentType.TAX_CERTIFICATE,
        status: IDocumentStatus.VALIDATED,
        name: 'test-mock',
      }),
    });
    expect(customer.properties.kyc?.steps?.ID).toEqual({
      expectedPageCount: 2,
      properties: expect.objectContaining({
        kycStep: IKycSteps.ID,
        typeId: IDocumentType.RESIDENT_PERMIT,
        status: IDocumentStatus.REFUSED,
        name: 'test-mock',
      }),
    });
  });

  it('should be PENDING if USPerson, W9 is VALIDATED, ID is PENDING', () => {
    const customer = Customer.Create({
      id: 1,
      properties: { status: KYC_REVIEW.PENDING, USPerson: true, kycReviewComment: '' },
    });
    customer.initKyc(
      [
        {
          typeId: IDocumentType.TAX_CERTIFICATE,
          kycStep: IKycSteps.W9,
          status: IDocumentStatus.VALIDATED,
          name: 'test-mock',
          createdAt: new Date('2023-10-03T13:20:21.303Z'),
          statusCode: IDocumentStatusCode.VALIDATED,
        },
        {
          typeId: IDocumentType.RESIDENT_PERMIT,
          kycStep: IKycSteps.ID,
          status: IDocumentStatus.PENDING,
          name: 'test-mock',
          createdAt: new Date('2023-10-03T13:20:21.303Z'),
          statusCode: IDocumentStatusCode.INITIAL,
        },
        {
          typeId: IDocumentType.RESIDENT_PERMIT,
          kycStep: IKycSteps.ID,
          status: IDocumentStatus.PENDING,
          name: 'test-mock',
          createdAt: new Date('2023-10-01T13:20:21.303Z'),
          statusCode: IDocumentStatusCode.INITIAL,
        },
      ],
      mockedTransactionsWithPayin,
    );
    expect(customer.properties.status).toEqual(KYC_REVIEW.PENDING);
    expect(customer.properties.kyc?.state).toEqual(IKycState.PENDING);
    expect(customer.properties.kyc?.steps?.W9).toEqual({
      expectedPageCount: 1,
      properties: expect.objectContaining({
        kycStep: IKycSteps.W9,
        typeId: IDocumentType.TAX_CERTIFICATE,
        status: IDocumentStatus.VALIDATED,
        name: 'test-mock',
      }),
    });
    expect(customer.properties.kyc?.steps?.ID).toEqual({
      expectedPageCount: 2,
      properties: expect.objectContaining({
        typeId: IDocumentType.RESIDENT_PERMIT,
        status: IDocumentStatus.PENDING,
        name: 'test-mock',
      }),
    });
  });

  it('should be REFUSED if not USPerson and ID is REFUSED', () => {
    const customer = Customer.Create({
      id: 1,
      properties: { status: KYC_REVIEW.REFUSED, USPerson: false, kycReviewComment: '' },
    });
    customer.initKyc(
      [
        {
          typeId: IDocumentType.RESIDENT_PERMIT,
          kycStep: IKycSteps.ID,
          status: IDocumentStatus.REFUSED,
          name: 'test-mock',
          createdAt: new Date('2023-10-01T13:20:21.303Z'),
          statusCode: IDocumentStatusCode.TRUNCATED,
        },
        {
          typeId: IDocumentType.RESIDENT_PERMIT,
          kycStep: IKycSteps.ID,
          status: IDocumentStatus.PENDING,
          name: 'test-mock',
          createdAt: new Date('2023-10-03T13:20:21.303Z'),
          statusCode: IDocumentStatusCode.INITIAL,
        },
      ],
      mockedTransactionsWithPayin,
    );
    expect(customer.properties.status).toEqual(KYC_REVIEW.REFUSED);
    expect(customer.properties.kyc?.state).toEqual(IKycState.REFUSED);
    expect(customer.properties.kyc?.steps?.ID).toEqual({
      expectedPageCount: 2,
      properties: expect.objectContaining({
        typeId: IDocumentType.RESIDENT_PERMIT,
        status: IDocumentStatus.REFUSED,
        name: 'test-mock',
      }),
    });
  });

  it('should be VALIDATED if customer status is VALIDATED', () => {
    const customer = Customer.Create({
      id: 1,
      properties: { USPerson: false, status: KYC_REVIEW.VALIDATED, kycReviewComment: '' },
    });
    customer.initKyc(
      [
        {
          typeId: IDocumentType.PASSPORT,
          kycStep: IKycSteps.ID,
          status: IDocumentStatus.VALIDATED,
          name: 'test-mock',
          createdAt: new Date('2023-10-01T13:20:21.303Z'),
          statusCode: IDocumentStatusCode.VALIDATED,
        },
      ],
      mockedTransactionsWithPayin,
    );
    expect(customer.properties.status).toEqual(KYC_REVIEW.VALIDATED);
    expect(customer.properties.kyc?.state).toEqual(IKycState.STEPS_COMPLETED);
  });

  it('should be PENDING if document status is PENDING and SCT is ok', () => {
    const customer = Customer.Create({
      id: 1,
      properties: { USPerson: false, status: KYC_REVIEW.PENDING, kycReviewComment: '' },
    });
    customer.initKyc(
      [
        {
          typeId: IDocumentType.PASSPORT,
          kycStep: IKycSteps.ID,
          status: IDocumentStatus.PENDING,
          name: 'test-mock',
          createdAt: new Date('2023-10-01T13:20:21.303Z'),
          statusCode: IDocumentStatusCode.INITIAL,
        },
      ],
      mockedTransactionsWithPayin,
    );
    expect(customer.properties.status).toEqual(KYC_REVIEW.PENDING);
    expect(customer.properties.kyc?.state).toEqual(IKycState.PENDING);
  });

  it('should be INCOMPLETE if document status is PENDING and SCT is not received', () => {
    const customer = Customer.Create({
      id: 1,
      properties: { USPerson: false, status: KYC_REVIEW.NONE, kycReviewComment: '' },
    });
    customer.initKyc(
      [
        {
          typeId: IDocumentType.PASSPORT,
          kycStep: IKycSteps.ID,
          status: IDocumentStatus.PENDING,
          name: 'test-mock',
          createdAt: new Date('2023-10-01T13:20:21.303Z'),
          statusCode: IDocumentStatusCode.INITIAL,
        },
      ],
      mockedTransactionsNoPayin,
    );
    expect(customer.properties.status).toEqual(KYC_REVIEW.NONE);
    expect(customer.properties.kyc?.state).toEqual(IKycState.INCOMPLETE);
  });

  it('should be INCOMPLETE if no document and SCT is ok', () => {
    const customer = Customer.Create({
      id: 1,
      properties: { USPerson: false, status: KYC_REVIEW.NONE, kycReviewComment: '' },
    });
    customer.initKyc([], mockedTransactionsWithPayin);
    expect(customer.properties.status).toEqual(KYC_REVIEW.NONE);
    expect(customer.properties.kyc?.state).toEqual(IKycState.INCOMPLETE);
  });
});
